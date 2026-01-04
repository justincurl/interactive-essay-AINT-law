import { useState, useEffect, useCallback } from 'react';
import FlowchartGrid from './components/FlowchartGrid';
import EvidenceModal from './components/EvidenceModal';
import ReformModal from './components/ReformModal';
import { pathway1 } from './data/pathway1';
import { pathway2 } from './data/pathway2';
import { pathway3 } from './data/pathway3';

const pathways = [pathway1, pathway2, pathway3];
const NODES_PER_PATHWAY = 4;
const TOTAL_NODES = pathways.length * NODES_PER_PATHWAY;

function App() {
  const [globalVisibleCount, setGlobalVisibleCount] = useState(1);
  const [expandedNodeId, setExpandedNodeId] = useState(null);
  const [evidenceNode, setEvidenceNode] = useState(null);
  const [reformBottleneckNode, setReformBottleneckNode] = useState(null);
  const [reformPathwayIndex, setReformPathwayIndex] = useState(null);
  const [animatingNodeIndex, setAnimatingNodeIndex] = useState(null);

  // Calculate visible count for each pathway based on global progress
  const getPathwayVisibleCount = (pathwayIndex) => {
    const startNode = pathwayIndex * NODES_PER_PATHWAY;
    const endNode = (pathwayIndex + 1) * NODES_PER_PATHWAY;
    
    if (globalVisibleCount <= startNode) {
      return 0;
    } else if (globalVisibleCount >= endNode) {
      return NODES_PER_PATHWAY;
    } else {
      return globalVisibleCount - startNode;
    }
  };

  // Check if a pathway should be visible
  const isPathwayVisible = (pathwayIndex) => {
    return getPathwayVisibleCount(pathwayIndex) > 0;
  };

  // Get the currently active pathway index (the one being navigated)
  const getActivePathwayIndex = () => {
    if (globalVisibleCount >= TOTAL_NODES) {
      // When complete, the last pathway is "active" for showing restart
      return pathways.length - 1;
    }
    return Math.floor((globalVisibleCount - 1) / NODES_PER_PATHWAY);
  };

  const activePathwayIndex = getActivePathwayIndex();
  const isComplete = globalVisibleCount >= TOTAL_NODES;

  // Get reform node for the modal based on which pathway's bottleneck was clicked
  const reformNode = reformPathwayIndex !== null 
    ? pathways[reformPathwayIndex].nodes.find(n => n.type === 'reform')
    : null;

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

  const handleShowReform = (bottleneckNode, pathwayIndex) => {
    setReformBottleneckNode(bottleneckNode);
    setReformPathwayIndex(pathwayIndex);
  };

  const handleCloseReform = () => {
    setReformBottleneckNode(null);
    setReformPathwayIndex(null);
  };

  // Global navigation handlers
  const handleContinue = useCallback(() => {
    if (globalVisibleCount < TOTAL_NODES) {
      const newGlobalIndex = globalVisibleCount;
      const pathwayIndex = Math.floor(newGlobalIndex / NODES_PER_PATHWAY);
      const nodeIndexInPathway = newGlobalIndex % NODES_PER_PATHWAY;
      
      setAnimatingNodeIndex({ pathwayIndex, nodeIndex: nodeIndexInPathway });
      setGlobalVisibleCount(prev => prev + 1);

      setTimeout(() => {
        setAnimatingNodeIndex(null);
      }, 400);
    }
  }, [globalVisibleCount]);

  const handleBack = useCallback(() => {
    if (globalVisibleCount > 1) {
      if (expandedNodeId) {
        setExpandedNodeId(null);
      }
      setGlobalVisibleCount(prev => prev - 1);
    }
  }, [globalVisibleCount, expandedNodeId]);

  const handleStartOver = useCallback(() => {
    if (expandedNodeId) {
      setExpandedNodeId(null);
    }
    setGlobalVisibleCount(1);
  }, [expandedNodeId]);

  // Global keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowRight' && globalVisibleCount < TOTAL_NODES) {
        e.preventDefault();
        handleContinue();
      } else if (e.key === 'ArrowLeft' && globalVisibleCount > 1) {
        e.preventDefault();
        handleBack();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleContinue, handleBack, globalVisibleCount]);

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
          {/* Instructions */}
          <div className="mb-6 text-center">
            <p className="font-body text-xs text-text-secondary/60">
              Click any node to learn more · Use arrow keys to navigate
            </p>
          </div>

          {/* Stacked Pathways */}
          <div className="flex flex-col gap-8">
            {pathways.map((pathway, pathwayIndex) => {
              const pathwayVisibleCount = getPathwayVisibleCount(pathwayIndex);
              const isVisible = isPathwayVisible(pathwayIndex);
              const isActiveRow = pathwayIndex === activePathwayIndex;
              
              // Calculate animating node index for this pathway
              const pathwayAnimatingIndex = animatingNodeIndex?.pathwayIndex === pathwayIndex 
                ? animatingNodeIndex.nodeIndex 
                : null;

              if (!isVisible) return null;

              return (
                <FlowchartGrid
                  key={pathway.id}
                  nodes={pathway.nodes}
                  expandedNodeId={expandedNodeId}
                  onNodeToggle={handleNodeToggle}
                  onNodeClose={handleNodeClose}
                  onShowEvidence={handleShowEvidence}
                  onShowReform={(bottleneckNode) => handleShowReform(bottleneckNode, pathwayIndex)}
                  showBypassArrow={reformPathwayIndex === pathwayIndex}
                  visibleCount={pathwayVisibleCount}
                  animatingNodeIndex={pathwayAnimatingIndex}
                  showNavigation={isActiveRow}
                  pathwayTitle={pathway.title}
                  pathwayDescription={pathway.description}
                  // Global navigation overrides for the active row
                  onContinue={isActiveRow ? handleContinue : undefined}
                  onBack={isActiveRow ? handleBack : undefined}
                  onStartOver={isActiveRow ? handleStartOver : undefined}
                  canBack={isActiveRow ? globalVisibleCount > 1 : undefined}
                  canContinue={isActiveRow ? globalVisibleCount < TOTAL_NODES : undefined}
                  showRestart={isActiveRow ? isComplete : undefined}
                  showProgressIndicator={false}
                />
              );
            })}
          </div>

          {/* Global Progress Indicator */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_NODES }).map((_, index) => {
                // Add visual separator between pathways
                const isPathwayStart = index > 0 && index % NODES_PER_PATHWAY === 0;
                return (
                  <div key={index} className="flex items-center">
                    {isPathwayStart && <div className="w-2" />}
                    <div
                      className={`
                        w-1.5 h-1.5 rounded-full transition-all duration-300
                        ${index < globalVisibleCount ? 'bg-accent/70' : 'bg-border/50'}
                      `}
                    />
                  </div>
                );
              })}
              <span className="ml-2 text-[10px] text-text-secondary/50">
                {globalVisibleCount}/{TOTAL_NODES}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Legend */}
      <footer className="py-4 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-node-starting border border-node-starting" />
              <span className="text-text-secondary">Starting Assumption</span>
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
              <span className="text-text-secondary">Examples of Reform</span>
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

      {/* Reform Modal */}
      {reformBottleneckNode && reformNode && (
        <ReformModal
          bottleneckNode={reformBottleneckNode}
          reformNode={reformNode}
          onClose={handleCloseReform}
        />
      )}
    </div>
  );
}

export default App;
