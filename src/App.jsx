import { useState } from 'react';
import FlowchartGrid from './components/FlowchartGrid';
import EvidenceModal from './components/EvidenceModal';
import { pathway1 } from './data/pathway1';

function App() {
  const [expandedNodeId, setExpandedNodeId] = useState(null);
  const [evidenceNode, setEvidenceNode] = useState(null);

  const handleNodeToggle = (nodeId) => {
    setExpandedNodeId(expandedNodeId === nodeId ? null : nodeId);
  };

  const handleNodeClose = () => {
    setExpandedNodeId(null);
  };

  const handleShowEvidence = (node) => {
    setEvidenceNode(node);
  };

  const handleCloseEvidence = () => {
    setEvidenceNode(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="py-6 px-6 border-b border-border/30">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-2xl font-semibold text-text-primary">
            AI and the Transformation of Legal Services
          </h1>
          <p className="font-body text-sm text-text-secondary mt-1">
            An interactive exploration of how AI is reshaping the legal industry
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Pathway title */}
          <div className="mb-6 text-center">
            <h2 className="font-heading text-xl font-semibold text-text-primary">
              {pathway1.title}
            </h2>
            <p className="font-body text-sm text-text-secondary mt-1">
              {pathway1.description}
            </p>
            <p className="font-body text-xs text-text-secondary/60 mt-2">
              Click any node to learn more · Use arrow keys to navigate
            </p>
          </div>

          {/* Flowchart */}
          <FlowchartGrid
            nodes={pathway1.nodes}
            expandedNodeId={expandedNodeId}
            onNodeToggle={handleNodeToggle}
            onNodeClose={handleNodeClose}
            onShowEvidence={handleShowEvidence}
          />
        </div>
      </main>

      {/* Legend */}
      <footer className="py-4 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-node-starting border border-node-starting" />
              <span className="text-text-secondary">Starting Condition</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-node-bottleneck border border-node-bottleneck" />
              <span className="text-text-secondary">Bottleneck</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-node-impact border border-node-impact" />
              <span className="text-text-secondary">Impact by Default</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-node-reform border border-node-reform" />
              <span className="text-text-secondary">Impact with Reform</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Evidence Modal */}
      {evidenceNode && (
        <EvidenceModal
          node={evidenceNode}
          onClose={handleCloseEvidence}
        />
      )}
    </div>
  );
}

export default App;
