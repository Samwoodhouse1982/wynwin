import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | WYN WIN',
  description: 'How WYN WIN Services Ltd uses cookies on wynwin.co.uk.',
};

export default function CookiesPage() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl font-bold text-navy mb-4">Cookie Policy</h1>
        <p className="text-navy/50 text-sm mb-12">Last updated: March 2025</p>

        <div className="space-y-8 text-navy/70">
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">What are cookies?</h2>
            <p className="leading-relaxed">
              Cookies are small text files placed on your device when you visit a website. They
              help websites function and provide information to the site owner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">How we use cookies</h2>
            <p className="leading-relaxed">This site uses the following types of cookies:</p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-navy/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white text-left">
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Essential?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-navy">Strictly necessary</td>
                    <td className="px-4 py-3">Core site function and security</td>
                    <td className="px-4 py-3 text-mint font-semibold">Yes</td>
                  </tr>
                  <tr className="bg-cream">
                    <td className="px-4 py-3 font-medium text-navy">Analytics</td>
                    <td className="px-4 py-3">
                      Understand how visitors use the site (e.g. Google Analytics or Plausible)
                    </td>
                    <td className="px-4 py-3">No — with consent</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-navy">Preferences</td>
                    <td className="px-4 py-3">Remember your settings</td>
                    <td className="px-4 py-3">No — with consent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Managing cookies</h2>
            <p className="leading-relaxed">
              You can control or delete cookies through your browser settings. Disabling certain
              cookies may affect how the site functions. For more information visit{' '}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink hover:underline"
              >
                aboutcookies.org
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Questions</h2>
            <p className="leading-relaxed">
              If you have questions about our use of cookies, please refer to our{' '}
              <a href="/privacy" className="text-pink hover:underline">
                Privacy Policy
              </a>{' '}
              or contact us at{' '}
              <a href="mailto:hello@wynwin.co.uk" className="text-pink hover:underline">
                hello@wynwin.co.uk
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
