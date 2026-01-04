import { useState, forwardRef } from 'react';

const ReformBranchIndicator = forwardRef(function ReformBranchIndicator({
  reform,
  onClick,
  isFocused = false,
  isLast = false,
  pathwayIndex = 0,
}, ref) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.(reform);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(reform);
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center"
      style={{ marginTop: '22px' }}
    >
      <button
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex flex-col items-center justify-center
          min-w-[56px] min-h-[56px] px-2 py-1.5
          rounded-lg border-2 border-dashed
          transition-all duration-200
          cursor-pointer
          ${isFocused || isHovered
            ? 'border-[#059669] bg-[#ecfdf5] shadow-md scale-105'
            : 'border-[#9ca3af] bg-white/80 hover:border-[#059669] hover:bg-[#f0fdf4]'
          }
          ${isFocused ? 'ring-2 ring-[#059669] ring-offset-2' : ''}
        `}
        role="button"
        tabIndex={0}
        aria-label={`Reform pathway: ${reform?.title || 'View reform options'}`}
        title={reform?.subtitle || 'Click to view reform pathway'}
      >
        <svg 
          className={`w-4 h-4 mb-0.5 transition-colors ${
            isFocused || isHovered ? 'text-[#059669]' : 'text-[#6b7280]'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 7l5 5m0 0l-5 5m5-5H6" 
          />
        </svg>
        <span className={`
          text-[10px] font-medium whitespace-nowrap
          transition-colors
          ${isFocused || isHovered ? 'text-[#059669]' : 'text-[#6b7280]'}
        `}>
          Reform?
        </span>
      </button>

      <svg
        className="absolute top-full left-1/2 -translate-x-1/2 mt-1"
        width="24"
        height="32"
        viewBox="0 0 24 32"
      >
        <defs>
          <marker
            id={`reformArrowHead-${pathwayIndex}`}
            markerWidth="6"
            markerHeight="4"
            refX="5"
            refY="2"
            orient="auto"
          >
            <polygon
              points="0 0, 6 2, 0 4"
              fill="#9ca3af"
            />
          </marker>
        </defs>
        <path
          d="M 12 0 L 12 26"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd={`url(#reformArrowHead-${pathwayIndex})`}
        />
      </svg>

      {!isLast && (
        <span className="absolute top-full mt-10 text-[9px] text-[#6b7280] whitespace-nowrap">
          to next stage
        </span>
      )}
      {isLast && (
        <span className="absolute top-full mt-10 text-[9px] text-[#059669] font-medium whitespace-nowrap">
          to transformation
        </span>
      )}
    </div>
  );
});

export default ReformBranchIndicator;
