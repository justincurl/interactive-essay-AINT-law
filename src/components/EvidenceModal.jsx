import { useEffect, useRef } from 'react';

export default function EvidenceModal({ node, onClose }) {
  const modalRef = useRef(null);

  // Handle escape key and click outside
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
    // Delay to prevent immediate close from the click that opened it
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(timeoutId);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!node?.evidence || node.evidence.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-cream border border-border/50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-modal-enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <h3
            id="evidence-modal-title"
            className="font-heading text-lg font-semibold text-text-primary"
          >
            {node.evidenceLabel || `Evidence: ${node.title}`}
          </h3>
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
          <div className="space-y-5">
            {node.evidence.map((item, idx) => (
              <blockquote
                key={idx}
                className="border-l-[3px] border-accent pl-4 py-1"
              >
                <p className="text-[15px] leading-[1.7] text-text-secondary italic font-heading">
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
    </div>
  );
}
