import { useState } from 'react';
import EvidenceModal from './EvidenceModal';

export default function NodeExpandedContent({ node }) {
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  return (
    <>
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

        {/* Level 3 toggle - opens modal */}
        {node.evidence && node.evidence.length > 0 && (
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEvidenceModal(true);
              }}
              className="text-accent hover:text-accent/80 text-sm font-medium transition-colors flex items-center gap-1"
            >
              See the evidence
              <svg
                className="w-4 h-4 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Placeholder if no content */}
        {(!node.explanation || node.explanation.length === 0) && (
          <p className="text-sm text-text-secondary italic">
            Detailed content will be added here.
          </p>
        )}
      </div>

      {/* Evidence Modal */}
      {showEvidenceModal && (
        <EvidenceModal
          evidence={node.evidence}
          onClose={() => setShowEvidenceModal(false)}
        />
      )}
    </>
  );
}
