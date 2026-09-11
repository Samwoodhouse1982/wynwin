// ============================================================
// WYN WIN — Site Copy & Data
// Edit this file to update any content across the site.
// ============================================================

export const BRAND = {
  name: 'WYN WIN',
  tagline: 'Whatever You Need, Whenever It\'s Needed.',
  phone: '07307 176143',
  phoneHref: 'tel:+447307176143',
  email: 'hello@wynwin.co.uk',
  emailHref: 'mailto:hello@wynwin.co.uk',
  linkedin: 'https://www.linkedin.com/company/wyn-win',
  whatsapp: 'https://wa.me/447307176143',
  // Single source of truth for the response-time promise. It appears beside
  // both form buttons, in both success states, on the contact page and in the
  // Get In Touch meta description — change it here only.
  responsePromise: 'We reply within one working day — usually the same day.',
  legal: {
    company: 'WYN WIN Services Ltd',
    companyNumber: '16356334',
    vat: '512 9953 75',
    ico: 'ZB972878',
    country: 'England & Wales',
  },
  consentNote:
    'You agree to receive emails from WYN WIN and consent to WYN WIN storing your contact details. You can unsubscribe at any time by clicking the link at the bottom of our emails.',
} as const;

// The desktop bar filters out /get-in-touch because the pink button already
// points there (the mobile drawer does the same).
// ── /roi-calculators publication state ──────────────────────
// The ROI calculators page is currently HIDDEN: it is live at its URL and can
// be shared by direct link for campaigns, but it is kept out of search and off
// the site's own navigation until the TBC items in ROI (further down this file)
// are signed off — several of them name clients whose permission is pending.
//
// Flipping this to `true` publishes it in one move: it restores the
// `index, follow` robots tag and the canonical on the page, the sitemap entry,
// the footer link, and the link from What We Do. Nothing else needs changing.
//
// Note: the page is deliberately NOT disallowed in robots.txt. Blocking the
// crawl would stop Google reading the noindex tag, and the URL could still
// surface from external links. The noindex tag is what actually hides it.
export const ROI_PAGE_PUBLISHED: boolean = false;

// TBC: Sam to decide whether /roi-calculators goes in the main nav once the
// page is published. Defaulting to not adding it.
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'What we do', href: '/what-we-do' },
  { label: 'Who we are', href: '/who-we-are' },
  { label: 'Get in touch', href: '/get-in-touch' },
] as const;

// One label per action, used everywhere:
//   primary   — every in-content conversion button
//   secondary — every exploration link
// The nav item and footer link say 'Get in touch' because they name the page.
export const CTA = {
  primary: 'Work with us',
  secondary: 'See what we do',
  contactPage: 'Get in touch',
} as const;

// ============================================================
// HOME PAGE
// ============================================================

export const HOME = {
  hero: {
    // The category ('marketing') lives in the H1 itself so the largest type on
    // the site says what the business does. The eyebrow carries BRAND.tagline.
    headline: 'Marketing services for busy people.',
    body: 'Your marketing team is pulled in too many directions. We take on the execution they don\'t have time for.',
    ctas: [
      { label: 'Work with us', href: '/get-in-touch', variant: 'primary' as const },
      { label: 'See what we do', href: '/what-we-do', variant: 'outline' as const },
    ],
  },
  valueProp: {
    headline: 'The missing link between strategy and execution.',
    body: 'Every marketing team has tasks that need doing but keep getting bumped. Execution work that\'s too important to ignore but too time-consuming to fit in. That\'s the gap we fill.\n\nFrom last-minute requests to ongoing support, we step in, get up to speed fast, and deliver. No hand-holding, no lengthy briefs. Just results. Your business runs smoother, scales faster, and delivers better results.',
  },
  whyUs: [
    { number: '01', label: 'Responsive, reliable, and adaptable' },
    { number: '02', label: 'Broad and trusted supplier network' },
    { number: '03', label: 'Cost-conscious with flexible invoicing' },
  ],
  howWeHelp: [
    {
      heading: 'Your team stays focused',
      body: 'We handle the execution work that pulls your team away from their best work. They keep their priorities. Everything else gets done.',
    },
    {
      heading: 'Brief us once. Consider it done.',
      body: 'We work as an extension of your team. Tell us what you need, and we take full ownership, delivering exactly as you\'d expect.',
    },
    {
      heading: 'Ready when you need us',
      body: 'Last-minute request? Ongoing programme? We flex to fit. Expert support, zero overhead, no long-term commitment required.',
    },
  ],
  // Five cards across leaves roughly 160px of text width each, so these are
  // kept to a dozen words. The full list lives on What We Do.
  servicesPreview: [
    {
      title: 'Strategy and intelligence',
      body: 'Go-to-market planning, market and competitor research, sales enablement, regulated device marketing.',
      href: '/what-we-do#strategy',
    },
    {
      title: 'Brand and creative',
      body: 'Brand management, content, PR and media relations, thought leadership, websites.',
      href: '/what-we-do#brand',
    },
    {
      title: 'Projects and campaigns',
      body: 'Campaign planning and execution, email, SEO, paid media, events, product launches.',
      href: '/what-we-do#projects',
    },
    {
      title: 'Operations and management',
      body: 'Asset handling, mailing fulfilment, martech deployment, marketing data compliance.',
      href: '/what-we-do#operations',
    },
    {
      title: 'Logistics and procurement',
      body: 'Venue booking, print and materials, branded merch, storage and delivery.',
      href: '/what-we-do#logistics',
    },
  ],
} as const;

// ============================================================
// WHAT WE DO PAGE
// ============================================================

export const SERVICES = {
  intro: 'Our range reflects two things: hands-on marketing expertise built across disciplines over 18 years, and a trusted network of specialist suppliers we call on when a brief needs it. Whatever we take on, we own end to end. Delivered on time and on budget.',
  // Entry points for a visitor who recognises their own situation faster than
  // they recognise a service category. Each drops them at the right section.
  scenarios: [
    { text: 'A launch is coming and the team is flat out', href: '#projects' },
    { text: 'An exhibition needs running end to end', href: '#logistics' },
    { text: 'A regulated product needs claims-safe marketing', href: '#regulated' },
    { text: 'You need senior cover for a few days a month', href: '#operations' },
  ],
  pillars: [
    {
      id: 'strategy',
      title: 'Strategy and intelligence',
      short: 'Strategy',
      chips: ['Go-to-Market', 'Market Research', 'Competitor Intel', 'Sales Enablement', 'ABM', 'Product Marketing', 'Regulated Markets', 'Health Economics'],
      services: [
        {
          name: 'Go-to-Market Planning',
          detail:
            'Market entry strategy, launch sequencing, channel selection, positioning, and value proposition development.',
        },
        {
          name: 'Market and Audience Research',
          detail:
            'Primary and secondary research, qualitative and quantitative studies, customer insight programmes, survey design and analysis, and focus groups. Persona development, audience profiling, segmentation modelling, and market sizing to sharpen targeting and messaging.',
        },
        {
          name: 'Competitive Intelligence',
          detail:
            'Ongoing competitor monitoring, market mapping, benchmarking, pricing analysis, and whitespace identification.',
        },
        {
          name: 'Commercial Support',
          detail:
            'Commercial strategy, pricing frameworks, revenue planning, sales and partner enablement, and partnership commercials.',
        },
        {
          name: 'Sales Enablement',
          detail:
            'Pitch decks, sales collateral, battlecards, RFP response support, proposal design, and deal-specific marketing assets that help commercial teams convert more effectively.',
        },
        {
          name: 'Product Marketing',
          detail:
            'Product positioning, messaging frameworks, launch planning, competitive differentiation, and go-to-market enablement materials.',
        },
        {
          name: 'Regulated Device Marketing',
          detail:
            'Pre- and post-market marketing strategy for regulated devices and products. Communications that support regulatory approval processes, claims-compliant promotional materials, and ongoing adherence to MHRA, FDA, and EU MDR requirements.',
        },
        {
          name: 'Account-Based Marketing',
          detail:
            'Account identification and tiering, personalised content and campaign planning, stakeholder mapping, and coordinated sales and marketing activity targeting high-value accounts.',
        },
        {
          name: 'ROI and Health Economic Analysis',
          detail:
            'Economic modelling to quantify the value of healthcare products and interventions. Cost-effectiveness analysis, budget impact models, payer value propositions, and support for NICE and reimbursement submissions to build the commercial and clinical case for adoption.',
          // Shown only once the ROI calculators page is published — see
          // ROI_PAGE_PUBLISHED above.
          link: ROI_PAGE_PUBLISHED
            ? { label: 'ROI calculators for healthtech', href: '/roi-calculators' }
            : undefined,
        },
      ],
    },
    {
      id: 'brand',
      title: 'Brand and creative',
      short: 'Brand',
      chips: ['PR & Media', 'Thought Leadership', 'Awards', 'Influencers', 'Case Studies', 'Content', 'Brand Research', 'Web Design & Dev'],
      services: [
        {
          name: 'Sponsor, Influencer, and Partnership Acquisition',
          detail:
            'Managing brand collaborations, ethical and brand alignment review, shortlisting, outreach, recruitment, and contracting.',
        },
        {
          name: 'Brand Perception and Mystery Shopping',
          detail:
            'Anonymised user feedback, real-world mystery and secret shopper programmes, and brand sentiment analysis.',
        },
        {
          name: 'Content Development',
          detail:
            'Strategy-led content creation across formats (written, visual, and video) for owned, earned, and paid channels.',
        },
        {
          name: 'PR and Media Relations',
          detail:
            'Press release writing and distribution, journalist and analyst outreach, media list management, reactive media handling, coverage tracking, and spokesperson briefing.',
        },
        {
          name: 'Awards',
          detail:
            'Awards strategy, category research and selection, entry writing, submission management, and post-award amplification.',
        },
        {
          name: 'Thought Leadership and Executive Content',
          detail:
            'Ghostwriting, LinkedIn strategy and content for senior leaders, white papers, opinion articles, speaking submissions, and award nominations for individuals.',
        },
        {
          name: 'Client Success Stories',
          detail:
            'End-to-end case study production: interviewing, writing, design briefing, approval management, and multi-channel distribution.',
        },
        {
          name: 'Website Development and Design',
          detail:
            'Design and build of marketing websites, landing pages, and microsites. From concept and wireframe through to development, QA, and launch.',
        },
      ],
    },
    {
      id: 'projects',
      title: 'Projects and campaigns',
      short: 'Projects',
      chips: ['Campaigns', 'Email Marketing', 'SEO', 'Social Media', 'Paid Media', 'Events', 'Launches', 'Internal Comms', 'Reporting'],
      services: [
        {
          name: 'Campaign Planning and Frameworks',
          detail:
            'Integrated marketing planning, budget modelling, KPI frameworks, reporting structures, and strategic roadmaps.',
        },
        {
          name: 'Content and Campaigns',
          detail:
            'Ideation and execution, planning, management, and rollout of content campaigns across owned, earned, and paid channels. UGC, podcast recording, video, and quality review.',
        },
        {
          name: 'SEO',
          detail:
            'Technical SEO audits, keyword strategy, on-page optimisation, content gap analysis, and organic performance tracking to improve search visibility and qualified traffic.',
        },
        {
          name: 'Email Marketing',
          detail:
            'Campaign build and deployment, list segmentation, automation flow design, A/B testing, deliverability management, and performance reporting across CRM and email platforms.',
        },
        {
          name: 'Social Media Management',
          detail:
            'Proactive content planning, responsive posting, real-time onsite event coverage, and competitor presence audit.',
        },
        {
          name: 'Events, Exhibitions, and Conferences',
          detail:
            'End-to-end planning and delivery of events, exhibitions, conferences, tradeshows, and launch events: concept, logistics, venue booking, staffing, onsite delivery, and post-event follow-up.',
        },
        {
          name: 'Paid Media Planning',
          detail:
            'Cross-channel media planning, negotiation, and purchase of on- and offline advertising space.',
        },
        {
          name: 'Product and Service Launches',
          detail:
            'Full-funnel launch planning and execution, from pre-launch build-up and announcement through to post-launch follow-up and measurement.',
        },
        {
          name: 'Internal Communications',
          detail:
            'Employee newsletters, leadership communications, town hall and all-hands content, intranet copy, and change communications to keep internal audiences informed and engaged.',
        },
        {
          name: 'Campaign Reporting and Analytics',
          detail:
            'End-to-end performance tracking, ROI analysis, attribution reporting, and post-campaign reviews to inform future activity.',
        },
        {
          name: 'Project Management',
          detail:
            'End-to-end coordination across multiple workstreams, stakeholders, and suppliers. Clear milestones, clean delivery.',
        },
      ],
    },
    {
      id: 'operations',
      title: 'Operations and management',
      short: 'Operations',
      chips: ['Assets', 'MarTech', 'Fulfilment', 'Data Compliance', 'Fractional Experts'],
      services: [
        {
          name: 'Asset Management and Audit',
          detail:
            'Managing, storing, and maintaining physical and digital marketing assets. Decluttering, cataloguing, and functional setup of storage spaces. Sustainable resale, donation, or secure disposal of old and depreciating stock.',
        },
        {
          name: 'Mailing Fulfilment and Distribution',
          detail:
            'Handling bulk mailing, packaging, customs clearance, stewardship and custodianship of deliveries, and shipping.',
        },
        {
          name: 'Marketing Tech and Data',
          detail:
            'Strategic martech stack analysis, planning and deployment; data review and analysis including cleaning, consolidation, and compliance checks.',
        },
        {
          name: 'Fractional Experts',
          detail:
            'Strategic and tactical specialists embedded into your team or available on demand. Senior-level expertise without the full-time overhead.',
        },
      ],
    },
    {
      id: 'logistics',
      title: 'Logistics and procurement',
      short: 'Logistics',
      chips: ['Venues', 'Print & Merch', 'Storage', 'Purchasing'],
      services: [
        {
          name: 'Venue Search and Booking',
          detail:
            'Scouting and screening, shortlisting, and contracting event venues to fit any brief.',
        },
        {
          name: 'Print, Materials, and Supplies',
          detail:
            'Banners, stands, graphics, POS, modular stands, large format print, branded merch, signage, and all event kit.',
        },
        {
          name: 'Storage, Logistics, and Delivery',
          detail:
            'Offsite merch, exhibition material, displays, technology, assets, and promotional items. Stored and delivered.',
        },
        {
          name: 'Purchase of Materials',
          detail:
            'Rapid advance purchase and delivery of goods: tech, promo, and marketing materials from reliable providers.',
        },
      ],
    },
  ],
} as const;

// ============================================================
// WHO WE ARE PAGE
// ============================================================

export const ABOUT = {
  headline: 'Who We Are',
  body: [
    'WYN WIN was founded because we kept seeing the same problem. Marketing teams doing brilliant strategic work, constantly pulled sideways by execution tasks that nobody else could own. Events that need managing. Content that needs producing. Suppliers that need chasing. It\'s not glamorous work, but it\'s mission-critical.',
    'We\'ve spent years inside marketing teams at companies of all sizes, from fast-moving start-ups to global corporations. We know what good looks like. We know how to get things done without being told twice. And we\'ve built a supplier network that means we can move fast, wherever the brief takes us.',
    'WYN WIN exists to be the team behind your team: the people who pick up what others can\'t, and deliver it exactly as you need it.',
  ],
} as const;

// ============================================================
// TESTIMONIALS
// ============================================================

export const TESTIMONIALS = [
  {
    quote: 'Sam is supporting - and has integrated into - the Audience Social Marketing team with ease and brings strong NHS and commercial sector experience. It\'s a win win!',
    name: 'Ed Gyde',
    company: 'CEO, Audience Social Marketing',
    linkedin: 'https://www.linkedin.com/in/ed-gyde/',
  },
  {
    quote: 'Sam knows his stuff.',
    name: 'Dr Tauseef Mehrali',
    company: 'VP Regulatory | GP',
    linkedin: 'https://www.linkedin.com/in/tauseef-mehrali/',
  },
] as const;

// ============================================================
// REGULATED MARKETS
// ============================================================

export const REGULATED_MARKETS = {
  eyebrow: 'Specialist capability',
  headline: 'Marketing built for regulated environments.',
  intro:
    'Marketing for regulated devices and products demands more than creativity. Every claim needs substantiation. Every channel needs compliance review. Every launch must work within what is permitted, not just what is possible.',
  body:
    'We have spent years inside healthcare, medtech, and pharmaceutical environments. We understand how marketing and communications intersect with regulatory processes, and we know how to deliver commercially effective work that stays within those bounds.',
  capabilities: [
    {
      heading: 'Pre-market support',
      body: 'Build your brand story, stakeholder communications, and go-to-market foundations while the approval process is underway. Arrive at launch ready to move.',
    },
    {
      heading: 'Regulatory approval communications',
      body: 'Marketing and communications materials that support, not complicate, the regulatory submission. Clear, accurate, and evidenced.',
    },
    {
      heading: 'Post-market compliance',
      body: 'Promotional material review, claims substantiation, and ongoing adherence to MHRA, FDA, EU MDR, and sector-specific codes of practice.',
    },
    {
      heading: 'Ongoing marketing compliance',
      body: 'Keeping all marketing activity aligned with evolving regulations, reviewing materials before publication, and helping your team move fast without cutting corners.',
    },
  ],
} as const;

// ============================================================
// META / SEO
// ============================================================

export const META = {
  siteName: 'WYN WIN',
  siteUrl: 'https://wynwin.co.uk',
  // Every route shares the one generated social card, so the alt describes the
  // card rather than the page. The root route gets this automatically from the
  // `alt` export in app/opengraph-image.tsx; child routes replace the parent's
  // openGraph object, so they have to name the image (and this alt) themselves.
  ogAlt: 'WYN WIN — Marketing services for busy people.',
  // Only `home.title` carries the brand — it is the metadata default. The other
  // three are run through the '%s | WYN WIN' template in app/layout.tsx, so a
  // suffix here would render twice in the browser tab.
  home: {
    title: 'Marketing services for busy people | WYN WIN',
    description:
      'WYN WIN is an outsourced execution partner for marketing teams. We handle logistics, events, campaigns, procurement, operations, and brand. Whatever you need, whenever it\'s needed.',
  },
  whatWeDo: {
    title: 'Marketing services: strategy, brand, campaigns, operations and logistics',
    description:
      'WYN WIN\'s five service pillars cover strategy, brand, campaigns, operations, and logistics. Including PR, email marketing, SEO, sales enablement, ABM, and regulated device marketing.',
  },
  whoWeAre: {
    title: 'About Sam Woodhouse, founder',
    description:
      'WYN WIN was founded to fill the gap between marketing strategy and execution. Learn about our experience, approach, and why clients trust us.',
  },
  getInTouch: {
    title: 'Get in touch',
    description:
      'Contact WYN WIN for marketing operations, events, campaigns, logistics, and fractional marketing support. We reply within one working day.',
  },
  roiCalculators: {
    title: 'ROI Calculators for Healthtech Companies | WYN WIN',
    description:
      'ROI calculators for healthtech, from event conversation starters to business case models. AI-enabled, led by digital health specialists.',
  },
} as const;

// ============================================================
// ROI CALCULATORS LANDING PAGE  (/roi-calculators)
// ------------------------------------------------------------
// Standalone landing page for the ROI calculator design and build
// service. Items carrying a `tbc` string are unconfirmed and render
// as a visible placeholder on the page — see TbcNote in
// components/RoiSections.tsx. Clear the `tbc` value (and fill in the
// real content) to remove the placeholder before publishing.
// ============================================================

export const ROI = {
  // ── Section 1: Hero ──────────────────────────────────────
  hero: {
    eyebrow: 'ROI calculators for healthtech',
    // Alternative H1 for Sam to choose between: 'Show your value. Close the deal.'
    headline: 'Put a number on your value that finance will believe.',
    body: 'We design and build ROI calculators for healthtech companies. Some are quick, built to start conversations at events and bring in leads from your website. Others go deep, giving a buyer\'s finance team and board real numbers to build a business case.',
    primaryCta: { label: 'Book a scoping call', href: '#contact' },
    secondaryCta: { label: 'See what we\'ve built', href: '#range' },
    credibility: {
      text: 'Calculators built for Oracle Health (Cerner), Ada Health and RLDatix.',
      tbc: 'Client permission to name. Text only. No logos unless separately approved.',
    },
    image: {
      // Set `src` once the photo is supplied and the placeholder disappears.
      // If the photo shows a specific calculator type (e.g. the touchscreen),
      // this path can be moved to Section 3 instead.
      src: null as string | null,
      alt: '',
      width: 1200,
      height: 900,
      tbc: 'Sam to supply the hero photo at /public/images/roi-calculators/calculator-in-use.jpg, plus alt text describing what it shows.',
    },
  },

  // ── Section 2: The problem ───────────────────────────────
  problem: {
    headline: 'Most value stories stall at the spreadsheet.',
    body: [
      'Healthcare buyers expect vendors to overstate benefits, so they mark down every number you show them. A spreadsheet built by a sales rep can\'t show where its assumptions came from. And each new market means starting again, with a different currency, a different workforce model and different reference costs.',
      'A well-built calculator changes the conversation. The buyer sees how each result is worked out, and gets an output their finance team can check.',
    ],
  },

  // ── Section 3: The range ─────────────────────────────────
  // Framing rule: these are examples of what WYN WIN has built, not a
  // package every client receives. Never write "three formats",
  // "all three" or "every calculator includes".
  range: {
    headline: 'From first conversation to business case.',
    intro: 'Not every buyer conversation needs the same depth. We\'ve built calculators across the range, from quick tools that get people talking at an event to in-depth versions that give a buyer\'s finance team and board real numbers to build a business case. We\'ll help you choose the right fit for how you sell.',
    spectrum: { start: 'Quick conversation starter', end: 'In-depth business case' },
    cards: [
      {
        title: 'Event touchscreen',
        role: 'Starts conversations',
        bestFor: 'Events and exhibitions',
        dataEntry: { label: 'Minimal', level: 1 },
        result: 'A rounded, indicative assessment',
        body: 'The quickest type we build, designed for a stand. Built-in assumptions give visitors a rounded view of their potential ROI and give your team an easy way into a fuller conversation.',
      },
      {
        title: 'Short-form web',
        role: 'Generates leads',
        bestFor: 'Campaigns and your website',
        dataEntry: { label: 'Some', level: 2 },
        result: 'A tailored estimate',
        body: 'Shorter, and built for campaign landing pages and your website. Prospects add some details about their current systems and get a tailored estimate. You get a lead who has already told you what matters to them.',
      },
      {
        title: 'Long-form commercial',
        role: 'Builds the business case',
        bestFor: 'In-depth sales conversations',
        dataEntry: { label: 'Detailed', level: 3 },
        result: 'The fullest picture of ROI',
        body: 'Your sales team walks the buyer through it using the organisation\'s own real-world data. It gives their finance team and board real numbers to build a business case.',
      },
    ],
  },

  // ── Section 4: Built to scale ────────────────────────────
  scale: {
    headline: 'Built to scale',
    intro: 'However quick or in-depth, the calculators we build are designed to grow with you.',
    items: [
      {
        title: 'Scenario templates',
        body: 'Templated scenarios for different types of organisation, built on sourced assumptions, give users a relevant starting point with less to enter. Everything stays fully configurable, down to the baseline assumptions.',
        wide: true,
      },
      {
        title: 'Account templates',
        body: 'For your target accounts, we pre-build templates populated with the information available on each organisation. Your sales team opens the conversation with numbers that already reflect the buyer, and the buyer refines them from there.',
        wide: true,
      },
      {
        title: 'New markets without a rebuild',
        body: 'Calculation logic is kept separate from local data, so adding a country, currency or updated reference costs is an update rather than a new project.',
        wide: false,
      },
      {
        title: 'Connected to your tools',
        body: 'Integrates with email, HubSpot and Salesforce, so leads and results flow straight into the systems your team already uses.',
        wide: false,
      },
      {
        title: 'Runs where your buyers are',
        body: 'Embeds on your website and works on mobile and event touchscreens. Built in HTML, JavaScript or React to fit your tech stack.',
        wide: false,
      },
    ],
  },

  // ── Section 5: Examples ──────────────────────────────────
  // No figures, outputs or screenshots of results on this page.
  examples: {
    headline: 'Built for complex care settings',
    intro: 'Every calculator starts with a different value story. Here are some we\'ve built.',
    tbc: 'All client names and descriptions in this section require client approval before publishing.',
    formatsTbc: 'Sam to confirm which formats were built for each client (Event touchscreen / Short-form web / Long-form commercial). Format tags are omitted on every card until confirmed.',
    cards: [
      {
        client: 'Oracle Health (Cerner)',
        focus: 'Clinical workflow',
        drivers: ['Clinical time saved', 'Administrative time saved'],
        formats: [] as string[],
        markets: [] as string[],
        detail: 'Quantifies the clinical and administrative time released through improved workflows.',
        note: null as string | null,
        noteTbc: null as string | null,
        detailTbc: null as string | null,
      },
      {
        client: 'Ada Health',
        focus: 'Financial impact',
        drivers: [
          'Increased patient revenue',
          'Care redirection savings across emergency department and telehealth',
          'Fewer call centre interactions',
        ],
        formats: [] as string[],
        markets: [] as string[],
        detail: 'Brings revenue growth and cost avoidance together in a single financial case.',
        note: null as string | null,
        noteTbc: null as string | null,
        detailTbc: null as string | null,
      },
      {
        client: 'RLDatix Smart Match',
        focus: 'Workforce',
        drivers: ['Reduced agency spend', 'Higher bank staff utilisation', 'Admin hours released'],
        formats: [] as string[],
        markets: [] as string[],
        detail: null as string | null,
        note: 'Savings count the agency premium avoided, not the full cost of every shift moved. It\'s a smaller number, and one that stands up to scrutiny.',
        noteTbc: 'Sam to confirm this methodology detail can be published.',
        detailTbc: null as string | null,
      },
      {
        client: 'RLDatix Galen',
        focus: 'Legacy data',
        drivers: [
          'Legacy system costs removed',
          'Clinical capacity released',
          'Medication errors avoided',
          'Readmissions avoided',
        ],
        formats: [] as string[],
        markets: ['UK', 'US', 'Australia'],
        detail: 'Three market versions built from one model.',
        note: null as string | null,
        noteTbc: null as string | null,
        detailTbc: 'Confirm what differs between the market versions, e.g. currency, cost data, care settings.',
      },
    ],
  },

  // ── Section 6: How we build it ───────────────────────────
  process: {
    headline: 'How we build it',
    intro: 'Experienced digital health product and marketing specialists design and lead every project, and we use AI to speed up research, build and testing. You can add two optional layers of challenge. Experienced clinical, financial and operational people from the sector you sell into can join the build, and a health economist can review the model at three gateways before it goes in front of buyers.',
    introTbc: 'Confirm wording for the sector experts (e.g. whether "from the sector you sell into" is accurate) and for the health economist.',
    expertLabel: 'Optional sector expert input',
    steps: [
      {
        title: 'Value discovery',
        body: 'We work with your product, sales and customer teams to find the value drivers buyers care about, and test which ones hold up. Clinical, financial and operational experts from your sector can check them against how care is actually delivered and funded.',
        expertInput: true,
        gateway: null as string | null,
      },
      {
        title: 'Model design',
        body: 'We map inputs to outcomes, set out the calculation logic, and agree what the calculator will and won\'t claim.',
        expertInput: false,
        gateway: 'Gateway 1: Optional economist review of model structure and logic',
      },
      {
        title: 'Evidence and assumptions',
        body: 'Every default value gets a source, whether that\'s published research, national cost data or your own customer results. Where the evidence is thin, we set conservative defaults and say so. Sector experts can confirm the defaults match real operational practice. We also set the baseline assumptions behind each scenario template and gather the account information used to pre-populate account templates.',
        expertInput: true,
        gateway: 'Gateway 2: Optional economist review of assumptions and sources',
      },
      {
        title: 'Build',
        body: 'We build the calculation engine, interface, templates and results copy using AI-assisted development, so you see a working version early and can shape it.',
        expertInput: false,
        gateway: null as string | null,
      },
      {
        title: 'Review',
        body: 'Your product, sales and commercial teams review working versions in structured rounds. If sector experts are involved, they review too, checking the calculator reflects how organisations in your market really work. Every comment is logged, resolved and signed off, so nothing gets lost between versions.',
        expertInput: true,
        gateway: null as string | null,
      },
      {
        title: 'Testing',
        body: 'We test the calculations, edge cases and extreme inputs, the questions a sceptical buyer would ask, and how the calculator performs on every device it will run on.',
        expertInput: false,
        gateway: 'Gateway 3: Optional economist review of final outputs before launch',
      },
      {
        title: 'Integrate and launch',
        body: 'We connect the calculator to email, HubSpot or Salesforce, embed it on your website or event hardware, and give your team guidance on using it with buyers.',
        expertInput: false,
        gateway: null as string | null,
      },
    ],
    durationTbc: 'Optional line on typical project length. Omit the line entirely if not confirmed.',
  },

  // ── Section 7: AI and people ─────────────────────────────
  aiAndPeople: {
    headline: 'AI does the heavy lifting. People make the calls.',
    body: 'AI lets us research faster, build faster and test more scenarios than a manual process allows. It doesn\'t decide what your product is worth. Specialists who\'ve spent years in digital health set the value logic, choose the evidence and approve every assumption, with sector experts and a health economist adding challenge where you want it. Every number in the calculator traces back to a source you can show a buyer.',
    tbc: 'Sam to supply a one-sentence data handling statement covering how client and customer data is treated when AI tools are used.',
  },

  // ── Section 8: What you get ──────────────────────────────
  whatYouGet: {
    headline: 'What you get',
    items: [
      {
        title: 'A calculator built for how you sell',
        body: 'From a quick event or web tool to an in-depth commercial model, scoped to your goals.',
      },
      {
        title: 'Scenario and account templates',
        body: 'Assumption-based scenarios and pre-populated account templates that cut data entry without locking anything down.',
      },
      {
        title: 'Integration and deployment',
        body: 'Connected to email, HubSpot or Salesforce, and live on your website, mobile or touchscreen.',
      },
      {
        title: 'Assumptions and sources register',
        body: 'Every input, default value and source in one place.',
      },
      {
        title: 'Methodology note',
        body: 'A plain-English explanation for finance and procurement reviewers.',
      },
      {
        title: 'Copy and sales enablement',
        body: 'Interface and results copy written for your buyers, plus guidance on using the calculator with buyers.',
      },
    ],
  },

  // ── Section 9: Who we work with ──────────────────────────
  whoWeWorkWith: {
    headline: 'Who we work with',
    body: 'Healthtech companies selling into hospitals, health systems and other healthcare organisations. Usually that means sales and commercial leaders who need a sharper value conversation, marketing teams who want tools that generate pipeline from campaigns and events, and leadership teams taking a product into the UK, US or Australia.',
  },

  // ── Section 10: Why WYN WIN ──────────────────────────────
  whyWynWin: {
    headline: 'Why WYN WIN',
    columns: [
      {
        title: 'Digital health specialists',
        body: 'We know how NHS and international healthcare buyers build a business case, and what their finance teams look for. When you want more depth, we bring in clinical, financial and operational experts from the sector you sell into.',
        tbc: 'Optional credential line, e.g. years of experience.',
      },
      {
        title: 'Conservative by default',
        body: 'We\'d rather give you a smaller number that survives scrutiny than a big one that gets thrown out.',
        tbc: null as string | null,
      },
      {
        title: 'Built to grow',
        body: 'Configurable templates, clean integrations and models designed from day one to extend across products and markets.',
        tbc: null as string | null,
      },
    ],
    testimonialTbc: 'Calculator-specific testimonial. If none is available, delete this placeholder. Do not reuse the general homepage testimonials here.',
  },

  // ── Section 11: FAQs ─────────────────────────────────────
  faqs: {
    headline: 'Common questions',
    items: [
      {
        question: 'What do you need from us?',
        answer: 'Time with the people who know the product and the customers, usually product, sales and customer success. Plus any outcome data, case studies or evidence you already hold. We\'ll find the rest.',
        tbc: null as string | null,
      },
      {
        question: 'Which type of calculator do we need?',
        answer: 'It depends on where you\'ll use it. A quick touchscreen or web version suits events and campaigns. If your buyers need numbers for a business case, an in-depth commercial version is the better fit. Some clients use more than one, and a later version can build on the same model.',
        tbc: null as string | null,
      },
      {
        question: 'How long does it take?',
        answer: null as string | null,
        tbc: 'Typical project length not confirmed. Confirm the answer, or delete this FAQ before publishing.',
      },
      {
        question: 'Do we need sector experts or economist review?',
        answer: 'Both are optional, and you can choose either or both. Clinical, financial and operational experts check the calculator against how organisations in your market really work. Economist review adds methodological challenge, and is worth it when the calculator will feed into formal business cases, support public claims, or be used with finance and procurement teams who\'ll test the numbers hard.',
        tbc: null as string | null,
      },
      {
        question: 'Will it work with our CRM and website?',
        answer: 'We\'ve integrated calculators with email, HubSpot and Salesforce, and we build in HTML, JavaScript or React so they fit your existing site. If you use a different platform, tell us and we\'ll look at the options.',
        tbc: null as string | null,
      },
      {
        question: 'Can one calculator work in more than one country?',
        answer: 'Yes. We keep the calculation logic separate from market-specific data such as currency, workforce costs and reference costs, so one model can support several markets. Our Galen calculators run in UK, US and Australian versions.',
        tbc: 'Naming the Galen market versions is subject to RLDatix permission.',
      },
      {
        question: 'Who owns the calculator?',
        answer: null as string | null,
        tbc: 'Ownership and IP terms not confirmed. Confirm the answer, or delete this FAQ before publishing.',
      },
      {
        question: 'How do you use AI with our data?',
        answer: null as string | null,
        tbc: 'Data handling statement not confirmed. Confirm the answer, or delete this FAQ before publishing.',
      },
    ],
  },

  // ── Section 12: Final CTA ────────────────────────────────
  finalCta: {
    headline: 'Let\'s put a number on your value.',
    body: 'Tell us what your product does and who buys it. We\'ll get back to you, usually the same day, to set up a short scoping call.',
    messagePlaceholder: 'Tell us about your product, who buys it, and where you\'d use a calculator',
    // Tags every enquiry from this page so it can be identified in the inbox.
    source: 'roi-calculators',
  },

  // ── Service JSON-LD ──────────────────────────────────────
  schema: {
    serviceType: 'ROI calculator design and build',
    // TBC: confirm markets. Currently UK, US and Australia.
    areaServed: ['United Kingdom', 'United States', 'Australia'],
    areaServedTbc: 'Confirm the markets listed in the Service structured data. Currently UK, US and Australia.',
  },
} as const;
