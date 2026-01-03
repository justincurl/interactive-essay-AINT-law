import { useEffect, useRef, useState } from 'react';

export default function ReformModal({ bottleneckNode, reformNode, onClose }) {
  const modalRef = useRef(null);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(timeoutId);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!reformNode) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-cream border border-[#a7f3d0] rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-modal-enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reform-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d1fae5] bg-gradient-to-r from-[#ecfdf5] to-[#f0fdfa]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d1fae5] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3
                id="reform-modal-title"
                className="font-heading text-lg font-semibold text-text-primary"
              >
                Pathway to Reform
              </h3>
              <p className="text-xs text-[#059669] font-medium">
                Bypassing: {bottleneckNode?.title}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-black/5"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(80vh-80px)]">
          {/* Reform title and subtitle */}
          <div className="mb-4">
            <h4 className="font-heading text-base font-semibold text-text-primary mb-1">
              {reformNode.title}
            </h4>
            <p className="text-sm text-text-secondary">
              {reformNode.subtitle}
            </p>
          </div>

          {/* Level 2: Explanation */}
          <div className="space-y-3 mb-4">
            {reformNode.explanation?.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[14px] leading-[1.65] text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Level 3 toggle */}
          {reformNode.evidence && reformNode.evidence.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEvidence(!showEvidence);
                }}
                className="text-[#059669] hover:text-[#047857] text-sm font-medium transition-colors flex items-center gap-1.5 group"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${showEvidence ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {showEvidence ? 'Hide evidence' : 'See the evidence'}
              </button>

              {/* Evidence quotes */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-out
                  ${showEvidence ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="space-y-4">
                  {reformNode.evidence.map((item, idx) => (
                    <blockquote
                      key={idx}
                      className="border-l-[3px] border-[#10b981] pl-4 py-1"
                    >
                      <p className="text-[14px] leading-[1.6] text-text-secondary italic font-heading">
                        "{item.quote}"
                      </p>
                      {item.source && (
                        <cite className="block text-sm mt-2 not-italic font-body text-text-secondary/70">
                          — {item.source}
                        </cite>
                      )}
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#d1fae5] bg-gradient-to-r from-[#ecfdf5]/50 to-[#f0fdfa]/50">
          <div className="flex items-center gap-2 text-xs text-[#059669]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span>This reform pathway leads to positive transformation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
