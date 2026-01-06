import { useState, useEffect } from 'react';

export default function LandingPage({ onExplore }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDFCFA', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1000]"
        style={{
          opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-[100] transition-all duration-250 ${isScrolled ? 'border-b border-[#F0EDE8]' : 'border-b border-transparent'}`}
        style={{
          background: 'rgba(253, 252, 250, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="max-w-[1100px] mx-auto px-8 py-3 flex justify-between items-center">
          <span className="text-xs font-semibold tracking-[0.06em] uppercase text-[#737373]">
            Interactive Essay
          </span>
          <a
            href="#"
            className="text-sm font-medium text-[#525252] no-underline flex items-center gap-1.5 hover:text-[#C54B32] transition-colors duration-150"
          >
            Read full paper
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-150 group-hover:translate-x-0.5">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[680px] mx-auto px-6 pt-6 pb-12">
        {/* Title Section */}
        <section className="mb-4 animate-fadeSlideUp">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#C54B32] mb-2">
            Interactive Essay
          </p>
          <h1
            className="text-[clamp(1.75rem,4vw,2.25rem)] font-normal leading-[1.2] tracking-[-0.02em] mb-4 text-[#191919]"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            What Could Advanced AI Mean for the Practice of Law?
          </h1>

          <div className="flex justify-start gap-12">
            <div className="flex flex-col gap-0.5">
              <span className="text-[0.9375rem] font-medium text-[#191919]">Justin Curl</span>
              <span className="text-[0.8125rem] text-[#737373]">Harvard Law School</span>
              <a href="https://x.com/curl_justin" className="text-[0.8125rem] text-[#C54B32] no-underline hover:opacity-70 transition-opacity" target="_blank" rel="noopener noreferrer">
                @curl_justin
              </a>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[0.9375rem] font-medium text-[#191919]">Sayash Kapoor</span>
              <span className="text-[0.8125rem] text-[#737373]">Princeton University</span>
              <a href="https://x.com/sayashk" className="text-[0.8125rem] text-[#C54B32] no-underline hover:opacity-70 transition-opacity" target="_blank" rel="noopener noreferrer">
                @sayashk
              </a>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[0.9375rem] font-medium text-[#191919]">Arvind Narayanan</span>
              <span className="text-[0.8125rem] text-[#737373]">Princeton University</span>
              <a href="https://x.com/random_walker" className="text-[0.8125rem] text-[#C54B32] no-underline hover:opacity-70 transition-opacity" target="_blank" rel="noopener noreferrer">
                @random_walker
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div
          className="w-10 h-0.5 rounded-sm my-4"
          style={{ background: 'linear-gradient(90deg, #C54B32, #E8D5CF)' }}
        />

        {/* Core Claim */}
        <div className="relative py-2 my-2">
          <span
            className="absolute -top-3 -left-3 text-[5rem] text-[#C54B32] opacity-[0.12] leading-none"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            "
          </span>
          <p
            className="text-xl font-normal leading-[1.4] text-[#191919] italic"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            Our central claim is that advanced AI will not, by default, help consumers achieve their desired legal outcomes at lower costs.
          </p>
        </div>

        {/* Context */}
        <p className="text-base leading-[1.7] text-[#525252] mb-4 text-justify">
          Many AI leaders predict transformative changes to knowledge work, with legal services being especially vulnerable to disruption. This paper applies the "AI as Normal Technology" framework to examine what stands between AI capability advances and the positive transformation of legal practice. We identify three bottlenecks—regulatory barriers, adversarial dynamics, and human involvement—that need to be addressed for AI to deliver genuinely better outcomes for consumers.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 my-5">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2.5 bg-[#191919] text-[#FDFCFA] px-5 py-3 text-[0.9375rem] font-medium rounded-md cursor-pointer transition-all duration-250 hover:bg-[#C54B32] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(197,75,50,0.2)]"
          >
            Explore the bottlenecks
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-150 group-hover:translate-x-0.5">
              <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Expandable Section */}
        <section className="mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 bg-transparent border-none text-[0.9375rem] font-medium text-[#525252] cursor-pointer py-2 px-0 hover:text-[#191919] transition-colors duration-150"
          >
            <span>
              {isExpanded
                ? 'Hide background'
                : 'Additional Background: Why are legal services so expensive?'
              }
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-250 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'max-h-[2000px]' : 'max-h-0'}`}
          >
            <div className="py-5">
              <p className="text-base text-[#525252] leading-[1.7] mb-6 text-justify">
                Three structural factors help explain why legal services are expensive. Importantly, none of the sources of market dysfunction are intrinsic to legal services. They reflect choices about procedure, pricing, and professional governance.
              </p>

              <div className="flex flex-col">
                {/* Factor 1 */}
                <div className="py-5 border-b border-[#F0EDE8] first:pt-0">
                  <div className="flex items-start gap-4 mb-2">
                    <span className="text-2xl font-normal text-[#C54B32] leading-none min-w-[1.5rem]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>1</span>
                    <h3 className="text-[1.125rem] font-medium text-[#191919] leading-[1.35]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      Quality is difficult to evaluate
                    </h3>
                  </div>
                  <p className="text-[0.9375rem] text-[#525252] leading-[1.7] ml-10 text-justify">
                    Legal services are what economists call "credence goods"—their quality is hard to assess even after they're provided. Did the client reach the desired outcome because of or in spite of the lawyer's skill? Which decisions actually contributed to success? This evaluation difficulty forces consumers to rely on proxies like reputation and hourly rates.
                  </p>
                </div>

                {/* Factor 2 */}
                <div className="py-5 border-b border-[#F0EDE8]">
                  <div className="flex items-start gap-4 mb-2">
                    <span className="text-2xl font-normal text-[#C54B32] leading-none min-w-[1.5rem]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>2</span>
                    <h3 className="text-[1.125rem] font-medium text-[#191919] leading-[1.35]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      Value is often relative
                    </h3>
                  </div>
                  <p className="text-[0.9375rem] text-[#525252] leading-[1.7] ml-10 text-justify">
                    In litigation, what matters to the outcome often isn't how good your lawyers are in absolute terms, but whether they're better than the other side's. This can create competitive pressure that drives up costs regardless of the underlying complexity of disputes.
                  </p>
                </div>

                {/* Factor 3 */}
                <div className="py-5">
                  <div className="flex items-start gap-4 mb-2">
                    <span className="text-2xl font-normal text-[#C54B32] leading-none min-w-[1.5rem]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>3</span>
                    <h3 className="text-[1.125rem] font-medium text-[#191919] leading-[1.35]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      Regulations may limit competition
                    </h3>
                  </div>
                  <p className="text-[0.9375rem] text-[#525252] leading-[1.7] ml-10 text-justify">
                    Professional rules designed with consumer protection in mind have created their own complications. Unauthorized-practice-of-law rules can make it expensive to offer basic legal assistance in contexts requiring little expertise. Entity regulations require law firms to be fully owned by lawyers, which legal scholar Gillian Hadfield argues deters alternative business models that could leverage economies of scale to deliver services at lower cost.
                  </p>
                </div>
              </div>

              {/* Stats - High End */}
              <div className="mt-6">
                <p className="text-[0.6875rem] font-semibold tracking-[0.08em] uppercase text-[#737373] mb-3">
                  The result at the high end of the market
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-[#F0EDE8] p-5 rounded-md">
                    <p className="text-[2rem] font-normal text-[#191919] mb-1 tracking-[-0.02em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      $2,300+
                    </p>
                    <p className="text-[0.8125rem] text-[#525252] leading-[1.45]">
                      Top partner hourly rates at large law firms
                    </p>
                  </div>
                  <div className="bg-white border border-[#F0EDE8] p-5 rounded-md">
                    <p className="text-[2rem] font-normal text-[#191919] mb-1 tracking-[-0.02em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      $115M
                    </p>
                    <p className="text-[0.8125rem] text-[#525252] leading-[1.45]">
                      Average litigation costs for Fortune 200 companies (2008)
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats - Low End */}
              <div className="mt-6">
                <p className="text-[0.6875rem] font-semibold tracking-[0.08em] uppercase text-[#737373] mb-3">
                  The result at the low end of the market
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-[#F0EDE8] p-5 rounded-md">
                    <p className="text-[2rem] font-normal text-[#191919] mb-1 tracking-[-0.02em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      2.3 hrs
                    </p>
                    <p className="text-[0.8125rem] text-[#525252] leading-[1.45]">
                      Billable work per 8-hour day at small law firms
                    </p>
                  </div>
                  <div className="bg-white border border-[#F0EDE8] p-5 rounded-md">
                    <p className="text-[2rem] font-normal text-[#191919] mb-1 tracking-[-0.02em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      70%
                    </p>
                    <p className="text-[0.8125rem] text-[#525252] leading-[1.45]">
                      Debt collection defendants who lose by default
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}
