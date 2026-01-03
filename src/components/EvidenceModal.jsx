import { useEffect, useCallback } from 'react';

export default function EvidenceModal({ evidence, onClose }) {
  // Handle escape key to close
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!evidence || evidence.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-cream rounded-lg shadow-xl border border-border/50 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-modal-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            Supporting Evidence
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-black/5"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-6">
            {evidence.map((item, idx) => (
              <blockquote
                key={idx}
                className="border-l-[3px] border-accent pl-4 text-[15px] text-text-secondary italic font-heading leading-relaxed"
              >
                "{item.quote}"
                {item.source && (
                  <cite className="block text-sm mt-3 not-italic font-body text-text-secondary/70">
                    — {item.source}
                  </cite>
                )}
              </blockquote>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
