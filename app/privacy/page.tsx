import type { Metadata } from 'next';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | WYN WIN',
  description: 'How WYN WIN Services Ltd collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="text-pink font-semibold text-sm uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl font-bold text-navy mb-4">Privacy Policy</h1>
        <p className="text-navy/50 text-sm mb-12">Last updated: March 2025</p>

        <div className="prose prose-navy max-w-none space-y-8 text-navy/70">
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Who we are</h2>
            <p className="leading-relaxed">
              {BRAND.legal.company} (&ldquo;WYN WIN&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is registered in{' '}
              {BRAND.legal.country} (Company No. {BRAND.legal.companyNumber}). Our ICO Data
              Protection Registration is {BRAND.legal.ico}.
            </p>
            <p className="leading-relaxed mt-3">
              Questions about this policy should be directed to{' '}
              <a href={BRAND.emailHref} className="text-pink hover:underline">
                {BRAND.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">What data we collect</h2>
            <p className="leading-relaxed">When you submit a form on this site, we collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Job title and company name (where provided)</li>
              <li>The content of your message</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We do not collect payment details, sensitive personal data, or data from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">How we use your data</h2>
            <p className="leading-relaxed">We use your data to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Respond to your enquiry</li>
              <li>Send relevant information about our services (where you have consented)</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We will never sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Legal basis</h2>
            <p className="leading-relaxed">
              We process your personal data on the basis of your consent (Article 6(1)(a) UK GDPR)
              and where necessary for our legitimate interests in running our business (Article
              6(1)(f)).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Data retention</h2>
            <p className="leading-relaxed">
              We retain enquiry data for up to 2 years unless a longer period is required for legal
              or contractual reasons. You may request deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Your rights</h2>
            <p className="leading-relaxed">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Object to processing</li>
              <li>Lodge a complaint with the ICO at ico.org.uk</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise any of these rights, email{' '}
              <a href={BRAND.emailHref} className="text-pink hover:underline">
                {BRAND.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">Cookies</h2>
            <p className="leading-relaxed">
              See our{' '}
              <a href="/cookies" className="text-pink hover:underline">
                Cookie Policy
              </a>{' '}
              for details of how we use cookies on this site.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
