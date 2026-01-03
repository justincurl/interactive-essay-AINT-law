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
              <div className="w-4 h-4 rounded bg-node-starting border border-node-starting" />
              <span className="text-text-secondary">Starting Condition</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-node-bottleneck border border-node-bottleneck" />
              <span className="text-text-secondary">Bottleneck</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-node-impact border border-node-impact" />
              <span className="text-text-secondary">Impact by Default</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-node-reform border border-node-reform" />
              <span className="text-text-secondary">Impact with Reform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
