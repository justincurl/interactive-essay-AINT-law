import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import FlowchartGrid from './components/FlowchartGrid';
import EvidenceModal from './components/EvidenceModal';
import ReformModal from './components/ReformModal';
import LandingPage from './components/LandingPage';
import { pathway1 } from './data/pathway1';
import { pathway2 } from './data/pathway2';
import { pathway3 } from './data/pathway3';
import { finalDestination } from './data/finalDestination';

const pathways = [pathway1, pathway2, pathway3];
const NODES_PER_PATHWAY = 3;
const ELEMENTS_PER_PATHWAY = 4;
const TOTAL_ELEMENTS = pathways.length * ELEMENTS_PER_PATHWAY + 1;

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [globalVisibleCount, setGlobalVisibleCount] = useState(1);
  const [expandedNodeId, setExpandedNodeId] = useState(null);
  const [evidenceNode, setEvidenceNode] = useState(null);
  const [evidenceSectionIndex, setEvidenceSectionIndex] = useState(null);
  const [reformNode, setReformNode] = useState(null);
  const [finalDestinationExpanded, setFinalDestinationExpanded] = useState(false);
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

  const handleShowEvidence = (node, sectionIndex = null) => {
    setEvidenceNode(node);
    setEvidenceSectionIndex(sectionIndex);
  };

  const handleCloseEvidence = () => {
    setEvidenceNode(null);
    setEvidenceSectionIndex(null);
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

        const reformTab = pathwaysContainerRef.current.querySelector(
          `[data-reform-tab="${pathwayIndex}"]`
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

        if (reformTab && targetNode) {
          const sourceRect = reformTab.getBoundingClientRect();
          const targetRect = targetNode.getBoundingClientRect();

          // Skip if target has no dimensions (not rendered yet)
          if (targetRect.width === 0 || targetRect.height === 0) return;

          // Start from left edge of reform tab, vertically centered
          const sourceX = sourceRect.left - containerRect.left;
          const sourceY = sourceRect.top + sourceRect.height / 2 - containerRect.top;

          // End at left edge, vertically centered on target node
          const targetX = targetRect.left - containerRect.left;
          const targetY = targetRect.top + targetRect.height / 2 - containerRect.top;

          // Arrow path configuration
          const horizontalOvershoot = isLastPathway ? 40 : 22;  // How far past target left edge the arrow extends

          // Calculate elbow position (where arrow turns to go into target)
          const elbowX = targetX - horizontalOvershoot;

          // Vertical segment should be at the same X position as the elbow
          const verticalSegmentX = elbowX;

          // Arrow endpoint - point directly to target edge, marker positioning handles arrowhead placement
          const arrowEndX = targetX;

          // Path: left from tab to vertical position, down to target level, right into target
          const path = `M ${sourceX} ${sourceY} L ${verticalSegmentX} ${sourceY} L ${verticalSegmentX} ${targetY} L ${arrowEndX} ${targetY}`;

          newPaths.push({
            pathwayIndex,
            path,
            labelX: verticalSegmentX - 8,
            labelY: sourceY + (targetY - sourceY) * 0.25,  // Position 25% down from top instead of 50%
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

  // Show landing page first
  if (showLanding) {
    return <LandingPage onExplore={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-border/30 bg-cream/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-8 py-3 flex justify-between items-center">
          <span className="text-xs font-semibold tracking-[0.06em] uppercase text-[#737373]">
            Interactive Essay: What Could Advanced AI Mean for the Practice of Law?
          </span>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowLanding(true)}
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to intro
            </button>
            <a
              href="#"
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5"
            >
              Read full paper
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
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
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <marker
                    id="reformElbowArrowHead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="8"
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
                      <g>
                        <rect
                          x={arrow.labelX - 35}
                          y={arrow.labelY - 10}
                          width="70"
                          height="20"
                          rx="6"
                          fill="#FDFCFA"
                          stroke="#059669"
                          strokeWidth="1"
                        />
                        <text
                          x={arrow.labelX}
                          y={arrow.labelY}
                          textAnchor="middle"
                          className="text-[10px] font-medium"
                          fill="#059669"
                          dominantBaseline="middle"
                        >
                          With Reform
                        </text>
                      </g>
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
                    className={`bg-[#d1fae5] rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${finalDestinationExpanded ? 'max-w-2xl w-full' : 'max-w-md'}`}
                    onClick={() => setFinalDestinationExpanded(!finalDestinationExpanded)}
                  >
                    <div className={`px-5 py-3 ${finalDestinationExpanded ? 'text-left' : 'text-center'}`}>
                      <div className="flex items-center justify-between">
                        <div className={finalDestinationExpanded ? '' : 'w-full'}>
                          <h3 className="font-heading text-base font-semibold text-text-primary mb-1">
                            {finalDestination.title}
                          </h3>
                          <p className="font-body text-xs text-text-secondary">
                            {finalDestination.subtitle}
                          </p>
                        </div>
                        {finalDestinationExpanded && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFinalDestinationExpanded(false);
                            }}
                            className="ml-4 w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-black/5 flex-shrink-0"
                            aria-label="Collapse"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Expanded Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${finalDestinationExpanded ? 'max-h-[500px] opacity-100 mt-3 pt-3 border-t border-[#a7f3d0]' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="space-y-2.5">
                          {finalDestination.explanation?.map((paragraph, idx) => (
                            <p
                              key={idx}
                              className="text-[14px] leading-[1.65] text-text-secondary"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
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
                            ? 'bg-accent/70'
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
                  ${showFinalDestination ? 'bg-accent/70' : 'bg-border/50'}
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
              <span className="text-text-secondary">State of the World</span>
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
              <svg width="20" height="10" viewBox="0 0 20 10" className="flex-shrink-0">
                {/* Dashed arrow line */}
                <line
                  x1="0"
                  y1="5"
                  x2="16"
                  y2="5"
                  stroke="#C54B32"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                {/* Arrow head */}
                <path
                  d="M13 2 L18 5 L13 8"
                  fill="none"
                  stroke="#C54B32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-text-secondary">Pathway Without Reform</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="20" height="10" viewBox="0 0 20 10" className="flex-shrink-0">
                {/* Dashed arrow line */}
                <line
                  x1="0"
                  y1="5"
                  x2="16"
                  y2="5"
                  stroke="#059669"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                {/* Arrow head */}
                <path
                  d="M13 2 L18 5 L13 8"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-text-secondary">Pathway With Reform</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Evidence Modal */}
      {evidenceNode && (
        <EvidenceModal
          node={evidenceNode}
          sectionIndex={evidenceSectionIndex}
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
