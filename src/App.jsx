import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import FlowchartGrid from './components/FlowchartGrid';
import EvidenceModal from './components/EvidenceModal';
import ReformModal from './components/ReformModal';
import { pathway1 } from './data/pathway1';
import { pathway2 } from './data/pathway2';
import { pathway3 } from './data/pathway3';

const pathways = [pathway1, pathway2, pathway3];
const NODES_PER_PATHWAY = 3;
const ELEMENTS_PER_PATHWAY = 4;
const TOTAL_ELEMENTS = pathways.length * ELEMENTS_PER_PATHWAY + 1;

function App() {
  const [globalVisibleCount, setGlobalVisibleCount] = useState(1);
  const [expandedNodeId, setExpandedNodeId] = useState(null);
  const [evidenceNode, setEvidenceNode] = useState(null);
  const [reformNode, setReformNode] = useState(null);
  const [animatingNodeIndex, setAnimatingNodeIndex] = useState(null);
  const [arrowPaths, setArrowPaths] = useState([]);
  const pathwaysContainerRef = useRef(null);
  const prevExpandedNodeIdRef = useRef(null);

  const getPathwayState = (pathwayIndex) => {
    const startElement = pathwayIndex * ELEMENTS_PER_PATHWAY;

    if (globalVisibleCount <= startElement) {
      return { nodeCount: 0, showReformBranch: false, showReformLabel: false };
    }

    const progressInPathway = globalVisibleCount - startElement;

    // Show reform branch when Impact node (3rd node) is visible
    const showReformBranch = progressInPathway >= NODES_PER_PATHWAY;

    // Show "With Reform" label immediately when the arrow appears
    const showReformLabel = showReformBranch;

    const nodeCount = Math.min(progressInPathway, NODES_PER_PATHWAY);

    return { nodeCount, showReformBranch, showReformLabel };
  };

  const isPathwayVisible = (pathwayIndex) => {
    return getPathwayState(pathwayIndex).nodeCount > 0;
  };

  const getActivePathwayIndex = () => {
    if (globalVisibleCount >= TOTAL_ELEMENTS) {
      return pathways.length;
    }
    return Math.floor((globalVisibleCount - 1) / ELEMENTS_PER_PATHWAY);
  };

  const activePathwayIndex = getActivePathwayIndex();
  const isComplete = globalVisibleCount >= TOTAL_ELEMENTS;
  const showFinalDestination = globalVisibleCount >= TOTAL_ELEMENTS;

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

  // Track which pathway's reform panel is open (for navigation purposes)
  const [reformPathwayIndex, setReformPathwayIndex] = useState(null);

  const handleShowReform = (reform, shouldAdvance = false, pathwayIdx = -1) => {
    // Use passed pathwayIdx, or find which pathway this reform belongs to
    const resolvedPathwayIdx = pathwayIdx >= 0
      ? pathwayIdx
      : pathways.findIndex(p => p.reform?.id === reform?.id);
    setReformNode(reform);
    setReformPathwayIndex(resolvedPathwayIdx);

    // Only advance if we haven't already reached/passed this pathway's reform step
    // Reform step for pathway N is at globalVisibleCount = (N + 1) * ELEMENTS_PER_PATHWAY
    const reformStepForPathway = (resolvedPathwayIdx + 1) * ELEMENTS_PER_PATHWAY;
    if (shouldAdvance && resolvedPathwayIdx >= 0 && globalVisibleCount < reformStepForPathway) {
      const newGlobalIndex = globalVisibleCount;
      const pathwayIndex = Math.floor(newGlobalIndex / ELEMENTS_PER_PATHWAY);
      const elementInPathway = newGlobalIndex % ELEMENTS_PER_PATHWAY;

      if (elementInPathway < NODES_PER_PATHWAY) {
        setAnimatingNodeIndex({ pathwayIndex, nodeIndex: elementInPathway });
      }
      setGlobalVisibleCount(prev => prev + 1);

      setTimeout(() => {
        setAnimatingNodeIndex(null);
      }, 400);
    }
  };

  const handleCloseReform = () => {
    setReformNode(null);
    setReformPathwayIndex(null);
  };

  // Check if we're currently viewing a reform panel
  const isReformPanelOpen = reformNode !== null;

  const handleContinue = useCallback(() => {
    // If reform panel is open, close it and advance to next row's starting node
    if (isReformPanelOpen) {
      handleCloseReform();
      // Count was advanced when reform opened, now advance to next pathway
      if (globalVisibleCount < TOTAL_ELEMENTS) {
        const newGlobalIndex = globalVisibleCount;
        const pathwayIndex = Math.floor(newGlobalIndex / ELEMENTS_PER_PATHWAY);
        const elementInPathway = newGlobalIndex % ELEMENTS_PER_PATHWAY;

        if (elementInPathway < NODES_PER_PATHWAY) {
          setAnimatingNodeIndex({ pathwayIndex, nodeIndex: elementInPathway });
        }
        setGlobalVisibleCount(prev => prev + 1);
        setTimeout(() => {
          setAnimatingNodeIndex(null);
        }, 400);
      }
      return;
    }

    if (globalVisibleCount < TOTAL_ELEMENTS) {
      const currentPathwayIndex = Math.floor((globalVisibleCount - 1) / ELEMENTS_PER_PATHWAY);
      const currentPathwayState = getPathwayState(currentPathwayIndex);

      // If reform branch is visible for current pathway and popup hasn't been shown yet,
      // open the popup and advance count (reform is its own step)
      if (currentPathwayState.showReformBranch && currentPathwayIndex < pathways.length) {
        const reform = pathways[currentPathwayIndex]?.reform;
        if (reform && !reformNode) {
          handleShowReform(reform, true);
          return;
        }
      }

      const newGlobalIndex = globalVisibleCount;
      const pathwayIndex = Math.floor(newGlobalIndex / ELEMENTS_PER_PATHWAY);
      const elementInPathway = newGlobalIndex % ELEMENTS_PER_PATHWAY;

      if (elementInPathway < NODES_PER_PATHWAY) {
        setAnimatingNodeIndex({ pathwayIndex, nodeIndex: elementInPathway });
      }
      setGlobalVisibleCount(prev => prev + 1);

      setTimeout(() => {
        setAnimatingNodeIndex(null);
      }, 400);
    }
  }, [globalVisibleCount, reformNode, isReformPanelOpen]);

  const handleBack = useCallback(() => {
    // If reform panel is open, close it and go back one step (to Impact node)
    if (isReformPanelOpen) {
      handleCloseReform();
      // Go back 1 step to land on Impact node (reform panel counts as its own state)
      setGlobalVisibleCount(prev => Math.max(1, prev - 1));
      return;
    }

    if (globalVisibleCount > 1) {
      if (expandedNodeId) {
        setExpandedNodeId(null);
      }
      setGlobalVisibleCount(prev => prev - 1);
    }
  }, [globalVisibleCount, expandedNodeId, isReformPanelOpen]);

  const handleStartOver = useCallback(() => {
    if (expandedNodeId) {
      setExpandedNodeId(null);
    }
    setGlobalVisibleCount(1);
  }, [expandedNodeId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Allow navigation when reform panel is open (arrow keys control panel)
      if (e.key === 'ArrowRight') {
        // Allow right arrow when reform panel is open OR when not at end
        if (isReformPanelOpen || globalVisibleCount < TOTAL_ELEMENTS) {
          e.preventDefault();
          handleContinue();
        }
      } else if (e.key === 'ArrowLeft') {
        // Allow left arrow when reform panel is open OR when not at start
        if (isReformPanelOpen || globalVisibleCount > 1) {
          e.preventDefault();
          handleBack();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleContinue, handleBack, globalVisibleCount, isReformPanelOpen]);

  useLayoutEffect(() => {
    const updateArrowPaths = () => {
      if (!pathwaysContainerRef.current) return;

      const containerRect = pathwaysContainerRef.current.getBoundingClientRect();
      const newPaths = [];

      // Show arrows for all pathways that have their reform branch visible
      pathways.forEach((_, pathwayIndex) => {
        const pathwayState = getPathwayState(pathwayIndex);
        if (!pathwayState.showReformBranch) return;
        const showLabel = pathwayState.showReformLabel;

        const bottleneckNode = pathwaysContainerRef.current.querySelector(
          `[data-pathway-index="${pathwayIndex}"][data-node-type="bottleneck"]`
        );

        let targetNode;
        const isLastPathway = pathwayIndex === pathways.length - 1;

        if (isLastPathway) {
          targetNode = pathwaysContainerRef.current.querySelector('[data-final-destination="true"]');
        } else {
          targetNode = pathwaysContainerRef.current.querySelector(
            `[data-pathway-index="${pathwayIndex + 1}"][data-node-type="starting"]`
          );
        }

        if (bottleneckNode && targetNode) {
          const sourceRect = bottleneckNode.getBoundingClientRect();
          const targetRect = targetNode.getBoundingClientRect();

          // Skip if target has no dimensions (not rendered yet)
          if (targetRect.width === 0 || targetRect.height === 0) return;

          // Start from bottom center of bottleneck node
          const sourceX = sourceRect.left + sourceRect.width / 2 - containerRect.left;
          const sourceY = sourceRect.bottom - containerRect.top;

          // End at left edge, vertically centered on target node
          const targetX = targetRect.left - containerRect.left;
          const targetY = targetRect.top + targetRect.height / 2 - containerRect.top;

          // Arrow path configuration
          // Last pathway needs a longer initial drop to avoid overlapping with larger target node
          const initialDrop = isLastPathway ? 44 : 24;
          const horizontalOvershoot = 22;  // How far past target left edge the arrow extends

          // Calculate turn point (short drop from bottleneck)
          const turnY = sourceY + initialDrop;
          // Calculate elbow X (extends past target's left edge for breathing room)
          const elbowX = targetX - horizontalOvershoot;

          // Path: down (short), left (extends past target), down, right into target
          const path = `M ${sourceX} ${sourceY} L ${sourceX} ${turnY} L ${elbowX} ${turnY} L ${elbowX} ${targetY} L ${targetX} ${targetY}`;

          newPaths.push({
            pathwayIndex,
            path,
            labelX: (sourceX + elbowX) / 2,
            labelY: turnY - 8,
            showLabel,
          });
        }
      });

      setArrowPaths(newPaths);
    };

    // Calculate immediately
    updateArrowPaths();

    // Track if a node just collapsed (was expanded, now isn't)
    const justCollapsed = prevExpandedNodeIdRef.current !== null && expandedNodeId === null;
    prevExpandedNodeIdRef.current = expandedNodeId;

    // Continuously update arrow positions while a node is expanded, animating, or just collapsed
    let animationFrameId = null;
    let collapseTimeoutId = null;
    const isNodeExpanded = expandedNodeId !== null;
    const isAnimating = animatingNodeIndex !== null;

    const continuousUpdate = () => {
      updateArrowPaths();
      animationFrameId = requestAnimationFrame(continuousUpdate);
    };

    // Run continuous updates while any node is expanded or animating
    if (isNodeExpanded || isAnimating) {
      animationFrameId = requestAnimationFrame(continuousUpdate);
    }

    // If a node just collapsed, run updates for 350ms to cover the collapse animation
    if (justCollapsed) {
      animationFrameId = requestAnimationFrame(continuousUpdate);
      collapseTimeoutId = setTimeout(() => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        updateArrowPaths(); // Final update
      }, 350);
    }

    const resizeObserver = new ResizeObserver(updateArrowPaths);
    if (pathwaysContainerRef.current) {
      resizeObserver.observe(pathwaysContainerRef.current);
    }

    window.addEventListener('resize', updateArrowPaths);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (collapseTimeoutId) {
        clearTimeout(collapseTimeoutId);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateArrowPaths);
    };
  }, [globalVisibleCount, animatingNodeIndex, expandedNodeId]);

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
          <div ref={pathwaysContainerRef} className="relative flex flex-col gap-4">
            {/* Reform Elbow Arrows SVG Overlay */}
            {arrowPaths.length > 0 && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <marker
                    id="reformElbowArrowHead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 8 3, 0 6"
                      fill="#059669"
                    />
                  </marker>
                </defs>
                {arrowPaths.map((arrow) => (
                  <g key={arrow.pathwayIndex}>
                    <path
                      d={arrow.path}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      markerEnd="url(#reformElbowArrowHead)"
                    />
                    {arrow.showLabel && (
                      <text
                        x={arrow.labelX}
                        y={arrow.labelY}
                        textAnchor="middle"
                        className="text-[10px] font-medium"
                        fill="#059669"
                      >
                        With Reform
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            )}

            {pathways.map((pathway, pathwayIndex) => {
              const pathwayState = getPathwayState(pathwayIndex);
              const isVisible = isPathwayVisible(pathwayIndex);
              const isActiveRow = pathwayIndex === activePathwayIndex;
              
              // Reform is "activated" (turns green) when user has progressed past this pathway
              const isReformActivated = globalVisibleCount > (pathwayIndex + 1) * ELEMENTS_PER_PATHWAY;
              
              const pathwayAnimatingIndex = animatingNodeIndex?.pathwayIndex === pathwayIndex
                ? animatingNodeIndex.nodeIndex 
                : null;

              if (!isVisible) return null;

              // Check if reform panel is open for THIS pathway
              const isReformOpenForPathway = isReformPanelOpen && reformPathwayIndex === pathwayIndex;

              return (
                <FlowchartGrid
                  key={pathway.id}
                  nodes={pathway.nodes}
                  reform={pathway.reform}
                  expandedNodeId={expandedNodeId}
                  onNodeToggle={handleNodeToggle}
                  onNodeClose={handleNodeClose}
                  onShowEvidence={handleShowEvidence}
                  onShowReform={(reform) => handleShowReform(reform, true, pathwayIndex)}
                  visibleCount={pathwayState.nodeCount}
                  animatingNodeIndex={pathwayAnimatingIndex}
                  showNavigation={isActiveRow}
                  onContinue={isActiveRow ? handleContinue : undefined}
                  onBack={isActiveRow ? handleBack : undefined}
                  onStartOver={isActiveRow ? handleStartOver : undefined}
                  canBack={isActiveRow ? globalVisibleCount > 1 || isReformPanelOpen : undefined}
                  canContinue={isActiveRow ? globalVisibleCount < TOTAL_ELEMENTS || isReformPanelOpen : undefined}
                  showRestart={isActiveRow && isComplete}
                  showProgressIndicator={false}
                  pathwayIndex={pathwayIndex}
                  showReformBranch={pathwayState.showReformBranch}
                  isReformOpen={isReformOpenForPathway}
                  isReformActivated={isReformActivated}
                />
              );
            })}

            {/* Final Destination Node */}
            {showFinalDestination && (
              <div className="flex flex-col items-center gap-4 animate-node-enter">
                <div className="flex items-center justify-center">
                  <div
                    data-final-destination="true"
                    className="bg-[#d1fae5] border-2 border-[#059669] rounded-lg px-5 py-3 max-w-md text-center shadow-lg"
                  >
                    <h3 className="font-heading text-base font-semibold text-text-primary mb-1">
                      Positive transformation of legal services
                    </h3>
                    <p className="font-body text-xs text-text-secondary">
                      AI makes it easier and cheaper to achieve the legal outcomes clients care about
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleStartOver}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start over
                </button>
              </div>
            )}
          </div>

          {/* Global Progress Indicator */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5">
              {pathways.map((_, pathwayIndex) => (
                <div key={pathwayIndex} className="flex items-center gap-0.5">
                  {pathwayIndex > 0 && <div className="w-1.5" />}
                  {Array.from({ length: ELEMENTS_PER_PATHWAY }).map((__, elementIndex) => {
                    const globalIndex = pathwayIndex * ELEMENTS_PER_PATHWAY + elementIndex;
                    const isReformElement = elementIndex === NODES_PER_PATHWAY;
                    return (
                      <div
                        key={elementIndex}
                        className={`
                          w-1.5 h-1.5 rounded-full transition-all duration-300
                          ${globalIndex < globalVisibleCount
                            ? isReformElement ? 'bg-[#059669]/70' : 'bg-accent/70'
                            : 'bg-border/50'}
                        `}
                      />
                    );
                  })}
                </div>
              ))}
              <div className="w-1.5" />
              <div
                className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${showFinalDestination ? 'bg-[#059669]' : 'bg-border/50'}
                `}
              />
              <span className="ml-2 text-[10px] text-text-secondary/50">
                {globalVisibleCount}/{TOTAL_ELEMENTS}
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
              <span className="text-text-secondary">Impact without Reform</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#059669] flex items-center justify-center">
                <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  {/* Input line */}
                  <path d="M2 12h8" />
                  {/* Upper branch */}
                  <path d="M10 12l8-6" />
                  {/* Lower branch */}
                  <path d="M10 12l8 6" />
                </svg>
              </div>
              <span className="text-text-secondary">Reform Pathway</span>
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
      {reformNode && (
        <ReformModal
          reformNode={reformNode}
          onClose={handleContinue}
        />
      )}
    </div>
  );
}

export default App;
