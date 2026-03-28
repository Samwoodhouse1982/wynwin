// ============================================================
// WYN WIN — Site Copy & Data
// Edit this file to update any content across the site.
// ============================================================

export const BRAND = {
  name: 'WYN WIN',
  tagline: 'Whatever You Need, Whenever It\'s Needed.',
  phone: '0730 717 6143',
  phoneHref: 'tel:+447307176143',
  email: 'hello@wynwin.co.uk',
  emailHref: 'mailto:hello@wynwin.co.uk',
  linkedin: 'https://www.linkedin.com/company/wyn-win',
  whatsapp: 'https://wa.me/447307176143',
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

export const NAV_LINKS = [
  { label: 'Our Value', href: '/' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Who We Are', href: '/who-we-are' },
] as const;

// ============================================================
// HOME PAGE
// ============================================================

export const HOME = {
  hero: {
    headline: 'Services for busy people.',
    body: 'We take care of those essential tasks that your marketing team doesn\'t have the time, capacity, or resources to manage — so you can focus on what you do best. Your business runs smoother, scales faster, and performs better.',
    tagline: 'WYN WIN: Whatever You Need, Whenever It\'s Needed.',
    ctas: [
      { label: 'What We Do', href: '/what-we-do', variant: 'outline' as const },
      { label: 'Get Shit Done', href: '/get-in-touch', variant: 'primary' as const },
    ],
  },
  valueProp: {
    headline: 'The missing link between strategy and execution.',
    body: 'With expertise in marketing, operations, logistics, and procurement, we handle the grey areas of execution — those tasks that demand time, resources, and attention but are not the best use of your team\'s energy.\n\nWhether it\'s a last-minute request, a stop-gap measure, or an ongoing requirement, we are here to make things happen seamlessly and efficiently. Simply — we get it done.',
  },
  whyUs: [
    { number: '01', label: 'Responsive, reliable, and adaptable' },
    { number: '02', label: 'Broad and trusted supplier network' },
    { number: '03', label: 'Cost-conscious with flexible invoicing' },
  ],
  howWeHelp: [
    {
      heading: 'Remove operational bottlenecks',
      body: 'We tackle the grey areas of business and marketing execution, enabling your teams to focus on their core priorities.',
    },
    {
      heading: 'Get stuck in',
      body: 'We\'re an extension of your team. You can trust us to roll up our sleeves and get things done exactly as you need them.',
    },
    {
      heading: 'Fast, flexible, and reliable',
      body: 'Whether it\'s a last-minute request or an ongoing project, we deliver seamless expert support without the overhead of hiring in-house.',
    },
  ],
  servicesPreview: [
    {
      title: 'Logistics and event support',
      body: 'Event logistics, planning, venue booking, setup, staffing, sourcing materials, storage, delivery, and onsite installations.',
      href: '/what-we-do#logistics',
    },
    {
      title: 'Brand and creative',
      body: 'Creative brand management, content creation, ROI realisation, SEO, social media, influencer alignment, market research, and campaign execution.',
      href: '/what-we-do#brand',
    },
    {
      title: 'Operations and management',
      body: 'Asset handling, workspace organisation, mailing fulfilment, distribution, martech deployment, and marketing data compliance.',
      href: '/what-we-do#operations',
    },
    {
      title: 'Sourcing and procurement',
      body: 'Rapid sourcing and purchasing of materials, media, print, and venues — efficient, sustainable, and reliably delivered.',
      href: '/what-we-do#sourcing',
    },
    {
      title: 'Strategy and intelligence',
      body: 'Go-to-market planning, audience research, segmentation, competitive intelligence, and integrated campaign frameworks that sharpen your direction.',
      href: '/what-we-do#strategy',
    },
  ],
} as const;

// ============================================================
// WHAT WE DO PAGE
// ============================================================

export const SERVICES = {
  pillars: [
    {
      id: 'logistics',
      title: 'Logistics and Event Support',
      services: [
        {
          name: 'Events and Exhibitions',
          detail:
            'Event planning, setup, venue booking, logistics, staffing, teardown, onsite installations, and exhibit refurbishment.',
        },
        {
          name: 'Sourcing Event Materials',
          detail:
            'Including banners, stands, graphics, POS, modular stands, and large format print.',
        },
        {
          name: 'Storage, Logistics, and Delivery',
          detail:
            'Including offsite merch, exhibition material, displays, technology, assets, and promotional items.',
        },
        {
          name: 'Venue Search and Booking',
          detail:
            'Scouting and screening, shortlisting, and contracting event venues to fit any brief.',
        },
      ],
    },
    {
      id: 'sourcing',
      title: 'Sourcing and Procurement',
      services: [
        {
          name: 'Purchase of Materials',
          detail:
            'Rapid advance purchase and delivery of goods — tech, promo, and marketing materials sourced from reliable providers.',
        },
        {
          name: 'Paid Media Planning',
          detail:
            'Cross-channel media planning, negotiation, and purchase of on- and offline advertising space.',
        },
        {
          name: 'Print Sourcing',
          detail:
            'Printed material, merch, signage, large format, banners, and exhibition kit.',
        },
        {
          name: 'Asset Lifecycle Management',
          detail:
            'Sustainable management of stock and materials; resale, donation, or disposal of old or depreciating assets.',
        },
      ],
    },
    {
      id: 'operations',
      title: 'Operations and Management',
      services: [
        {
          name: 'Asset Management and Audit',
          detail:
            'Managing, storing, and maintaining assets; secure disposal and donation; optimising physical or digital marketing assets.',
        },
        {
          name: 'Workspace Organisation',
          detail:
            'Decluttering, systematising, sorting, cataloguing, and functional setup of storage spaces.',
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
      ],
    },
    {
      id: 'strategy',
      title: 'Strategy and Intelligence',
      services: [
        {
          name: 'Go-to-Market Planning',
          detail:
            'Market entry strategy, launch sequencing, channel selection, positioning, and value proposition development.',
        },
        {
          name: 'Audience Research and Segmentation',
          detail:
            'Persona development, audience profiling, segmentation modelling, and market sizing to sharpen targeting and messaging.',
        },
        {
          name: 'Competitive Intelligence',
          detail:
            'Ongoing competitor monitoring, market mapping, benchmarking, pricing analysis, and whitespace identification.',
        },
        {
          name: 'Campaign Planning and Frameworks',
          detail:
            'Integrated marketing planning, budget modelling, KPI frameworks, reporting structures, and strategic roadmaps.',
        },
        {
          name: 'Awards',
          detail:
            'Awards strategy, category research and selection, entry writing, submission management, and post-award amplification.',
        },
        {
          name: 'Commercial Support',
          detail:
            'Commercial strategy, pricing frameworks, revenue planning, sales and partner enablement, and partnership commercials.',
        },
        {
          name: 'Product Marketing',
          detail:
            'Product positioning, messaging frameworks, launch planning, competitive differentiation, and go-to-market enablement materials.',
        },
      ],
    },
    {
      id: 'brand',
      title: 'Brand and Creative',
      services: [
        {
          name: 'Sponsor, Influencer, and Partnership Acquisition',
          detail:
            'Managing brand collaborations, ethical and brand alignment review, shortlisting, outreach, recruitment, and contracting.',
        },
        {
          name: 'Content and Campaigns',
          detail:
            'Ideation and execution, planning, management, and rollout; case studies, ROI calculations, SEO, UGC, podcast recording, greenscreen, filming, and quality review.',
        },
        {
          name: 'Social Media Management',
          detail:
            'Proactive content planning, responsive posting, real-time onsite event coverage, and competitor presence audit.',
        },
        {
          name: 'Market Research and Competitive Analysis',
          detail:
            'Anonymised user feedback, real-world mystery/secret shopper, and brand sentiment analysis.',
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
    'We\'ve worked with companies of all sizes and maturity, from start-ups to multinational corporations. We have a track record of delivering wide-ranging hands-on and strategic experience, as well as an extensive network of trusted suppliers, partners, and experts.',
    'We understand the grey areas in roles and responsibilities — where tasks fall outside core team functions but remain mission-critical. That\'s why we founded WYN WIN: to provide seamless, reliable, and expert support that helps companies — and in particular marketers — focus on their highest priorities while we handle the rest.',
    'Whether it\'s marketing execution, event management, operational support, or strategic procurement, we ensure that clients can stay ahead without the distraction and stress of managing every detail.',
  ],
} as const;

// ============================================================
// META / SEO
// ============================================================

export const META = {
  siteName: 'WYN WIN',
  siteUrl: 'https://wynwin.co.uk',
  home: {
    title: 'WYN WIN — Services for Busy People',
    description:
      'WYN WIN is an outsourced execution partner for marketing teams. We handle logistics, events, procurement, operations, and brand — whatever you need, whenever you need it.',
  },
  whatWeDo: {
    title: 'What We Do | WYN WIN',
    description:
      'Explore WYN WIN\'s four service pillars: Logistics & Events, Strategic Sourcing, Operations & Management, and Brand & Creative.',
  },
  whoWeAre: {
    title: 'Who We Are | WYN WIN',
    description:
      'WYN WIN was founded to fill the gap between marketing strategy and execution. Learn about our experience, approach, and why clients trust us.',
  },
  getInTouch: {
    title: 'Get In Touch | WYN WIN',
    description:
      'Ready to get things done? Contact WYN WIN — we respond fast.',
  },
} as const;
