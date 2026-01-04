import { useState } from 'react';

export default function Arrow({
  direction = 'right',
  variant = 'standard', // 'standard' or 'reform'
  animate = false,
  visible = true,
  compact = false,
  showUnlock = false,
  onUnlockClick = null,
  // Branch node props (for reform trigger on arrow)
  showBranchNode = false,
  isBranchActivated = false,
  isBranchOpen = false,
  onBranchClick = null
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBranchHovered, setIsBranchHovered] = useState(false);
  const isVertical = direction === 'down';
  const isReform = variant === 'reform';

  // Arrow colors based on variant
  const strokeColor = isReform ? '#C54B32' : '#737373';
  const dashArray = isReform ? '4 3' : 'none';

  // Branch node color - gray by default, green when activated or open
  const isBranchHighlighted = isBranchActivated || isBranchOpen || isBranchHovered;

  if (isVertical) {
    return (
      <div
        className={`
          flex flex-col items-center justify-center h-8
          transition-opacity duration-300
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <svg
          width="12"
          height="32"
          viewBox="0 0 12 32"
          className={animate ? 'animate-draw-arrow-down' : ''}
        >
          <line
            x1="6"
            y1="0"
            x2="6"
            y2="26"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray={dashArray}
            className={animate ? 'animate-draw-line' : ''}
          />
          <path
            d="M3 23 L6 30 L9 23"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // Horizontal arrow - compact version
  const arrowWidth = compact ? 24 : 40;
  const arrowHeight = compact ? 12 : 16;
  const lineEnd = compact ? 18 : 32;
  const headX1 = compact ? 14 : 28;
  const headX2 = compact ? 22 : 36;
  const headY1 = compact ? 3 : 4;
  const headY2 = compact ? 9 : 12;
  const centerY = compact ? 6 : 8;
  const strokeWidth = compact ? 1.5 : 2;

  return (
    <div
      className={`
        relative flex items-center justify-center self-center
        transition-opacity duration-300
        ${compact ? 'px-0.5 min-w-[28px]' : 'px-2 min-w-[48px]'}
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ marginTop: compact ? '22px' : '28px' }}
    >
      <svg
        width={arrowWidth}
        height={arrowHeight}
        viewBox={`0 0 ${arrowWidth} ${arrowHeight}`}
        className={animate ? 'animate-draw-arrow-right' : ''}
      >
        <line
          x1="0"
          y1={centerY}
          x2={lineEnd}
          y2={centerY}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          className={animate ? 'animate-draw-line' : ''}
        />
        <path
          d={`M${headX1} ${headY1} L${headX2} ${centerY} L${headX1} ${headY2}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Branch node - positioned on top of the arrow */}
      {showBranchNode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBranchClick?.();
          }}
          onMouseEnter={() => setIsBranchHovered(true)}
          onMouseLeave={() => setIsBranchHovered(false)}
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-5 h-5 rounded-full
            flex items-center justify-center
            transition-all duration-200 ease-out
            border-2
            ${isBranchHighlighted
              ? 'bg-[#059669] border-[#059669] scale-110'
              : 'bg-white border-[#737373] hover:scale-110 hover:border-[#059669]'
            }
            cursor-pointer z-20
          `}
          aria-label="Explore reforms"
          title="Explore reforms"
        >
          {/* Fork/branch icon - line entering with two branches splitting out */}
          <svg
            className={`w-3 h-3 transition-colors ${isBranchHighlighted ? 'text-white' : 'text-[#737373]'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Input line from left to center junction */}
            <path d="M3 12h7" />
            {/* Junction box */}
            <rect x="10" y="8" width="4" height="8" rx="1" stroke="currentColor" fill="none" strokeWidth={2} />
            {/* Upper branch going right */}
            <path d="M14 10h4" />
            {/* Upper arrow head */}
            <path d="M16 8l2 2-2 2" />
            {/* Lower branch going right */}
            <path d="M14 14h4" />
            {/* Lower arrow head */}
            <path d="M16 12l2 2-2 2" />
          </svg>
        </button>
      )}

      {/* Unlock icon overlay - positioned on the arrow */}
      {showUnlock && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnlockClick?.();
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-5 h-5 rounded-full
            flex items-center justify-center
            transition-all duration-200
            cursor-pointer z-10
            ${isHovered
              ? 'bg-[#d1fae5] text-[#059669] scale-110 shadow-sm'
              : 'bg-white/90 text-text-secondary/40 shadow-sm'
            }
          `}
          aria-label="View reform pathway"
          title="View reform pathway"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}
