import { useState } from 'react';
import FlowchartGrid from './components/FlowchartGrid';
import { pathway1 } from './data/pathway1';

function App() {
  const [expandedNodeId, setExpandedNodeId] = useState(null);

  const handleNodeToggle = (nodeId) => {
    setExpandedNodeId(expandedNodeId === nodeId ? null : nodeId);
  };

  const handleNodeClose = () => {
    setExpandedNodeId(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="py-8 px-6 border-b border-border/30">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-3xl font-semibold text-text-primary">
            AI and the Transformation of Legal Services
          </h1>
          <p className="font-body text-text-secondary mt-2">
            An interactive exploration of how AI is reshaping the legal industry
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Pathway title */}
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-semibold text-text-primary">
              {pathway1.title}
            </h2>
            <p className="font-body text-text-secondary mt-2">
              {pathway1.description}
            </p>
            <p className="font-body text-sm text-text-secondary/70 mt-4">
              Click on any node to learn more
            </p>
          </div>

          {/* Flowchart */}
          <FlowchartGrid
            nodes={pathway1.nodes}
            expandedNodeId={expandedNodeId}
            onNodeToggle={handleNodeToggle}
            onNodeClose={handleNodeClose}
          />
        </div>
      </main>

      {/* Legend */}
      <footer className="py-6 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-node-blue border border-node-blue" />
              <span className="text-text-secondary">Starting Condition</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-node-gray border border-node-gray" />
              <span className="text-text-secondary">Bottleneck</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-node-cream border border-node-cream" />
              <span className="text-text-secondary">Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-cream border-2 border-dashed border-accent" />
              <span className="text-text-secondary">Reform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
