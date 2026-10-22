// Look and feel for the Medicus training page. Everything that is "brand" is in
// this one file.
//
// The navy and green are sampled from the Medicus logo. The remaining greys and
// the font are still placeholders, because the Medicus site could not be reached
// when this was built. Swap them for the real values if you have them.
export const theme: Record<string, string> = {
  '--t-bg': '#f6f8fb',
  '--t-surface': '#ffffff',
  '--t-ink': '#051e3c',
  '--t-muted': '#5b6b7b',
  '--t-line': '#dbe3ec',
  '--t-brand': '#051e3c',
  '--t-brand-ink': '#ffffff',
  '--t-accent': '#0cd996',
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
  searchPlaceholder: 'Search, for example “dispensing” or “reports”',
  heroTitle: 'Welcome to Medicus training',
  heroLead:
    'Short videos to help you and your practice get the most from Medicus. Tell us a little about you and we will show you the ones that matter most.',
};
