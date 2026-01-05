import { useState, useEffect, useCallback } from 'react';
import Node from './Node';
import Arrow from './Arrow';

export default function FlowchartGrid({
  nodes,
  reform,
  expandedNodeId,
  onNodeToggle,
  onNodeClose,
  onShowEvidence,
  onShowReform,
  visibleCount: controlledVisibleCount,
  onContinue,
  onBack,
  onStartOver,
  showNavigation = true,
  animatingNodeIndex: controlledAnimatingIndex,
  canBack: overrideCanBack,
  canContinue: overrideCanContinue,
  showRestart: overrideShowRestart,
  showProgressIndicator = true,
  pathwayIndex = 0,
  showReformBranch = false,
  isReformOpen = false,
  isReformActivated = false,
}) {
  const [internalVisibleCount, setInternalVisibleCount] = useState(1);
  const [internalAnimatingNodeIndex, setInternalAnimatingNodeIndex] = useState(null);

  const isControlled = controlledVisibleCount !== undefined;
  const visibleCount = isControlled ? controlledVisibleCount : internalVisibleCount;
  const animatingNodeIndex = isControlled ? controlledAnimatingIndex : internalAnimatingNodeIndex;

  const totalNodes = nodes.length;
  const allNodesVisible = visibleCount >= totalNodes;
  const hasExpanded = expandedNodeId !== null;

  const canBack = overrideCanBack !== undefined ? overrideCanBack : visibleCount > 1;
  const canContinue = overrideCanContinue !== undefined ? overrideCanContinue : !allNodesVisible;
  const showRestart = overrideShowRestart !== undefined ? overrideShowRestart : false;

  const handleContinue = useCallback(() => {
    if (isControlled) {
      onContinue?.();
    } else if (visibleCount < totalNodes) {
      const newIndex = visibleCount;
      setInternalAnimatingNodeIndex(newIndex);
      setInternalVisibleCount(prev => prev + 1);

      setTimeout(() => {
        setInternalAnimatingNodeIndex(null);
      }, 400);
    }
  }, [isControlled, onContinue, visibleCount, totalNodes]);

  const handleBack = useCallback(() => {
    if (isControlled) {
      onBack?.();
    } else if (visibleCount > 1) {
      if (expandedNodeId) {
        onNodeClose();
      }
      setInternalVisibleCount(prev => prev - 1);
    }
  }, [isControlled, onBack, visibleCount, expandedNodeId, onNodeClose]);

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

  useEffect(() => {
    if (isControlled) return;

    const handleKeyDown = (e) => {
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

  const handleReformClick = (reformData) => {
    if (reformData) {
      onShowReform?.(reformData, pathwayIndex);
    }
  };

  // Determine if the last node (impact node) should show reform trigger
  const lastNodeIndex = nodes.length - 1;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full flex items-center justify-center">
        {showNavigation && canBack && (
          <button
            onClick={handleBack}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-secondary/50 hover:text-text-primary transition-colors rounded-full hover:bg-black/5 z-20"
            aria-label="Go back"
            title="Go back (left arrow)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="flex items-start justify-center gap-1 px-12 transition-all duration-300 ease-out">
          {nodes.map((node, index) => {
            const isVisible = index < visibleCount;
            const isExpanded = expandedNodeId === node.id;
            const isDimmed = hasExpanded && !isExpanded;
            const isAnimating = animatingNodeIndex === index;

            if (!isVisible) return null;

            return (
              <div
                key={node.id}
                className={`
                  flex items-start
                  transition-all duration-300 ease-out
                  ${isExpanded ? 'z-10' : 'z-0'}
                  ${isAnimating ? 'animate-node-enter' : ''}
                `}
              >
                {index > 0 && (
                  <Arrow
                    direction="right"
                    variant={index === lastNodeIndex ? "reform" : "standard"}
                    visible={!hasExpanded || isExpanded}
                    animate={isAnimating}
                    compact={true}
                    showLabel={index === lastNodeIndex}
                    label="By Default"
                    extraSpacing={index === lastNodeIndex}
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
                  pathwayIndex={pathwayIndex}
                  // Reform trigger props - only applied to impact (last) node
                  reform={index === lastNodeIndex ? reform : null}
                  showReformTrigger={index === lastNodeIndex && showReformBranch}
                  isReformOpen={isReformOpen}
                  isReformActivated={isReformActivated}
                  onShowReform={handleReformClick}
                />
              </div>
            );
          })}

        </div>


        {showNavigation && canContinue && (
          <button
            onClick={handleContinue}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-secondary/50 hover:text-text-primary transition-colors rounded-full hover:bg-black/5 z-20"
            aria-label="Continue"
            title="Continue (right arrow)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

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
          {reform && (
            <div
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300
                ${showReformBranch ? 'bg-accent/70' : 'bg-border/50'}
              `}
            />
          )}
          <span className="ml-2 text-[10px] text-text-secondary/50">
            {visibleCount + (showReformBranch ? 1 : 0)}/{totalNodes + (reform ? 1 : 0)}
          </span>
        </div>
      )}
    </div>
  );
}
