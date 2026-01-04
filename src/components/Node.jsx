import { useRef, useEffect } from 'react';
import NodeExpandedContent from './NodeExpandedContent';
import { TextPrompt } from './ReformTrigger';

const nodeStyles = {
  starting: {
    bg: 'bg-node-starting',
    border: 'border-node-starting',
    borderStyle: 'border border-solid',
    labelColor: 'text-[#5a7a9a]',
  },
  bottleneck: {
    bg: 'bg-node-bottleneck',
    border: 'border-node-bottleneck',
    borderStyle: 'border border-solid',
    labelColor: 'text-[#9a5a5a]',
  },
  impact: {
    bg: 'bg-node-impact',
    border: 'border-node-impact',
    borderStyle: 'border border-solid',
    labelColor: 'text-[#8a7a5a]',
  },
  reform: {
    bg: 'bg-node-reform',
    border: 'border-node-reform',
    borderStyle: 'border border-solid',
    labelColor: 'text-[#5a8a6a]',
  },
};

export default function Node({
  node,
  isExpanded = false,
  isDimmed = false,
  showCategoryLabel = true,
  onToggle,
  onClose,
  onShowEvidence,
  compact = false,
  pathwayIndex = 0,
  // Reform trigger props (only used for impact nodes)
  reform = null,
  showReformTrigger = false,
  isReformOpen = false,
  isReformActivated = false,
  onShowReform = null,
}) {
  const nodeRef = useRef(null);
  const styles = nodeStyles[node.type] || nodeStyles.starting;

  // Handle click outside to close
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    // Delay adding listener to prevent immediate close
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isExpanded, onClose]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isDimmed) {
      onToggle?.();
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  // Determine if this is an impact node that should show reform trigger
  const isImpactNode = node.type === 'impact';
  const shouldShowReformTrigger = isImpactNode && showReformTrigger && reform;

  return (
    <div className="flex flex-col items-center">
      {/* Category label - always visible above node */}
      <div
        className={`
          text-[10px] uppercase tracking-[0.1em] font-medium mb-1.5 h-4
          transition-opacity duration-300 text-center w-full
          ${styles.labelColor}
          ${showCategoryLabel ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {node.category}
      </div>

      {/* Node card */}
      <div
        ref={nodeRef}
        onClick={handleClick}
        data-pathway-index={pathwayIndex}
        data-node-type={node.type}
        className={`
          ${styles.bg}
          ${styles.borderStyle}
          ${styles.border}
          ${isExpanded ? 'shadow-lg ring-2 ring-accent/30' : ''}
          ${isDimmed ? 'opacity-40 pointer-events-none' : ''}
          rounded-md
          ${shouldShowReformTrigger ? 'rounded-b-none' : ''}
          ${isExpanded ? 'text-left' : 'text-center'}
          transition-all
          duration-300
          ease-out
          ${isExpanded
            ? 'max-w-[500px] w-full p-4'
            : compact
              ? 'w-[200px] p-2.5 cursor-pointer hover:shadow-md hover:scale-[1.02]'
              : 'min-w-[200px] max-w-[280px] p-4 cursor-pointer hover:shadow-md hover:scale-[1.02]'
          }
        `}
        role="button"
        tabIndex={isDimmed ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
          }
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-1">
          <div className="flex-1 min-w-0">
            <h3 className={`font-heading font-semibold text-text-primary leading-tight text-center ${
              isExpanded ? 'text-base' : compact ? 'text-[13px]' : 'text-lg'
            }`}>
              {node.title}
            </h3>
            <p className={`font-body leading-snug transition-opacity duration-200 mt-1 ${
              isExpanded
                ? 'text-sm text-text-secondary/70 text-left'
                : compact
                  ? 'text-[11px] text-text-secondary line-clamp-2 text-center'
                  : 'text-sm text-text-secondary text-center'
            }`}>
              {node.subtitle}
            </p>
          </div>

          {/* Close button - only shown when expanded */}
          {isExpanded && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-black/5"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Expanded content */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-out
            ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          {isExpanded && (
            <NodeExpandedContent
              node={node}
              onClose={onClose}
              onShowEvidence={onShowEvidence}
            />
          )}
        </div>
      </div>

      {/* Reform trigger - Element B: Text Prompt (below node) */}
      {shouldShowReformTrigger && (
        <TextPrompt
          onClick={() => onShowReform?.(reform)}
          isOpen={isReformOpen}
          disabled={isDimmed}
        />
      )}
    </div>
  );
}
