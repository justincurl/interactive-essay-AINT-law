const nodeColors = {
  starting: 'bg-node-starting border-[#b8d4ed]',
  bottleneck: 'bg-node-bottleneck border-[#e8b8b8]',
  impact: 'bg-node-impact border-[#dcc89c]',
  reform: 'bg-node-reform border-[#a7f3d0]',
};

// Bottleneck names for each pathway
const bottleneckNames = [
  'Regulatory Barriers',
  'Adversarial Dynamics',
  'Human Involvement',
];

export default function MobileOverview({ items, currentIndex, pathways, onContinue, isComplete, isFullView = false, onNodeClick }) {
  // Group items by pathway, but filter out reform items (they'll be shown as flags)
  const groupedByPathway = {};
  const reformByPathway = {};

  items.forEach(item => {
    const key = item.pathwayIndex;
    if (item.type === 'reform') {
      reformByPathway[key] = item;
    } else {
      if (!groupedByPathway[key]) {
        groupedByPathway[key] = [];
      }
      groupedByPathway[key].push(item);
    }
  });

  const pathwayGroups = Object.entries(groupedByPathway).map(([idx, pathwayItems]) => ({
    index: parseInt(idx),
    items: pathwayItems,
    hasReform: !!reformByPathway[parseInt(idx)],
    reformItem: reformByPathway[parseInt(idx)],
  }));

  // Handle node click - find the index in the original items array
  const handleNodeClick = (item) => {
    if (onNodeClick) {
      const itemIndex = items.findIndex(i =>
        i.type === item.type &&
        i.pathwayIndex === item.pathwayIndex &&
        (item.type !== 'node' || i.nodeIndex === item.nodeIndex)
      );
      if (itemIndex !== -1) {
        onNodeClick(itemIndex);
      }
    }
  };

  // Handle reform click - calculate direct index in full content list
  // Each pathway has 3 nodes + 1 reform = 4 items
  const handleReformClick = (pathwayIndex) => {
    if (onNodeClick) {
      const reformIndex = (pathwayIndex * 4) + 3; // Reform is the 4th item in each pathway
      onNodeClick(reformIndex);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-heading text-base font-semibold text-text-primary leading-tight">
          What could advanced AI mean for law?
        </h2>
        <p className="text-xs text-text-secondary/60 mt-1">
          {isFullView
            ? 'Tap any node to view details'
            : isComplete
              ? 'You\'ve explored all pathways'
              : `${pathwayGroups.filter(g => g.index < pathways.length).length} of 3 bottlenecks explored`}
        </p>
      </div>

      {/* Pathway visualizations */}
      <div className="flex-1 space-y-3">
        {pathwayGroups.map(({ index: pathwayIndex, items: pathwayItems, hasReform, reformItem }) => {
          const isFinalPathway = pathwayIndex >= pathways.length;

          if (isFinalPathway) {
            // Final destination - renamed to "Impact with Reforms"
            const finalItem = pathwayItems[0];
            return (
              <div key="final" className="flex justify-center">
                <div
                  className={`bg-[#d1fae5] border border-[#a7f3d0] rounded-lg px-3 py-1.5 text-center min-w-[140px] ${onNodeClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
                  onClick={() => onNodeClick && handleNodeClick(finalItem)}
                >
                  <span className="text-[7px] uppercase tracking-wide text-[#059669] font-medium">
                    Impact with Reforms
                  </span>
                  <p className="text-[10px] font-medium text-text-primary mt-0.5">
                    {finalItem?.data?.title}
                  </p>
                </div>
              </div>
            );
          }

          const bottleneckName = bottleneckNames[pathwayIndex] || `Bottleneck ${pathwayIndex + 1}`;

          return (
            <div key={pathwayIndex} className="relative">
              {/* Pathway label - updated to Bottleneck #X: Name */}
              <div className="mb-1">
                <span className="text-[10px] font-medium text-text-secondary/60 uppercase tracking-wider">
                  Bottleneck #{pathwayIndex + 1}: {bottleneckName}
                </span>
              </div>

              {/* Nodes in row - only 3 nodes, no reform node */}
              <div className="flex items-center justify-between pb-2">
                {pathwayItems.map((item, idx) => {
                  const isStartingNode = item.nodeIndex === 0;
                  const isImpactNode = item.nodeIndex === 2;
                  const colors = nodeColors[item.data?.type] || nodeColors.starting;

                  // Get appropriate label
                  let nodeLabel;
                  if (isImpactNode) {
                    nodeLabel = 'Impact Without Reform';
                  } else if (isStartingNode) {
                    nodeLabel = 'State of the World';
                  } else {
                    nodeLabel = item.data?.category || 'Bottleneck';
                  }

                  // Arrow before impact node (node 3) should be red dashed
                  const isArrowToImpact = idx === 2;

                  return (
                    <div key={idx} className="flex items-center">
                      {/* Arrow before node - solid gray for node 2, red dashed for node 3 */}
                      {idx > 0 && (
                        <svg width="18" height="24" viewBox="0 0 18 24" className="flex-shrink-0 mx-0.5">
                          <line
                            x1="0"
                            y1="12"
                            x2="12"
                            y2="12"
                            stroke={isArrowToImpact ? "#C54B32" : "#737373"}
                            strokeWidth="1.5"
                            strokeDasharray={isArrowToImpact ? "4 2" : undefined}
                          />
                          <path
                            d="M9 9 L14 12 L9 15"
                            fill="none"
                            stroke={isArrowToImpact ? "#C54B32" : "#737373"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      {/* Node card with optional reform flag */}
                      <div className="flex flex-col">
                        <div
                          className={`${colors} border rounded-md p-2 ${isImpactNode ? 'w-[115px]' : isStartingNode ? 'w-[105px]' : 'w-[70px]'} ${onNodeClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
                          onClick={() => onNodeClick && handleNodeClick(item)}
                        >
                          <span className="text-[7px] uppercase tracking-wide font-medium block mb-0.5 leading-tight whitespace-nowrap">
                            {nodeLabel}
                          </span>
                          <p className="text-[10px] font-medium text-text-primary leading-normal">
                            {item.data?.title}
                          </p>
                        </div>

                        {/* "What could change this?" flag on impact node - always clickable */}
                        {isImpactNode && (
                          <div
                            className={`mt-1.5 flex items-center gap-1 px-1.5 py-1 bg-[#d1fae5] border border-[#a7f3d0] rounded text-[#059669] w-[115px] ${onNodeClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
                            onClick={() => handleReformClick(pathwayIndex)}
                          >
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <span className="text-[8px] font-medium leading-tight">
                              What could change this?
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Arrow going down to next pathway - dashed green, only show if next pathway has items */}
              {pathwayIndex < pathways.length - 1 && groupedByPathway[pathwayIndex + 1] && (
                <div className="flex justify-center mt-1">
                  <svg width="24" height="20" viewBox="0 0 24 20">
                    <path
                      d="M12 2 L12 14 M8 10 L12 14 L16 10"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border/30">
        <div className="flex flex-wrap gap-2 justify-center text-[8px]">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-node-starting border border-[#b8d4ed]" />
            <span className="text-text-secondary">State of the World</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-node-bottleneck border border-[#e8b8b8]" />
            <span className="text-text-secondary">Bottleneck</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-node-impact border border-[#dcc89c]" />
            <span className="text-text-secondary">Impact without Reform</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded bg-[#d1fae5] border border-[#a7f3d0]" />
            <span className="text-text-secondary">Reform Possibilities</span>
          </div>
        </div>
        {/* Arrow legend */}
        <div className="flex flex-wrap gap-3 justify-center text-[8px] mt-2">
          <div className="flex items-center gap-1">
            <svg width="20" height="10" viewBox="0 0 20 10">
              <line x1="0" y1="5" x2="14" y2="5" stroke="#C54B32" strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M11 2 L16 5 L11 8" fill="none" stroke="#C54B32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-text-secondary">Path without Reform</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="20" height="10" viewBox="0 0 20 10">
              <line x1="0" y1="5" x2="14" y2="5" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M11 2 L16 5 L11 8" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-text-secondary">Path with Reform</span>
          </div>
        </div>
      </div>

      {/* Continue hint */}
      <p className="text-center text-[10px] text-text-secondary/50 mt-3">
        {isFullView
          ? 'Tap Back or swipe right to return'
          : isComplete
            ? 'Swipe right to review'
            : 'Swipe left to continue'}
      </p>
    </div>
  );
}
