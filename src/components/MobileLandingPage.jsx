import { useState } from 'react';

export default function MobileLandingPage({ onExplore }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDFCFA', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#F0EDE8]" style={{ background: 'rgba(253, 252, 250, 0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="px-4 py-3 flex justify-between items-center">
          <span className="text-[10px] font-semibold tracking-[0.06em] uppercase text-[#737373]">
            Interactive Essay
          </span>
          <a
            href="#"
            className="text-xs font-medium text-[#525252] no-underline flex items-center gap-1 hover:text-[#C54B32] transition-colors"
          >
            Full paper
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-5 pb-16">
        {/* Title Section */}
        <section className="mb-4">
          <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#C54B32] mb-2">
            Interactive Essay
          </p>
          <h1
            className="text-2xl font-normal leading-[1.2] tracking-[-0.01em] mb-4 text-[#191919]"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            What Could Advanced AI Mean for the Practice of Law?
          </h1>
        </section>

        {/* Divider */}
        <div
          className="w-8 h-0.5 rounded-sm my-4"
          style={{ background: 'linear-gradient(90deg, #C54B32, #E8D5CF)' }}
        />

        {/* Core Claim */}
        <div className="relative py-2 my-3">
          <span
            className="absolute -top-2 -left-2 text-[3rem] text-[#C54B32] opacity-[0.12] leading-none"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            "
          </span>
          <p
            className="text-lg font-normal leading-[1.4] text-[#191919] italic"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            Our central claim is that advanced AI will not, by default, help consumers achieve their desired legal outcomes at lower costs.
          </p>
        </div>

        {/* Context */}
        <p className="text-sm leading-[1.7] text-[#525252] mb-4">
          This paper applies the "AI as Normal Technology" framework to examine the bottlenecks that stand between AI capability advances and the positive transformation of legal practice. We identify three bottlenecks—regulatory barriers, adversarial dynamics, and human involvement—that need to be addressed for AI to deliver better outcomes for consumers.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-3 my-5">
          <button
            onClick={onExplore}
            className="w-full flex items-center justify-center gap-2 bg-[#191919] text-[#FDFCFA] px-5 py-3.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-250 hover:bg-[#C54B32] active:scale-[0.98]"
          >
            Explore the bottlenecks
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-[10px] text-text-secondary/50">
            Optimized for mobile · Swipe to navigate
          </p>
        </div>

        {/* Expandable Section */}
        <section className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 bg-transparent border-none text-sm font-medium text-[#525252] cursor-pointer py-2 px-0 hover:text-[#191919] transition-colors"
          >
            <span>
              {isExpanded ? 'Hide background' : 'Background: Why are legal services expensive?'}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-250 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[2000px]' : 'max-h-0'}`}>
            <div className="py-4">
              <p className="text-sm text-[#525252] leading-[1.7] mb-4">
                Three structural factors help explain why legal services are expensive. Importantly, none are intrinsic to legal services—they reflect choices about procedure, pricing, and professional governance.
              </p>

              <div className="space-y-4">
                {/* Factor 1 */}
                <div className="border-b border-[#F0EDE8] pb-4">
                  <div className="flex items-start gap-3 mb-1">
                    <span className="text-xl font-normal text-[#C54B32] leading-none" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>1</span>
                    <h3 className="text-base font-medium text-[#191919]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      Quality is difficult to evaluate
                    </h3>
                  </div>
                  <p className="text-sm text-[#525252] leading-[1.6] ml-7">
                    Legal services are "credence goods"—their quality is hard to assess even after they're provided.
                  </p>
                </div>

                {/* Factor 2 */}
                <div className="border-b border-[#F0EDE8] pb-4">
                  <div className="flex items-start gap-3 mb-1">
                    <span className="text-xl font-normal text-[#C54B32] leading-none" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>2</span>
                    <h3 className="text-base font-medium text-[#191919]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      Value is often relative
                    </h3>
                  </div>
                  <p className="text-sm text-[#525252] leading-[1.6] ml-7">
                    In litigation, what matters is whether your lawyers are better than the other side's.
                  </p>
                </div>

                {/* Factor 3 */}
                <div className="pb-2">
                  <div className="flex items-start gap-3 mb-1">
                    <span className="text-xl font-normal text-[#C54B32] leading-none" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>3</span>
                    <h3 className="text-base font-medium text-[#191919]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      Regulations may limit competition
                    </h3>
                  </div>
                  <p className="text-sm text-[#525252] leading-[1.6] ml-7">
                    Professional rules require law firms to be fully owned by lawyers, which deters alternative business models.
                  </p>
                </div>
              </div>

              {/* Stats - High End */}
              <div className="mt-5">
                <p className="text-[9px] font-semibold tracking-[0.08em] uppercase text-[#737373] mb-2">
                  The result at the high end of the market
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[#F0EDE8] p-3 rounded-md">
                    <p className="text-xl font-normal text-[#191919] tracking-[-0.01em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      $2,300+
                    </p>
                    <p className="text-[10px] text-[#525252] leading-[1.4] mt-0.5">
                      Top partner hourly rates at large law firms
                    </p>
                  </div>
                  <div className="bg-white border border-[#F0EDE8] p-3 rounded-md">
                    <p className="text-xl font-normal text-[#191919] tracking-[-0.01em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      $115M
                    </p>
                    <p className="text-[10px] text-[#525252] leading-[1.4] mt-0.5">
                      Average litigation costs for Fortune 200 companies (2008)
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats - Low End */}
              <div className="mt-4">
                <p className="text-[9px] font-semibold tracking-[0.08em] uppercase text-[#737373] mb-2">
                  The result at the low end of the market
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[#F0EDE8] p-3 rounded-md">
                    <p className="text-xl font-normal text-[#191919] tracking-[-0.01em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      2.3 hrs
                    </p>
                    <p className="text-[10px] text-[#525252] leading-[1.4] mt-0.5">
                      Billable work per 8-hour day at small law firms
                    </p>
                  </div>
                  <div className="bg-white border border-[#F0EDE8] p-3 rounded-md">
                    <p className="text-xl font-normal text-[#191919] tracking-[-0.01em]" style={{ fontFamily: "'Newsreader', Georgia, serif" }}>
                      70%
                    </p>
                    <p className="text-[10px] text-[#525252] leading-[1.4] mt-0.5">
                      Debt collection defendants who lose by default
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-[#F0EDE8] py-3 z-50" style={{ background: 'rgba(253, 252, 250, 0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="px-5 text-center">
          <p className="text-xs text-[#737373]">
            This is an interactive version of a co-authored essay built by{' '}
            <a href="https://justincurl.github.io" className="text-[#C54B32] no-underline" target="_blank" rel="noopener noreferrer">Justin Curl</a>
            {' '}with{' '}
            <a href="https://devin.ai" className="text-[#C54B32] no-underline" target="_blank" rel="noopener noreferrer">Devin</a>
            {' '}and Claude Code
          </p>
        </div>
      </footer>
    </div>
  );
}
