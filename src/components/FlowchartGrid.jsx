import { useState, useEffect, useCallback } from 'react';
import Node from './Node';
import Arrow from './Arrow';

// Column categories in order
const COLUMN_CATEGORIES = [
  { key: 'starting', label: 'Starting Condition' },
  { key: 'bottleneck', label: 'Bottleneck' },
  { key: 'impact', label: 'Impact Without Reform' },
  { key: 'reform', label: 'Reform Examples' },
];

export default function FlowchartGrid({
  nodes,
  expandedNodeId,
  onNodeToggle,
  onNodeClose,
  onShowEvidence
}) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [animatingNodeIndex, setAnimatingNodeIndex] = useState(null);

  const totalNodes = nodes.length;
  const isComplete = visibleCount >= totalNodes;
  const hasExpanded = expandedNodeId !== null;

  // Handle Continue (next node)
  const handleContinue = useCallback(() => {
    if (visibleCount < totalNodes) {
      const newIndex = visibleCount;
      setAnimatingNodeIndex(newIndex);
      setVisibleCount(prev => prev + 1);

      // Clear animation state after animation completes
      setTimeout(() => {
        setAnimatingNodeIndex(null);
      }, 400);
    }
  }, [visibleCount, totalNodes]);

  // Handle Back (previous node)
  const handleBack = useCallback(() => {
    if (visibleCount > 1) {
      // Close any expanded node first
      if (expandedNodeId) {
        onNodeClose();
      }
      setVisibleCount(prev => prev - 1);
    }
  }, [visibleCount, expandedNodeId, onNodeClose]);

  // Handle Start Over
  const handleStartOver = useCallback(() => {
    if (expandedNodeId) {
      onNodeClose();
    }
    setVisibleCount(1);
  }, [expandedNodeId, onNodeClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle if modal is open or user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowRight' && visibleCount < totalNodes) {
        e.preventDefault();
        handleContinue();
      } else if (e.key === 'ArrowLeft' && visibleCount > 1) {
        e.preventDefault();
        handleBack();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleContinue, handleBack, visibleCount, totalNodes]);

  // Group nodes by column type for header positioning
  const getColumnIndex = (nodeType) => {
    return COLUMN_CATEGORIES.findIndex(c => c.key === nodeType);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Column headers - persistent */}
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-4 gap-2 px-4">
          {COLUMN_CATEGORIES.map((col, idx) => (
            <div
              key={col.key}
              className="text-center"
            >
              <span className="text-[10px] uppercase tracking-[0.12em] font-medium text-text-secondary/60">
                {col.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Flowchart row with navigation arrows */}
      <div className="relative w-full flex items-center justify-center">
        {/* Left navigation arrow */}
        {visibleCount > 1 && (
          <button
            onClick={handleBack}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-secondary/50 hover:text-text-primary transition-colors rounded-full hover:bg-black/5 z-20"
            aria-label="Go back"
            title="Go back (←)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Nodes container */}
        <div className="flex items-start justify-center gap-1 px-12">
          {nodes.map((node, index) => {
            const isVisible = index < visibleCount;
            const isExpanded = expandedNodeId === node.id;
            const isDimmed = hasExpanded && !isExpanded;
            const isAnimating = animatingNodeIndex === index;
            const isReformNode = node.type === 'reform';

            // Don't render nodes that aren't visible yet
            if (!isVisible) return null;

            return (
              <div
                key={node.id}
                className={`
                  flex items-start
                  transition-all duration-300
                  ${isExpanded ? 'z-10' : 'z-0'}
                  ${isAnimating ? 'animate-node-enter' : ''}
                `}
              >
                {/* Arrow before node (except first node) */}
                {index > 0 && (
                  <Arrow
                    direction="right"
                    variant={isReformNode ? 'reform' : 'standard'}
                    visible={!hasExpanded || isExpanded}
                    animate={isAnimating}
                    compact={true}
                  />
                )}

                <Node
                  node={node}
                  isExpanded={isExpanded}
                  isDimmed={isDimmed}
                  onToggle={() => onNodeToggle(node.id)}
                  onClose={onNodeClose}
                  onShowEvidence={onShowEvidence}
                  compact={true}
                />
              </div>
            );
          })}
        </div>

        {/* Right navigation arrow */}
        {!isComplete && (
          <button
            onClick={handleContinue}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-accent/70 hover:text-accent transition-colors rounded-full hover:bg-accent/10 z-20"
            aria-label="Continue"
            title="Continue (→)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Restart indicator when complete */}
        {isComplete && (
          <button
            onClick={handleStartOver}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-secondary/50 hover:text-text-primary transition-colors rounded-full hover:bg-black/5 z-20"
            aria-label="Start over"
            title="Start over"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress indicator - subtle dots */}
      <div className="flex items-center gap-1.5">
        {nodes.map((_, index) => (
          <div
            key={index}
            className={`
              w-1.5 h-1.5 rounded-full transition-all duration-300
              ${index < visibleCount ? 'bg-accent/70' : 'bg-border/50'}
            `}
          />
        ))}
        <span className="ml-2 text-[10px] text-text-secondary/50">
          {visibleCount}/{totalNodes}
        </span>
      </div>
    </div>
  );
}
