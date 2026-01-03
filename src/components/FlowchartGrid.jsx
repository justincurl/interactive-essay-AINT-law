import Node from './Node';
import Arrow from './Arrow';

export default function FlowchartGrid({
  nodes,
  expandedNodeId,
  onNodeToggle,
  onNodeClose
}) {
  // Separate main flow nodes from reform node
  const mainNodes = nodes.filter(n => n.type !== 'reform');
  const reformNode = nodes.find(n => n.type === 'reform');

  const hasExpanded = expandedNodeId !== null;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Main flow row */}
      <div className={`
        flex items-start flex-wrap justify-center gap-y-4
        transition-all duration-300
        ${hasExpanded ? 'gap-x-4' : 'gap-x-0'}
      `}>
        {mainNodes.map((node, index) => {
          const isExpanded = expandedNodeId === node.id;
          const isDimmed = hasExpanded && !isExpanded;

          return (
            <div
              key={node.id}
              className={`
                flex items-start
                transition-all duration-300
                ${isExpanded ? 'z-10' : 'z-0'}
              `}
            >
              <Node
                node={node}
                isExpanded={isExpanded}
                isDimmed={isDimmed}
                onToggle={() => onNodeToggle(node.id)}
                onClose={onNodeClose}
              />
              {/* Arrow - hide when expanded or when sibling is expanded */}
              {index < mainNodes.length - 1 && (
                <div className={`
                  transition-opacity duration-200
                  ${hasExpanded ? 'opacity-20' : 'opacity-100'}
                  ${isExpanded ? 'hidden' : ''}
                `}>
                  <Arrow direction="right" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reform section */}
      {reformNode && (
        <div className={`
          flex flex-col items-center
          transition-all duration-300
          ${hasExpanded && expandedNodeId !== reformNode.id ? 'opacity-40' : 'opacity-100'}
        `}>
          {/* Dashed vertical connector */}
          <div className={`
            flex flex-col items-center
            transition-opacity duration-200
            ${hasExpanded ? 'opacity-20' : 'opacity-100'}
          `}>
            <div className="w-0.5 h-6 border-l-2 border-dashed border-accent" />
            <svg
              className="w-4 h-4 text-accent -mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Reform node */}
          <Node
            node={reformNode}
            isExpanded={expandedNodeId === reformNode.id}
            isDimmed={hasExpanded && expandedNodeId !== reformNode.id}
            onToggle={() => onNodeToggle(reformNode.id)}
            onClose={onNodeClose}
          />
        </div>
      )}
    </div>
  );
}
