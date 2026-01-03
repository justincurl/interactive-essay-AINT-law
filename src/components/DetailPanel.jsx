import { useState } from 'react';

export default function DetailPanel({ node, onClose }) {
  const [showFullDetail, setShowFullDetail] = useState(false);

  if (!node) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-border p-6 max-w-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="font-heading text-xl font-semibold text-text-primary">
            {node.title}
          </h2>
          <p className="text-sm text-text-secondary mt-1">{node.subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary transition-colors p-1"
          aria-label="Close panel"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mb-4" />

      {/* Level 2: Explanation */}
      <div className="space-y-3 text-text-primary leading-relaxed">
        {node.explanation?.map((paragraph, idx) => (
          <p key={idx} className="text-sm">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Level 3: Full evidence (toggle) */}
      {node.evidence && node.evidence.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowFullDetail(!showFullDetail)}
            className="text-accent hover:text-accent/80 text-sm font-medium transition-colors flex items-center gap-1"
          >
            {showFullDetail ? 'Show less' : 'Read more'}
            <svg
              className={`w-4 h-4 transition-transform ${showFullDetail ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showFullDetail && (
            <div className="mt-4 space-y-4 border-l-2 border-accent/30 pl-4">
              {node.evidence.map((item, idx) => (
                <blockquote key={idx} className="text-sm text-text-secondary italic">
                  "{item.quote}"
                  {item.source && (
                    <cite className="block text-xs mt-1 not-italic text-text-secondary/70">
                      — {item.source}
                    </cite>
                  )}
                </blockquote>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Placeholder if no content yet */}
      {(!node.explanation || node.explanation.length === 0) && (
        <p className="text-sm text-text-secondary italic">
          Detailed content will be added here.
        </p>
      )}
    </div>
  );
}
