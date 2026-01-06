export default function NodeExpandedContent({ node, onShowEvidence }) {
  const handleShowEvidence = (e, sectionIndex = null) => {
    e.stopPropagation();
    // Pass both node and section index if using multiple sections
    onShowEvidence?.(node, sectionIndex);
  };

  // Define colors for each node type
  const evidenceColors = {
    starting: 'text-[#5a7a9a] hover:text-[#4a6a8a]',
    bottleneck: 'text-accent hover:text-accent/80',
    impact: 'text-[#8a7a5a] hover:text-[#7a6a4a]',
    reform: 'text-[#5a8a6a] hover:text-[#4a7a5a]',
  };

  const colorClass = evidenceColors[node.type] || 'text-accent hover:text-accent/80';

  // Check if node has multiple evidence sections
  const hasMultipleSections = node.evidenceSections && node.evidenceSections.length > 0;
  const hasSingleEvidence = node.evidence && node.evidence.length > 0;

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

  // Render a CTA button
  const renderCTAButton = (label, sectionIndex) => (
    <button
      onClick={(e) => handleShowEvidence(e, sectionIndex)}
      className={`${colorClass} text-sm font-medium transition-colors flex items-center gap-1.5 group mt-1`}
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
    <div className="mt-2 pt-2 border-t border-border/60">
      {/* Interleaved paragraphs and CTAs for multiple sections */}
      {hasMultipleSections && (
        <div className="space-y-3">
          {node.explanation?.map((paragraph, idx) => (
            <div key={idx}>
              <p className="text-[14px] leading-[1.65] text-text-secondary">
                {renderTextWithBold(paragraph)}
              </p>
              {/* Show corresponding CTA after this paragraph if it exists */}
              {node.evidenceSections[idx] && (
                <div className="mt-2">
                  {renderCTAButton(node.evidenceSections[idx].label, idx)}
                </div>
              )}
            </div>
          ))}
          {/* Show any remaining CTAs that don't have corresponding paragraphs */}
          {node.evidenceSections.length > (node.explanation?.length || 0) && (
            <div className="space-y-2 mt-2">
              {node.evidenceSections.slice(node.explanation?.length || 0).map((section, idx) => (
                <div key={idx}>
                  {renderCTAButton(section.label, (node.explanation?.length || 0) + idx)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Standard layout for single evidence */}
      {!hasMultipleSections && (
        <>
          <div className="space-y-2.5">
            {node.explanation?.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[14px] leading-[1.65] text-text-secondary"
              >
                {renderTextWithBold(paragraph)}
              </p>
            ))}
          </div>

          {/* Level 3 button - single evidence */}
          {hasSingleEvidence && (
            <div className="mt-4">
              <button
                onClick={(e) => handleShowEvidence(e)}
                className={`${colorClass} text-sm font-medium transition-colors flex items-center gap-1.5 group`}
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {node.evidenceLabel || 'See the evidence'}
              </button>
            </div>
          )}
        </>
      )}

      {/* Placeholder if no content */}
      {(!node.explanation || node.explanation.length === 0) && !hasMultipleSections && (
        <p className="text-sm text-text-secondary italic">
          Detailed content will be added here.
        </p>
      )}
    </div>
  );
}
