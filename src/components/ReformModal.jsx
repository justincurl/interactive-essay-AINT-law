import { useEffect, useRef, useState } from 'react';

export default function ReformModal({ reformNode, onClose }) {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div>
              <h3
                id="reform-modal-title"
                className="font-heading text-lg font-semibold text-text-primary"
              >
                {reformNode.title}
              </h3>
              <p className="text-xs text-[#059669] font-medium uppercase tracking-wide">
                {reformNode.category}
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
          {/* Subtitle */}
          <div className="mb-4">
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
                {showEvidence ? 'Hide evidence' : (reformNode.evidenceLabel || 'See the evidence')}
              </button>

              {/* Evidence content */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-out
                  ${showEvidence ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="flex flex-col">
                  {(() => {
                    let numberIndex = 0;
                    return reformNode.evidence.map((item, idx) => {
                      const isContext = item.type === 'context';
                      const hasLabel = !!item.label;
                      const accentColor = '#5a8a6a';

                      if (!isContext && !hasLabel) {
                        numberIndex++;
                      }
                      const currentNumber = numberIndex;

                      return (
                        <div
                          key={idx}
                          className={`py-3 ${idx !== reformNode.evidence.length - 1 ? 'border-b border-[#F0EDE8]' : ''}`}
                        >
                          {isContext ? (
                            <p className="text-[0.9375rem] text-[#525252] leading-[1.7]">
                              {item.quote}
                            </p>
                          ) : hasLabel ? (
                            <div>
                              <h4
                                className="text-sm font-semibold mb-2"
                                style={{ color: accentColor }}
                              >
                                {item.label}
                              </h4>
                              <p className="text-[0.9375rem] text-[#525252] leading-[1.7]">
                                {item.quote}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-start gap-4">
                              <span
                                className="text-xl font-normal leading-none min-w-[1.5rem] mt-0.5"
                                style={{ color: accentColor, fontFamily: "'Newsreader', Georgia, serif" }}
                              >
                                {currentNumber}
                              </span>
                              <p className="text-[0.9375rem] text-[#525252] leading-[1.7]">
                                {item.quote}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
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
