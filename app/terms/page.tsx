export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">Terms & Conditions</h1>
          <p className="text-white/60 text-lg">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Affiliate Disclosure</h2>
            <p className="text-white/70 leading-relaxed">
              KEYU is a fashion affiliate marketing platform. When you click on product links and make purchases, we may earn a commission from qualifying purchases. This helps us maintain and improve our curation service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
            <p className="text-white/70 leading-relaxed">
              You agree to use KEYU for lawful purposes only. You will not use this platform to engage in any conduct that is abusive, defamatory, harassing, threatening, or otherwise objectionable. We reserve the right to terminate access to users who violate these terms.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Product Links</h2>
            <p className="text-white/70 leading-relaxed">
              All product links provided on KEYU are affiliate links. By clicking on these links, you are directed to third-party merchants. We are not responsible for the quality, pricing, or availability of products sold by external retailers. Please review their terms and privacy policies before making purchases.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Product Information</h2>
            <p className="text-white/70 leading-relaxed">
              Product descriptions, images, and pricing are provided by third-party merchants and may change without notice. KEYU is not responsible for inaccurate product information. Always verify details with the original merchant before purchasing.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-white/70 leading-relaxed">
              KEYU provides content "as is" without any warranties, express or implied. We do not guarantee the accuracy, reliability, or completeness of any content. Your use of KEYU is at your own risk.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <p className="text-white/70 leading-relaxed">
              KEYU shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform or content.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of KEYU constitutes acceptance of updated terms.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
            <p className="text-white/70 leading-relaxed">
              For questions about these terms, please contact us at{' '}
              <a 
                href="mailto:keyu-affiliate@outlook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                keyu-affiliate@outlook.com
              </a>
            </p>
          </section>
        </div>

        {/* Back to Store */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 font-mono"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Store
          </a>
        </div>
      </div>
    </div>
  )
}
