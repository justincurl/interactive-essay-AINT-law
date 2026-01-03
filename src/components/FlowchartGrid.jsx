import { useState, useEffect, useCallback } from 'react';
import Node from './Node';
import Arrow from './Arrow';

export default function FlowchartGrid({
  nodes,
  expandedNodeId,
  onNodeToggle,
  onNodeClose
}) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [animatingNodeIndex, setAnimatingNodeIndex] = useState(null);
  const [showCategoryLabel, setShowCategoryLabel] = useState({});

  const totalNodes = nodes.length;
  const isComplete = visibleCount >= totalNodes;
  const hasExpanded = expandedNodeId !== null;

  // Handle Continue click
  const handleContinue = useCallback(() => {
    if (visibleCount < totalNodes) {
      const newIndex = visibleCount;
      setAnimatingNodeIndex(newIndex);
      setVisibleCount(prev => prev + 1);

      // Show category label for the new node
      const nodeId = nodes[newIndex]?.id;
      if (nodeId) {
        setShowCategoryLabel(prev => ({ ...prev, [nodeId]: true }));

        // Fade out after 2 seconds
        setTimeout(() => {
          setShowCategoryLabel(prev => ({ ...prev, [nodeId]: false }));
        }, 2000);
      }

      // Clear animation state after animation completes
      setTimeout(() => {
        setAnimatingNodeIndex(null);
      }, 400);
    }
  }, [visibleCount, totalNodes, nodes]);

  // Handle Back click
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
    setShowCategoryLabel({});
  }, [expandedNodeId, onNodeClose]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Flowchart row */}
      <div className="flex items-start flex-wrap justify-center gap-y-4">
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
                />
              )}

              <Node
                node={node}
                isExpanded={isExpanded}
                isDimmed={isDimmed}
                showCategoryLabel={showCategoryLabel[node.id] || false}
                onToggle={() => onNodeToggle(node.id)}
                onClose={onNodeClose}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-4">
        {/* Back button */}
        {visibleCount > 1 && !isComplete && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* Continue button */}
        {!isComplete && (
          <button
            onClick={handleContinue}
            className="flex items-center gap-1 px-5 py-2.5 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors shadow-sm"
          >
            Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Start Over button (when complete) */}
        {isComplete && (
          <button
            onClick={handleStartOver}
            className="flex items-center gap-1 px-5 py-2.5 text-sm font-medium border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {nodes.map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index < visibleCount ? 'bg-accent' : 'bg-border'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
