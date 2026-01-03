import { useState } from 'react';

export default function NodeExpandedContent({ node, onClose }) {
  const [showLevel3, setShowLevel3] = useState(false);

  return (
    <div className="mt-4 pt-4 border-t border-border/30">
      {/* Level 2: Explanation paragraphs */}
      <div className="space-y-3">
        {node.explanation?.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-[15px] leading-[1.7] text-text-secondary"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Level 3 toggle / Transition prompt */}
      {node.evidence && node.evidence.length > 0 && (
        <div className="mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowLevel3(!showLevel3);
            }}
            className="text-accent hover:text-accent/80 text-sm font-medium transition-colors flex items-center gap-1"
          >
            {showLevel3 ? (
              <>
                Show less
                <svg
                  className="w-4 h-4 transition-transform rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            ) : (
              <>
                See the evidence
                <svg
                  className="w-4 h-4 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          {/* Level 3: Evidence/quotes */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-out
              ${showLevel3 ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="space-y-4">
              {node.evidence.map((item, idx) => (
                <blockquote
                  key={idx}
                  className="border-l-[3px] border-accent pl-4 text-sm text-text-secondary italic font-heading"
                >
                  "{item.quote}"
                  {item.source && (
                    <cite className="block text-xs mt-2 not-italic font-body text-text-secondary/70">
                      — {item.source}
                    </cite>
                  )}
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder if no content */}
      {(!node.explanation || node.explanation.length === 0) && (
        <p className="text-sm text-text-secondary italic">
          Detailed content will be added here.
        </p>
      )}
    </div>
  );
}
