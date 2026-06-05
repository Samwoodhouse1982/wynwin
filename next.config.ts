import type { NextConfig } from "next";

// Conservative, functionality-safe security headers. A full Content-Security-
// Policy is intentionally omitted — it needs per-domain allowlisting (Google
// Fonts, googletagmanager, api.web3forms.com) plus 'unsafe-inline' for the
// GA snippet and Framer Motion's inline styles, and should be validated in a
// real browser before shipping.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
