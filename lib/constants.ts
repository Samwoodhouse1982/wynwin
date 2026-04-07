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
  { label: 'Home', href: '/' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Who We Are', href: '/who-we-are' },
] as const;

// ============================================================
// HOME PAGE
// ============================================================

export const HOME = {
  hero: {
    headline: 'Services for busy people.',
    body: 'Your marketing team is pulled in too many directions. We take on the tasks they don\'t have time for, so they stay focused on what only they can do. Your business runs smoother, scales faster, and delivers better results.',
    tagline: 'WYN WIN: Whatever You Need, Whenever It\'s Needed.',
    ctas: [
      { label: 'What We Do', href: '/what-we-do', variant: 'outline' as const },
      { label: 'GET **IT DONE.', href: '/get-in-touch', variant: 'primary' as const },
    ],
  },
  valueProp: {
    headline: 'The missing link between strategy and execution.',
    body: 'Every marketing team has tasks that need doing but keep getting bumped. Execution work that\'s too important to ignore but too time-consuming to fit in. That\'s the gap we fill.\n\nFrom last-minute requests to ongoing support, we step in, get up to speed fast, and deliver. No hand-holding, no lengthy briefs. Just results.',
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
  servicesPreview: [
    {
      title: 'Strategy and intelligence',
      body: 'Go-to-market planning, audience research, segmentation, competitive intelligence, product marketing, and commercial support.',
      href: '/what-we-do#strategy',
    },
    {
      title: 'Brand and creative',
      body: 'Brand management, content development, influencer and partnership acquisition, client success stories, brand research, and website development and design.',
      href: '/what-we-do#brand',
    },
    {
      title: 'Projects and campaigns',
      body: 'Campaign planning and execution, content and social, paid media, events, product launches, project management, and performance reporting.',
      href: '/what-we-do#projects',
    },
    {
      title: 'Operations and management',
      body: 'Asset handling, workspace organisation, mailing fulfilment, distribution, martech deployment, and marketing data compliance.',
      href: '/what-we-do#operations',
    },
    {
      title: 'Logistics and procurement',
      body: 'Venue booking, print and materials, branded merch, storage, delivery, advance purchasing, and asset lifecycle management.',
      href: '/what-we-do#logistics',
    },
  ],
} as const;

// ============================================================
// WHAT WE DO PAGE
// ============================================================

export const SERVICES = {
  pillars: [
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
          name: 'Brand and Audience Research',
          detail:
            'Anonymised user feedback, real-world mystery and secret shopper programmes, and brand sentiment analysis.',
        },
        {
          name: 'Content Development',
          detail:
            'Strategy-led content creation across formats (written, visual, and video) for owned, earned, and paid channels.',
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
      title: 'Projects and Campaigns',
      services: [
        {
          name: 'Campaign Planning and Frameworks',
          detail:
            'Integrated marketing planning, budget modelling, KPI frameworks, reporting structures, and strategic roadmaps.',
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
          name: 'Events and Exhibitions',
          detail:
            'End-to-end event and exhibition management: planning, setup, venue booking, logistics, staffing, onsite delivery, and teardown.',
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
          name: 'Campaign Reporting and Analytics',
          detail:
            'End-to-end performance tracking, ROI analysis, attribution reporting, and post-campaign reviews to inform future activity.',
        },
        {
          name: 'Launch Events, Conferences, and Tradeshows',
          detail:
            'End-to-end planning and delivery of launch events, conferences, and tradeshow appearances, from concept and logistics through to onsite execution and post-event follow-up.',
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
        {
          name: 'Fractional Experts',
          detail:
            'Strategic and tactical specialists embedded into your team or available on demand. Senior-level expertise without the full-time overhead.',
        },
      ],
    },
    {
      id: 'logistics',
      title: 'Logistics and Procurement',
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
        {
          name: 'Asset Lifecycle Management',
          detail:
            'Sustainable management of stock and materials; resale, donation, or disposal of old or depreciating assets.',
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
    'WYN WIN exists to be the team behind your team. The people who pick up what others can\'t, and deliver it exactly as you need it. Whatever you need, whenever it\'s needed.',
  ],
} as const;

// ============================================================
// TESTIMONIALS
// ============================================================

export const TESTIMONIALS = [
  {
    quote: 'Sam Woodhouse is supporting - and has integrated into - the Audience Social Marketing team with ease and brings strong NHS and commercial sector experience. It\'s a win win !',
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
// META / SEO
// ============================================================

export const META = {
  siteName: 'WYN WIN',
  siteUrl: 'https://wynwin.co.uk',
  home: {
    title: 'WYN WIN: Services for Busy People',
    description:
      'WYN WIN is an outsourced execution partner for marketing teams. We handle logistics, events, procurement, operations, and brand. Whatever you need, whenever you need it.',
  },
  whatWeDo: {
    title: 'What We Do | WYN WIN',
    description:
      'Explore WYN WIN\'s five service pillars: Strategy & Intelligence, Brand & Creative, Projects & Campaigns, Operations & Management, and Logistics & Procurement.',
  },
  whoWeAre: {
    title: 'Who We Are | WYN WIN',
    description:
      'WYN WIN was founded to fill the gap between marketing strategy and execution. Learn about our experience, approach, and why clients trust us.',
  },
  getInTouch: {
    title: 'Get In Touch | WYN WIN',
    description:
      'Ready to get things done? Contact WYN WIN. We respond fast.',
  },
} as const;
