'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './EntranceAnimation.module.css';

// ─── SVG path data ────────────────────────────────────────────────────────────
//
// The logo outline is split into two identical <path> elements so two dots can
// draw from opposite ends simultaneously.
//
// Sub-paths in draw order:
//   1. WYN outer silhouette        ← Dot 1 starts here  (M 2,1)
//   2. Y counter (inner hole)
//   3. WIN outer silhouette
//   4. N counter (inner hole)
//   5. I bottom segment
//   6. I top diagonal slash        ← Dot 2 starts here  (end of path)
//
// THE BAR = sub-path 6: M 387,210 L 387,230 L 437,300 L 438,281 Z
// This thin diagonal parallelogram is the upper slash of the letter I in WIN.
// It is an existing element in the logo — not an addition. The door animation
// grows this shape to fill the screen, then splits it to reveal the site.
//
const LOGO_PATH = `
  M 2,1 L 1,4 L 63,219 L 59,221 L 19,222 L 83,449 L 85,449 L 142,449
    L 174,334 L 179,323 L 215,449 L 273,449 L 338,221 L 281,221
    L 241,377 L 238,374 L 199,227 L 251,225 L 306,33 L 305,28
    L 286,1 L 259,1 L 224,142 L 219,155 L 177,1 L 138,1
    L 97,154 L 80,96 L 57,1 Z

  M 158,100 L 192,219 L 188,221 L 159,221 L 121,367 L 116,377
    L 77,227 L 121,226 Z

  M 303,1 L 386,122 L 387,187 L 437,257 L 438,124 L 504,25
    L 507,24 L 508,450 L 558,450 L 559,311 L 649,450 L 699,450
    L 699,2 L 649,2 L 648,140 L 558,2 L 459,1 L 412,72 L 365,1 Z

  M 559,87 L 649,226 L 648,365 L 558,226 Z

  M 388,255 L 387,450 L 438,450 L 438,324 Z

  M 387,210 L 387,230 L 437,300 L 438,281 Z
`.trim();

// The bar shape — path 6 only, used for the pulse glow overlay
const BAR_PATH = 'M 387,210 L 387,230 L 437,300 L 438,281 Z';

// The outline split into its six sub-paths (each "M … Z"). Stroking every
// sub-path on its own element is what keeps each white dot welded to the tip of
// the pink line it is drawing: a lone sub-path's stroke-dashoffset and
// getPointAtLength share one arc-length space, so they can't drift apart the
// way a single dash spanning all six sub-paths does.
const SUBPATHS = LOGO_PATH
  .split('M')
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => `M ${s}`);

// ─── Easing ───────────────────────────────────────────────────────────────────
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn  = (t: number) => t * t * t;
// Gentle symmetric ease — smooth start/stop, less peaky through the middle than
// the cubic easeInOut, so the trace glides rather than lurches.
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

// ─── Utilities ────────────────────────────────────────────────────────────────
function tween(ms: number, cb: (r: number) => void): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const frame = (now: number) => {
      const r = Math.min((now - start) / ms, 1);
      cb(r);
      if (r < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Diamond generator ────────────────────────────────────────────────────────
function spawnDiamonds(container: HTMLDivElement) {
  for (let i = 0; i < 20; i++) {
    const d = document.createElement('div');
    d.className = styles.diamond;
    const size = 25 + Math.random() * 70;
    Object.assign(d.style, {
      width:            `${size}px`,
      height:           `${size}px`,
      left:             `${Math.random() * 110 - 5}%`,
      bottom:           `-${size}px`,
      animationDuration:`${9 + Math.random() * 14}s`,
      animationDelay:   `${Math.random() * 14}s`,
      borderColor:      `rgba(255,255,255,${0.04 + Math.random() * 0.08})`,
    });
    container.appendChild(d);
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
interface EntranceAnimationProps {
  /** Called when the animation finishes and the site is fully revealed */
  onComplete?: () => void;
}

export default function EntranceAnimation({ onComplete }: EntranceAnimationProps) {
  const diamondsRef  = useRef<HTMLDivElement>(null);
  const logoWrapRef  = useRef<HTMLDivElement>(null);
  const subpathRefs  = useRef<(SVGPathElement | null)[]>([]);
  const dot1Ref      = useRef<SVGCircleElement>(null);
  const dot2Ref      = useRef<SVGCircleElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const stageRef     = useRef<HTMLDivElement>(null);

  // ── Phase 1: Two dots trace from opposite ends ──────────────────────────────
  const phase1 = useCallback(async () => {
    const paths = subpathRefs.current.filter(Boolean) as SVGPathElement[];
    const d1   = dot1Ref.current!;
    const d2   = dot2Ref.current!;
    const wrap = logoWrapRef.current!;
    if (paths.length === 0) return;

    // Measure each sub-path, then hide each one with its OWN dash. Because a
    // sub-path is dashed in isolation, its stroke-dashoffset and getPointAtLength
    // share one arc-length space — so a dot placed by getPointAtLength sits
    // exactly on the tip of the stroke being revealed, on every frame.
    const lens  = paths.map((p) => p.getTotalLength());
    const total = lens.reduce((a, b) => a + b, 0);
    paths.forEach((p, i) => {
      p.setAttribute('stroke-dasharray', String(lens[i]));
      p.setAttribute('stroke-dashoffset', String(lens[i])); // fully hidden
      p.setAttribute('opacity', '1');
    });

    // Split the outline into two contiguous runs of whole sub-paths, balanced as
    // near to half the total length as possible. Dot 1 draws the first run
    // forward from the start; dot 2 draws the second run in reverse from the
    // end, so the dots sweep toward each other and finish together.
    const half = total / 2;
    let cum = 0;
    let splitAt = 0;
    let best = Infinity;
    for (let i = 0; i < lens.length; i++) {
      cum += lens[i];
      const diff = Math.abs(cum - half);
      if (diff < best) { best = diff; splitAt = i; }
    }

    type Seg = { p: SVGPathElement; len: number; start: number };

    const forward: Seg[] = [];        // sub-paths [0..splitAt], drawn from start
    let fAcc = 0;
    for (let i = 0; i <= splitAt; i++) {
      forward.push({ p: paths[i], len: lens[i], start: fAcc });
      fAcc += lens[i];
    }
    const lenForward = fAcc || 1;

    const backward: Seg[] = [];       // sub-paths [n-1..splitAt+1], drawn from end
    let bAcc = 0;
    for (let i = lens.length - 1; i > splitAt; i--) {
      backward.push({ p: paths[i], len: lens[i], start: bAcc });
      bAcc += lens[i];
    }
    const lenBackward = bAcc || 1;

    // Park the dots on their starting tips before revealing them.
    const head1 = forward[0].p.getPointAtLength(0);
    d1.setAttribute('cx', String(head1.x));
    d1.setAttribute('cy', String(head1.y));
    if (backward.length) {
      const seg = backward[0];
      const head2 = seg.p.getPointAtLength(seg.len);
      d2.setAttribute('cx', String(head2.x));
      d2.setAttribute('cy', String(head2.y));
    }
    d1.setAttribute('opacity', '1');
    d2.setAttribute('opacity', '1');
    wrap.style.opacity = '1';

    // Dot 1: reveal forward sub-paths from their start; keep the dot on the tip.
    const drawForward = (dist: number) => {
      for (const seg of forward) {
        if (dist >= seg.start + seg.len) {
          seg.p.setAttribute('stroke-dashoffset', '0');            // done
        } else if (dist <= seg.start) {
          seg.p.setAttribute('stroke-dashoffset', String(seg.len)); // not yet
        } else {
          const into = dist - seg.start;                           // active sub-path
          seg.p.setAttribute('stroke-dashoffset', String(seg.len - into));
          const tip = seg.p.getPointAtLength(into);
          d1.setAttribute('cx', String(tip.x));
          d1.setAttribute('cy', String(tip.y));
        }
      }
    };

    // Dot 2: reveal backward sub-paths from their end; keep the dot on the tip.
    const drawBackward = (dist: number) => {
      for (const seg of backward) {
        if (dist >= seg.start + seg.len) {
          seg.p.setAttribute('stroke-dashoffset', '0');             // done
        } else if (dist <= seg.start) {
          seg.p.setAttribute('stroke-dashoffset', String(-seg.len)); // not yet
        } else {
          const into = dist - seg.start;                            // active sub-path
          seg.p.setAttribute('stroke-dashoffset', String(into - seg.len));
          const tip = seg.p.getPointAtLength(seg.len - into);
          d2.setAttribute('cx', String(tip.x));
          d2.setAttribute('cy', String(tip.y));
        }
      }
    };

    // Gentle ease for a smooth, unhurried trace; both runs reach full at r = 1.
    await tween(4500, (r) => {
      const e = easeInOutSine(r);
      drawForward(e * lenForward);
      drawBackward(e * lenBackward);
    });
    drawForward(lenForward);
    drawBackward(lenBackward);

    // Dots fade out
    await tween(300, (r) => {
      const v = String(1 - easeOut(r));
      d1.setAttribute('opacity', v);
      d2.setAttribute('opacity', v);
    });
  }, []);

  // ── Phase 2: Bar pulses ─────────────────────────────────────────────────────
  const phase2 = useCallback(async (barEl: SVGPathElement) => {
    for (let i = 0; i < 3; i++) {
      await tween(150, (r) => {
        barEl.setAttribute('opacity', String(easeOut(r) * 0.95));
      });
      await tween(150, (r) => {
        barEl.setAttribute('opacity', String(0.95 - easeIn(r) * 0.85));
      });
      if (i < 2) await wait(40);
    }
    await tween(180, (r) => {
      barEl.setAttribute('opacity', String(0.1 + easeOut(r) * 0.9));
    });
    await wait(120);
  }, []);

  // ── Phase 3+4: Expand bar → split reveal ───────────────────────────────────
  const phase3and4 = useCallback(async (barEl: SVGPathElement) => {
    const svg   = svgRef.current!;
    const wrap  = logoWrapRef.current!;
    const stage = stageRef.current!;

    const svgRect = svg.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const big = Math.max(vw, vh) * 3; // large enough to cover any angle

    const sx = svgRect.width  / 700;
    const sy = svgRect.height / 451;
    const ox = svgRect.left;
    const oy = svgRect.top;

    // Bar corners in screen space (path 6: M387,210 L387,230 L437,300 L438,281)
    const P0 = [ox + 387 * sx, oy + 210 * sy]; // top-left
    const P1 = [ox + 387 * sx, oy + 230 * sy]; // bottom-left
    const P2 = [ox + 437 * sx, oy + 300 * sy]; // bottom-right
    const P3 = [ox + 438 * sx, oy + 281 * sy]; // top-right

    // Long-axis unit vector
    const leftMid  = [(P0[0] + P1[0]) / 2, (P0[1] + P1[1]) / 2];
    const rightMid = [(P3[0] + P2[0]) / 2, (P3[1] + P2[1]) / 2];
    const bvx = rightMid[0] - leftMid[0];
    const bvy = rightMid[1] - leftMid[1];
    const blen = Math.sqrt(bvx * bvx + bvy * bvy);
    const ubx = bvx / blen;
    const uby = bvy / blen;
    const bnx = -uby; // normal
    const bny =  ubx;

    // Bar centre in screen space — seam origin for the split panels
    const bcx = (leftMid[0] + rightMid[0]) / 2;
    const bcy = (leftMid[1] + rightMid[1]) / 2;

    // Build door SVG overlay (appended to document.body, not the Next.js tree)
    const door = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    door.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;z-index:150;pointer-events:none;overflow:visible;';
    door.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    door.setAttribute('preserveAspectRatio', 'none');

    const fill = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    fill.setAttribute('fill', '#E8006A');
    fill.setAttribute('opacity', '0');
    door.appendChild(fill);
    document.body.appendChild(door);

    // Expand bar from path-6 dimensions outward in normal direction
    const setFill = (exp: number) => {
      const tl = [P0[0] - ubx * big - bnx * exp, P0[1] - uby * big - bny * exp];
      const tr = [P3[0] + ubx * big - bnx * exp, P3[1] + uby * big - bny * exp];
      const br = [P2[0] + ubx * big + bnx * exp, P2[1] + uby * big + bny * exp];
      const bl = [P1[0] - ubx * big + bnx * exp, P1[1] - uby * big + bny * exp];
      fill.setAttribute(
        'points',
        `${tl[0]},${tl[1]} ${tr[0]},${tr[1]} ${br[0]},${br[1]} ${bl[0]},${bl[1]}`
      );
    };

    setFill(0);
    fill.setAttribute('opacity', '1');

    // Logo slides up and fades; bar expands simultaneously
    await Promise.all([
      tween(600, (r) => {
        const p = easeIn(r);
        wrap.style.opacity   = String(1 - p);
        wrap.style.transform = `translateY(${p * -40}px)`;
        barEl.setAttribute('opacity', String(1 - p));
      }),
      tween(900, (r) => {
        setFill(easeInOut(r) * big);
      }),
    ]);

    await wait(150);

    // Build split panels — huge parallelogram strips from the seam line
    const panelPoints = (signN: number, slide: number): string => {
      const offset = signN * slide;
      const reach  = signN * big;
      return [
        `${bcx - ubx * big + bnx * offset          },${bcy - uby * big + bny * offset          }`,
        `${bcx + ubx * big + bnx * offset          },${bcy + uby * big + bny * offset          }`,
        `${bcx + ubx * big + bnx * (offset + reach)},${bcy + uby * big + bny * (offset + reach)}`,
        `${bcx - ubx * big + bnx * (offset + reach)},${bcy - uby * big + bny * (offset + reach)}`,
      ].join(' ');
    };

    const panelA = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const panelB = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    panelA.setAttribute('fill', '#E8006A');
    panelB.setAttribute('fill', '#E8006A');
    panelA.setAttribute('points', panelPoints(-1, 0));
    panelB.setAttribute('points', panelPoints( 1, 0));
    door.appendChild(panelA);
    door.appendChild(panelB);
    fill.style.display = 'none';

    // Reveal the page content behind the animation
    // onComplete fires here so the page fades in while the panels slide apart
    onComplete?.();

    // Door opens — quick, snappy split
    await tween(500, (r) => {
      const s = easeInOut(r) * big;
      panelA.setAttribute('points', panelPoints(-1, s));
      panelB.setAttribute('points', panelPoints( 1, s));
    });

    door.remove();
    stage.style.display = 'none';
  }, [onComplete]);

  // ── Run sequence ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!diamondsRef.current) return;
    spawnDiamonds(diamondsRef.current);

    const svg = svgRef.current!;

    const run = async () => {
      await phase1();
      await wait(100);

      // Create bar glow element (path 6 filled, glowing)
      const barEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      barEl.setAttribute('d',            BAR_PATH);
      barEl.setAttribute('fill',         '#E8006A');
      barEl.setAttribute('stroke',       '#E8006A');
      barEl.setAttribute('stroke-width', '2');
      barEl.setAttribute('filter',       'url(#bar-glow)');
      barEl.setAttribute('opacity',      '0');
      svg.appendChild(barEl);

      await phase2(barEl);
      await phase3and4(barEl);
    };

    run();
  }, [phase1, phase2, phase3and4]);

  return (
    <div ref={stageRef} className={styles.stage}>
      {/* Floating diamond background */}
      <div ref={diamondsRef} className={styles.diamonds} />

      {/* Logo */}
      <div className={styles.logoWrap}>
        <div ref={logoWrapRef} className={styles.logoInner}>
          <svg
            ref={svgRef}
            id="logo"
            className={styles.logoSvg}
            viewBox="0 0 700 451"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Dot travel glow */}
              <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Bar pulse glow */}
              <filter id="bar-glow" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outline as individual sub-paths — each stroked with its own dash
                so its dot stays welded to the tip of the line it is drawing. */}
            {SUBPATHS.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  subpathRefs.current[i] = el;
                }}
                fill="none"
                stroke="#E8006A"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={0}
                d={d}
              />
            ))}

            {/* Dot 1 — travels forward */}
            <circle ref={dot1Ref} r={5} fill="#ffffff" filter="url(#glow)" opacity={0} />

            {/* Dot 2 — travels backward */}
            <circle ref={dot2Ref} r={5} fill="#ffffff" filter="url(#glow)" opacity={0} />
          </svg>
        </div>
      </div>
    </div>
  );
}
