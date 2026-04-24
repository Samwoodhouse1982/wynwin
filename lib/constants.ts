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
  { label: 'Get In Touch', href: '/get-in-touch' },
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
      { label: 'Work with us', href: '/get-in-touch', variant: 'primary' as const },
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
      body: 'Go-to-market planning, market research, competitive intelligence, sales enablement, ABM, product marketing, regulated device marketing, and health economic analysis.',
      href: '/what-we-do#strategy',
    },
    {
      title: 'Brand and creative',
      body: 'Brand management, content development, PR and media relations, thought leadership, influencer and partnership acquisition, client success stories, and website development.',
      href: '/what-we-do#brand',
    },
    {
      title: 'Projects and campaigns',
      body: 'Campaign planning and execution, email marketing, SEO, content and social, paid media, events, product launches, internal comms, and performance reporting.',
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
          name: 'Market Research',
          detail:
            'Primary and secondary research, qualitative and quantitative studies, customer insight programmes, survey design and analysis, focus groups, and desk research to inform strategy and decision-making.',
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
          name: 'PR and Media Relations',
          detail:
            'Press release writing and distribution, journalist and analyst outreach, media list management, reactive media handling, coverage tracking, and spokesperson briefing.',
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
    'WYN WIN exists to be the team behind your team: the people who pick up what others can\'t, and deliver it exactly as you need it.',
  ],
} as const;

// ============================================================
// TESTIMONIALS
// ============================================================

export const TESTIMONIALS = [
  {
    quote: 'Sam is supporting - and has integrated into - the Audience Social Marketing team with ease and brings strong NHS and commercial sector experience. It\'s a win win !',
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
  home: {
    title: 'Marketing Execution Services for Busy Teams | WYN WIN',
    description:
      'WYN WIN is an outsourced execution partner for marketing teams. We handle logistics, events, campaigns, procurement, operations, and brand. Whatever you need, whenever you need it.',
  },
  whatWeDo: {
    title: 'What We Do | WYN WIN',
    description:
      'WYN WIN\'s five service pillars cover strategy, brand, campaigns, operations, and logistics. Including PR, email marketing, SEO, sales enablement, ABM, and regulated device marketing.',
  },
  whoWeAre: {
    title: 'Who We Are | WYN WIN',
    description:
      'WYN WIN was founded to fill the gap between marketing strategy and execution. Learn about our experience, approach, and why clients trust us.',
  },
  getInTouch: {
    title: 'Get In Touch | WYN WIN',
    description:
      'Contact WYN WIN for marketing operations, events, campaigns, logistics, and fractional marketing support. We respond the same day.',
  },
} as const;
