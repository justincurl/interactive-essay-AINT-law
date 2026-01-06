import { useEffect, useRef } from 'react';

export default function EvidenceModal({ node, sectionIndex = null, onClose }) {
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

  // Determine which evidence to show
  let evidence = [];
  let title = '';

  if (sectionIndex !== null && node?.evidenceSections?.[sectionIndex]) {
    // Multiple sections - show specific section
    const section = node.evidenceSections[sectionIndex];
    evidence = section.evidence || [];
    title = section.title || section.label || `Evidence: ${node.title}`;
  } else if (node?.evidence) {
    // Single evidence array (fallback)
    evidence = node.evidence;
    title = node.evidenceLabel || `Evidence: ${node.title}`;
  }

  if (evidence.length === 0) {
    return null;
  }

  // Define accent colors based on node type
  const accentColors = {
    starting: '#5a7a9a',
    bottleneck: '#9a5a5a',
    impact: '#8a7a5a',
    reform: '#5a8a6a',
  };

  const accentColor = accentColors[node.type] || '#9a5a5a';

  // Count only numbered items for numbering
  let numberIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-[#FDFCFA] border border-border/50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-modal-enter"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E5E0]">
          <h3
            id="evidence-modal-title"
            className="font-heading text-lg font-semibold text-text-primary"
          >
            {title}
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
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="flex flex-col">
            {evidence.map((item, idx) => {
              const isContext = item.type === 'context';
              const hasLabel = !!item.label;

              // Increment number only for items that will show a number
              if (!isContext && !hasLabel) {
                numberIndex++;
              }
              const currentNumber = numberIndex;

              return (
                <div
                  key={idx}
                  className={`py-3 ${idx !== evidence.length - 1 ? 'border-b border-[#F0EDE8]' : ''}`}
                >
                  {isContext ? (
                    // Context items: no number/label, just text
                    <p className="text-[0.9375rem] text-[#525252] leading-[1.7]">
                      {item.quote}
                    </p>
                  ) : hasLabel ? (
                    // Labeled items: show label as header
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
                    // Numbered items: show number
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
