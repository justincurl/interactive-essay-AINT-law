import Node from './Node';
import Arrow from './Arrow';

export default function FlowchartGrid({
  nodes,
  selectedNodeId,
  onNodeClick
}) {
  // Separate main flow nodes from reform node
  const mainNodes = nodes.filter(n => n.type !== 'reform');
  const reformNode = nodes.find(n => n.type === 'reform');

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main flow row */}
      <div className="flex items-center flex-wrap justify-center gap-y-4">
        {mainNodes.map((node, index) => (
          <div key={node.id} className="flex items-center">
            <Node
              id={node.id}
              type={node.type}
              title={node.title}
              subtitle={node.subtitle}
              isSelected={selectedNodeId === node.id}
              onClick={onNodeClick}
            />
            {index < mainNodes.length - 1 && <Arrow direction="right" />}
          </div>
        ))}
      </div>

      {/* Reform section */}
      {reformNode && (
        <div className="flex flex-col items-center">
          {/* Dashed vertical connector */}
          <div className="flex flex-col items-center">
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
            id={reformNode.id}
            type="reform"
            title={reformNode.title}
            subtitle={reformNode.subtitle}
            isSelected={selectedNodeId === reformNode.id}
            onClick={onNodeClick}
          />
        </div>
      )}
    </div>
  );
}
