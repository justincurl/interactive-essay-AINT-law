import { useRef, useEffect } from 'react';
import NodeExpandedContent from './NodeExpandedContent';

const nodeStyles = {
  starting: {
    bg: 'bg-node-starting',
    border: 'border-node-starting',
    borderStyle: 'border-2 border-solid',
    labelColor: 'text-[#5a7a9a]', // Darker blue
  },
  bottleneck: {
    bg: 'bg-node-bottleneck',
    border: 'border-node-bottleneck',
    borderStyle: 'border-2 border-solid',
    labelColor: 'text-[#9a5a5a]', // Darker red
  },
  impact: {
    bg: 'bg-node-impact',
    border: 'border-node-impact',
    borderStyle: 'border-2 border-solid',
    labelColor: 'text-[#8a7a5a]', // Darker cream/brown
  },
  reform: {
    bg: 'bg-node-reform',
    border: 'border-node-reform',
    borderStyle: 'border-2 border-solid',
    labelColor: 'text-[#5a8a6a]', // Darker green
  },
};

export default function Node({
  node,
  isExpanded = false,
  isDimmed = false,
  showCategoryLabel = false,
  onToggle,
  onClose
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

  return (
    <div className="flex flex-col items-center">
      {/* Category label - shown temporarily on reveal */}
      <div
        className={`
          text-[11px] uppercase tracking-[0.1em] font-medium mb-2 h-5
          transition-opacity duration-300
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
        className={`
          ${styles.bg}
          ${styles.borderStyle}
          ${styles.border}
          ${isExpanded ? 'shadow-lg ring-2 ring-accent/30' : ''}
          ${isDimmed ? 'opacity-40 pointer-events-none' : ''}
          rounded-lg
          p-4
          text-left
          transition-all
          duration-300
          ease-out
          ${isExpanded ? 'max-w-[600px] w-full' : 'min-w-[200px] max-w-[280px] cursor-pointer hover:shadow-md hover:scale-[1.02]'}
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
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
              {node.title}
            </h3>
            <p className={`font-body text-sm leading-relaxed transition-opacity duration-200 ${isExpanded ? 'text-text-secondary/70' : 'text-text-secondary'}`}>
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
            <NodeExpandedContent node={node} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
