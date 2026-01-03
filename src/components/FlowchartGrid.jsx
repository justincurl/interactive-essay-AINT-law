import { useState, useEffect, useCallback } from 'react';
import Node from './Node';
import Arrow from './Arrow';

const COLUMN_LABELS = ['Starting Condition', 'Bottleneck', 'Impact Without Reform', 'Reform Examples'];

export default function FlowchartGrid({
  nodes,
  expandedNodeId,
  onNodeToggle,
  onNodeClose
}) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [animatingNodeIndex, setAnimatingNodeIndex] = useState(null);

  const totalNodes = nodes.length;
  const isComplete = visibleCount >= totalNodes;
  const hasExpanded = expandedNodeId !== null;

  // Handle Continue click
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
  }, [expandedNodeId, onNodeClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && visibleCount < totalNodes) {
        handleContinue();
      } else if (e.key === 'ArrowLeft' && visibleCount > 1) {
        handleBack();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleContinue, handleBack, visibleCount, totalNodes]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Persistent column headers */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-x-8 w-full max-w-5xl">
          {COLUMN_LABELS.map((label, index) => (
            <div
              key={label}
              className={`
                text-center text-xs uppercase tracking-wider font-medium
                transition-opacity duration-300
                ${index < visibleCount ? 'text-text-secondary/60' : 'text-text-secondary/30'}
              `}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Flowchart with navigation arrows */}
      <div className="relative flex items-center justify-center w-full">
        {/* Left navigation arrow */}
        <button
          onClick={handleBack}
          disabled={visibleCount <= 1}
          className={`
            absolute left-0 z-20 p-2 rounded-full transition-all duration-200
            ${visibleCount > 1 
              ? 'text-text-secondary/60 hover:text-text-primary hover:bg-black/5 cursor-pointer' 
              : 'text-text-secondary/20 cursor-default'}
          `}
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flowchart grid */}
        <div className="grid grid-cols-4 gap-x-2 w-full max-w-5xl px-10">
          {nodes.map((node, index) => {
            const isVisible = index < visibleCount;
            const isExpanded = expandedNodeId === node.id;
            const isDimmed = hasExpanded && !isExpanded;
            const isAnimating = animatingNodeIndex === index;
            const isReformNode = node.type === 'reform';

            return (
              <div
                key={node.id}
                className={`
                  flex items-center justify-center
                  transition-all duration-300
                  ${isExpanded ? 'z-10' : 'z-0'}
                  ${isAnimating ? 'animate-node-enter' : ''}
                  ${!isVisible ? 'opacity-0 pointer-events-none' : ''}
                `}
              >
                {/* Arrow before node (except first node) */}
                <div className={`flex-shrink-0 ${index === 0 ? 'hidden' : ''}`}>
                  <Arrow
                    direction="right"
                    variant={isReformNode ? 'reform' : 'standard'}
                    visible={isVisible && (!hasExpanded || isExpanded)}
                    animate={isAnimating}
                    compact
                  />
                </div>

                <Node
                  node={node}
                  isExpanded={isExpanded}
                  isDimmed={isDimmed}
                  onToggle={() => onNodeToggle(node.id)}
                  onClose={onNodeClose}
                  compact
                />
              </div>
            );
          })}
        </div>

        {/* Right navigation arrow */}
        <button
          onClick={handleContinue}
          disabled={isComplete}
          className={`
            absolute right-0 z-20 p-2 rounded-full transition-all duration-200
            ${!isComplete 
              ? 'text-text-secondary/60 hover:text-text-primary hover:bg-black/5 cursor-pointer' 
              : 'text-text-secondary/20 cursor-default'}
          `}
          aria-label="Continue"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress indicator and Start Over */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          {nodes.map((_, index) => (
            <div
              key={index}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300
                ${index < visibleCount ? 'bg-accent' : 'bg-border'}
              `}
            />
          ))}
        </div>
        
        {/* Start Over link (when complete) */}
        {isComplete && (
          <button
            onClick={handleStartOver}
            className="text-xs text-text-secondary/60 hover:text-accent transition-colors"
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
