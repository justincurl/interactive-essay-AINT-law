const nodeStyles = {
  starting: {
    bg: 'bg-node-starting',
    border: 'border-[#b8d4ed]',
    labelColor: 'text-[#5a7a9a]',
    headerBg: 'bg-[#b8d4ed]/30',
  },
  bottleneck: {
    bg: 'bg-node-bottleneck',
    border: 'border-[#e8b8b8]',
    labelColor: 'text-[#9a5a5a]',
    headerBg: 'bg-[#e8b8b8]/30',
  },
  impact: {
    bg: 'bg-node-impact',
    border: 'border-[#dcc89c]',
    labelColor: 'text-[#8a7a5a]',
    headerBg: 'bg-[#dcc89c]/30',
  },
  reform: {
    bg: 'bg-node-reform',
    border: 'border-[#a7f3d0]',
    labelColor: 'text-[#059669]',
    headerBg: 'bg-[#d1fae5]/50',
  },
};

// Get the bottleneck name for each pathway
const bottleneckNames = [
  'Regulatory Barriers',
  'Adversarial Dynamics',
  'Human Involvement',
];

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

export default function MobileNodeView({
  item,
  isExpanded,
  onToggleExpand,
  onShowEvidence,
}) {
  if (!item) return null;

  const { type, data, pathwayIndex, nodeIndex } = item;

  // Get display label for the pathway
  const getPathwayLabel = () => {
    const bottleneckName = bottleneckNames[pathwayIndex] || `Bottleneck ${pathwayIndex + 1}`;
    return `Bottleneck #${pathwayIndex + 1}: ${bottleneckName}`;
  };

  // Get node position label
  const getNodeLabel = () => {
    if (nodeIndex === 2) {
      return 'Impact Without Reform';
    }
    return `Step ${nodeIndex + 1} of 3`;
  };

  // Handle evidence button click
  const handleEvidenceClick = (e, node, sectionIndex = null) => {
    e.stopPropagation();
    e.preventDefault();
    onShowEvidence(node, sectionIndex);
  };

  // Render an evidence CTA button
  const renderEvidenceCTA = (label, idx, colorClass = 'text-[#059669] hover:text-[#047857]') => (
    <button
      key={`evidence-${idx}`}
      onClick={(e) => handleEvidenceClick(e, data, idx)}
      className={`w-full text-left ${colorClass} text-sm font-medium transition-colors flex items-center gap-1.5 group py-2 px-3 bg-white/50 rounded-lg active:bg-white/80 mt-2`}
    >
      <svg
        className="w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {label}
    </button>
  );

  // Render reform item - no title/subtitle, interleaved CTAs
  if (type === 'reform') {
    return (
      <div className="flex-1 flex flex-col p-4 animate-fadeIn">
        {/* Category label */}
        <div className="text-center mb-3">
          <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#059669]">
            EXAMPLES OF REFORM
          </span>
          <p className="text-xs text-text-secondary/60 mt-1">
            {getPathwayLabel()}
          </p>
        </div>

        {/* Reform card - full size, always shows content */}
        <div className={`flex-1 flex flex-col ${nodeStyles.reform.bg} ${nodeStyles.reform.border} border rounded-xl overflow-hidden`}>
          {/* Header */}
          <div className={`${nodeStyles.reform.headerBg} px-4 py-3 border-b ${nodeStyles.reform.border}`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#d1fae5] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#059669]">What could change this?</span>
            </div>
          </div>

          {/* Content - interleaved paragraphs and CTAs */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Render explanation paragraphs with CTAs after each corresponding paragraph */}
            {data.explanation?.map((paragraph, idx) => (
              <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {renderTextWithBold(paragraph)}
                </p>
                {/* Show corresponding CTA after this paragraph if it exists */}
                {data.evidenceSections?.[idx] && renderEvidenceCTA(data.evidenceSections[idx].label, idx)}
              </div>
            ))}
            {/* Show any remaining CTAs that don't have corresponding paragraphs */}
            {data.evidenceSections && data.evidenceSections.length > (data.explanation?.length || 0) && (
              <div className="mt-4">
                {data.evidenceSections.slice(data.explanation?.length || 0).map((section, idx) =>
                  renderEvidenceCTA(section.label, (data.explanation?.length || 0) + idx)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render final destination - renamed to "Impact with Reforms"
  if (type === 'final') {
    return (
      <div className="flex-1 flex flex-col p-4 animate-fadeIn">
        {/* Category label */}
        <div className="text-center mb-3">
          <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-[#059669]">
            IMPACT WITH REFORMS
          </span>
        </div>

        {/* Final card */}
        <div className="flex-1 flex flex-col bg-[#d1fae5] border border-[#a7f3d0] rounded-xl overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="font-heading text-lg font-semibold text-text-primary mb-2 text-center">
              {data.title}
            </h2>
            <p className="font-body text-sm text-text-secondary text-center mb-4">
              {data.subtitle}
            </p>

            <div className="space-y-3 mt-4">
              {data.explanation?.map((paragraph, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>

            {data.evidence && data.evidence.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={(e) => handleEvidenceClick(e, data, null)}
                  className="text-[#059669] hover:text-[#047857] text-sm font-medium transition-colors flex items-center gap-1.5 group px-3 py-2 bg-white/50 rounded-lg active:bg-white/80"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {data.evidenceLabel || 'See the evidence'}
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-text-secondary mt-4">
          You've explored all pathways!
        </p>
      </div>
    );
  }

  // Render regular node
  const styles = nodeStyles[data.type] || nodeStyles.starting;

  // Node 3 (impact) gets special label
  const displayNodeLabel = nodeIndex === 2 ? 'Impact Without Reform' : getNodeLabel();

  return (
    <div className="flex-1 flex flex-col p-4 animate-fadeIn">
      {/* Category label */}
      <div className="text-center mb-3">
        <span className={`text-[10px] uppercase tracking-[0.1em] font-medium ${styles.labelColor}`}>
          {data.category}
        </span>
        <p className="text-xs text-text-secondary/60 mt-1">
          {getPathwayLabel()} · {displayNodeLabel}
        </p>
      </div>

      {/* Node card - smaller when collapsed, full size when expanded */}
      {/* Using a wrapper div to handle centering for collapsed state */}
      <div className={`flex-1 flex ${isExpanded ? 'flex-col' : 'items-center justify-center'}`}>
        <div
          className={`
            flex flex-col ${styles.bg} ${styles.border} border rounded-xl overflow-hidden cursor-pointer
            transition-all duration-300 ease-out active:scale-[0.98]
            ${isExpanded ? 'flex-1 w-full' : 'w-[280px]'}
          `}
          onClick={onToggleExpand}
        >
          {/* Header */}
          <div className={`${styles.headerBg} px-4 py-4 text-center`}>
            <h2 className={`font-heading font-semibold text-text-primary leading-tight transition-all duration-300 ${
              isExpanded ? 'text-xl' : 'text-base'
            }`}>
              {data.title}
            </h2>
            <p className={`font-body text-text-secondary mt-2 transition-all duration-300 ${
              isExpanded ? 'text-sm' : 'text-xs'
            }`}>
              {data.subtitle}
            </p>
          </div>

          {/* Expandable content */}
          {isExpanded ? (
            <div className="flex-1 overflow-y-auto p-4 animate-fadeIn">
              {/* Render explanation paragraphs with interleaved CTAs */}
              {data.evidenceSections && data.evidenceSections.length > 0 ? (
                // Multiple evidence sections - interleave with paragraphs
                <>
                  {data.explanation?.map((paragraph, idx) => (
                    <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {renderTextWithBold(paragraph)}
                      </p>
                      {/* Show corresponding CTA after this paragraph if it exists */}
                      {data.evidenceSections[idx] && (
                        <button
                          onClick={(e) => handleEvidenceClick(e, data, idx)}
                          className={`w-full text-left ${styles.labelColor} text-sm font-medium transition-colors flex items-center gap-1.5 group py-2 px-3 bg-white/50 rounded-lg active:bg-white/80 mt-2`}
                        >
                          <svg
                            className="w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {data.evidenceSections[idx].label}
                        </button>
                      )}
                    </div>
                  ))}
                  {/* Show any remaining CTAs that don't have corresponding paragraphs */}
                  {data.evidenceSections.length > (data.explanation?.length || 0) && (
                    <div className="mt-4 space-y-2">
                      {data.evidenceSections.slice(data.explanation?.length || 0).map((section, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => handleEvidenceClick(e, data, (data.explanation?.length || 0) + idx)}
                          className={`w-full text-left ${styles.labelColor} text-sm font-medium transition-colors flex items-center gap-1.5 group py-2 px-3 bg-white/50 rounded-lg active:bg-white/80`}
                        >
                          <svg
                            className="w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {section.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Single evidence or no evidence sections - standard layout
                <>
                  <div className="space-y-3">
                    {data.explanation?.map((paragraph, idx) => (
                      <p key={idx} className="text-sm leading-relaxed text-text-secondary">
                        {renderTextWithBold(paragraph)}
                      </p>
                    ))}
                  </div>

                  {/* Single evidence button */}
                  {data.evidence && data.evidence.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={(e) => handleEvidenceClick(e, data, null)}
                        className={`${styles.labelColor} text-sm font-medium transition-colors flex items-center gap-1.5 group py-2 px-3 bg-white/50 rounded-lg active:bg-white/80`}
                      >
                        <svg
                          className="w-4 h-4 transition-transform group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {data.evidenceLabel || 'See the evidence'}
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Tap to collapse hint */}
              <p className="text-center text-[10px] text-text-secondary/50 mt-4">
                Tap to collapse
              </p>
            </div>
          ) : (
            <div className="p-3 text-center">
              <span className="text-xs text-text-secondary/60 flex items-center justify-center gap-1">
                Tap to learn more
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
