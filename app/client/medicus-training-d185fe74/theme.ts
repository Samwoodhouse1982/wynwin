// Look and feel for the Medicus training page. Everything that is "brand" is in
// this one file.
//
// The navy and green are sampled from the Medicus logo. The remaining greys and
// greys are still placeholders, because the Medicus site could not be reached
// when this was built. The fonts are Medicus's web fonts, Arial and Georgia.
export const theme: Record<string, string> = {
  '--t-bg': '#f6f8fb',
  '--t-surface': '#ffffff',
  '--t-ink': '#051e3c',
  '--t-muted': '#5b6b7b',
  '--t-line': '#dbe3ec',
  '--t-brand': '#051e3c',
  '--t-brand-ink': '#ffffff',
  '--t-brand-soft': '#0d3a63',
  '--t-accent': '#0cd996',
  // Medicus web fonts: Georgia for headings (it matches the serif logo), Arial for text.
  '--t-font': 'Arial, Helvetica, sans-serif',
  '--t-font-heading': 'Georgia, "Times New Roman", serif',
};

export const brand = {
  name: 'Medicus',
  logo: {
    src: '/clients/medicus/logo.png',
    alt: 'Medicus by Doctolib',
    width: 1125,
    height: 445,
  },
  tagline: 'Training library',
  searchPlaceholder: 'Search, e.g. “dispensing”',
  heroTitle: 'Welcome to Medicus training',
  heroLead:
    'Short videos to help you and your practice get the most from Medicus. Tell us a little about you and we will show you the ones that matter most.',
};
