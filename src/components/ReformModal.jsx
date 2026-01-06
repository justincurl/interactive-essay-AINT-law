import { useEffect, useRef, useState } from 'react';
import EvidenceModal from './EvidenceModal';

export default function ReformModal({ reformNode, onClose }) {
  const modalRef = useRef(null);
  const [evidenceSectionIndex, setEvidenceSectionIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (evidenceSectionIndex !== null) {
          setEvidenceSectionIndex(null);
        } else {
          onClose();
        }
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
  }, [onClose, evidenceSectionIndex]);

  if (!reformNode) {
    return null;
  }

  // Helper to render text with bold markers (**text**)
  const renderTextWithBold = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Check if node has multiple evidence sections
  const hasMultipleSections = reformNode.evidenceSections && reformNode.evidenceSections.length > 0;

  // Render a CTA button
  const renderCTAButton = (label, sectionIndex) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setEvidenceSectionIndex(sectionIndex);
      }}
      className="text-[#059669] hover:text-[#047857] text-sm font-medium transition-colors flex items-center gap-1.5 group mt-1"
    >
      <svg
        className="w-4 h-4 transition-transform group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {label}
    </button>
  );

  return (
    <>
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
          {/* Header - green category as main header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#d1fae5] bg-gradient-to-r from-[#ecfdf5] to-[#f0fdfa]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d1fae5] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3
                id="reform-modal-title"
                className="font-heading text-lg font-semibold text-[#059669] uppercase tracking-wide"
              >
                {reformNode.category}
              </h3>
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
          <div className="px-6 py-5 overflow-y-auto max-h-[calc(80vh-60px)]">
            {/* Level 2: Explanation with interleaved CTAs */}
            {hasMultipleSections ? (
              <div className="space-y-3">
                {reformNode.explanation?.map((paragraph, idx) => (
                  <div key={idx}>
                    <p className="text-[14px] leading-[1.65] text-text-secondary">
                      {renderTextWithBold(paragraph)}
                    </p>
                    {/* Show corresponding CTA after this paragraph if it exists */}
                    {reformNode.evidenceSections[idx] && (
                      <div className="mt-2">
                        {renderCTAButton(reformNode.evidenceSections[idx].label, idx)}
                      </div>
                    )}
                  </div>
                ))}
                {/* Show any remaining CTAs that don't have corresponding paragraphs */}
                {reformNode.evidenceSections.length > (reformNode.explanation?.length || 0) && (
                  <div className="space-y-2 mt-2">
                    {reformNode.evidenceSections.slice(reformNode.explanation?.length || 0).map((section, idx) => (
                      <div key={idx}>
                        {renderCTAButton(section.label, (reformNode.explanation?.length || 0) + idx)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {reformNode.explanation?.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-[14px] leading-[1.65] text-text-secondary"
                  >
                    {renderTextWithBold(paragraph)}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Evidence Modal for sections */}
      {evidenceSectionIndex !== null && (
        <EvidenceModal
          node={reformNode}
          sectionIndex={evidenceSectionIndex}
          onClose={() => setEvidenceSectionIndex(null)}
        />
      )}
    </>
  );
}
