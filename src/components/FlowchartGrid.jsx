import { useState, useEffect, useCallback } from 'react';
import Node from './Node';
import Arrow from './Arrow';
import BypassArrow from './BypassArrow';

export default function FlowchartGrid({
  nodes,
  expandedNodeId,
  onNodeToggle,
  onNodeClose,
  onShowEvidence,
  onShowReform,
  showBypassArrow = false,
  visibleCount: controlledVisibleCount,
  onContinue,
  onBack,
  onStartOver,
  showNavigation = true,
  pathwayTitle,
  pathwayDescription,
  animatingNodeIndex: controlledAnimatingIndex,
  // Override props for global navigation (when arrows should be controlled by parent)
  canBack: overrideCanBack,
  canContinue: overrideCanContinue,
  showRestart: overrideShowRestart,
  showProgressIndicator = true
}) {
  const [internalVisibleCount, setInternalVisibleCount] = useState(1);
  const [internalAnimatingNodeIndex, setInternalAnimatingNodeIndex] = useState(null);

  // Use controlled or internal state
  const isControlled = controlledVisibleCount !== undefined;
  const visibleCount = isControlled ? controlledVisibleCount : internalVisibleCount;
  const animatingNodeIndex = isControlled ? controlledAnimatingIndex : internalAnimatingNodeIndex;

  const totalNodes = nodes.length;
  const isComplete = visibleCount >= totalNodes;
  const hasExpanded = expandedNodeId !== null;

  // Use override props if provided, otherwise use local logic
  const canBack = overrideCanBack !== undefined ? overrideCanBack : visibleCount > 1;
  const canContinue = overrideCanContinue !== undefined ? overrideCanContinue : !isComplete;
  const showRestart = overrideShowRestart !== undefined ? overrideShowRestart : isComplete;

  // Find node indices by type
  const bottleneckIndex = nodes.findIndex(n => n.type === 'bottleneck');
  const impactIndex = nodes.findIndex(n => n.type === 'impact');

  // Handle Continue (next node)
  const handleContinue = useCallback(() => {
    if (isControlled) {
      onContinue?.();
    } else if (visibleCount < totalNodes) {
      const newIndex = visibleCount;
      setInternalAnimatingNodeIndex(newIndex);
      setInternalVisibleCount(prev => prev + 1);

      // Clear animation state after animation completes
      setTimeout(() => {
        setInternalAnimatingNodeIndex(null);
      }, 400);
    }
  }, [isControlled, onContinue, visibleCount, totalNodes]);

  // Handle Back (previous node)
  const handleBack = useCallback(() => {
    if (isControlled) {
      onBack?.();
    } else if (visibleCount > 1) {
      // Close any expanded node first
      if (expandedNodeId) {
        onNodeClose();
      }
      setInternalVisibleCount(prev => prev - 1);
    }
  }, [isControlled, onBack, visibleCount, expandedNodeId, onNodeClose]);

  // Handle Start Over
  const handleStartOver = useCallback(() => {
    if (isControlled) {
      onStartOver?.();
    } else {
      if (expandedNodeId) {
        onNodeClose();
      }
      setInternalVisibleCount(1);
    }
  }, [isControlled, onStartOver, expandedNodeId, onNodeClose]);

  // Keyboard navigation - only if not controlled (parent handles it)
  useEffect(() => {
    if (isControlled) return; // Parent handles keyboard navigation

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
  }, [isControlled, handleContinue, handleBack, visibleCount, totalNodes]);

  // Handle unlock click - find bottleneck node and trigger reform modal
  const handleUnlockClick = () => {
    const bottleneckNode = nodes.find(n => n.type === 'bottleneck');
    if (bottleneckNode) {
      onShowReform?.(bottleneckNode);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Pathway title - only shown if provided */}
      {pathwayTitle && (
        <div className="text-center">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            {pathwayTitle}
          </h3>
          {pathwayDescription && (
            <p className="font-body text-xs text-text-secondary mt-0.5">
              {pathwayDescription}
            </p>
          )}
        </div>
      )}

      {/* Flowchart row with navigation arrows */}
      <div className="relative w-full flex items-center justify-center">
        {/* Bypass arrow overlay */}
        <BypassArrow visible={showBypassArrow} />

        {/* Left navigation arrow - only if showNavigation is true and canBack */}
        {showNavigation && canBack && (
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

            // Show unlock icon on arrow between bottleneck and impact
            const isArrowBeforeImpact = index === impactIndex && bottleneckIndex >= 0;
            const showUnlockOnArrow = isArrowBeforeImpact && visibleCount > impactIndex;

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
                    showUnlock={showUnlockOnArrow && !showBypassArrow}
                    onUnlockClick={handleUnlockClick}
                  />
                )}

                <Node
                  node={node}
                  isExpanded={isExpanded}
                  isDimmed={isDimmed}
                  showCategoryLabel={true}
                  onToggle={() => onNodeToggle(node.id)}
                  onClose={onNodeClose}
                  onShowEvidence={onShowEvidence}
                  compact={true}
                />
              </div>
            );
          })}
        </div>

        {/* Right navigation arrow - only if showNavigation is true and canContinue */}
        {showNavigation && canContinue && (
          <button
            onClick={handleContinue}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-secondary/50 hover:text-text-primary transition-colors rounded-full hover:bg-black/5 z-20"
            aria-label="Continue"
            title="Continue (→)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Restart indicator when complete - only if showNavigation is true and showRestart */}
        {showNavigation && showRestart && (
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

      {/* Progress indicator - subtle dots - only if showNavigation and showProgressIndicator are true */}
      {showNavigation && showProgressIndicator && (
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
      )}
    </div>
  );
}
