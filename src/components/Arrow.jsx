export default function Arrow({
  direction = 'right',
  variant = 'standard', // 'standard' or 'reform'
  animate = false,
  visible = true,
  compact = false
}) {
  const isVertical = direction === 'down';
  const isReform = variant === 'reform';

  // Arrow colors based on variant
  const strokeColor = isReform ? '#C54B32' : '#737373';
  const dashArray = isReform ? '4 3' : 'none';

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
        flex items-center justify-center self-center
        transition-opacity duration-300
        ${compact ? 'px-0.5 min-w-[28px]' : 'px-2 min-w-[48px]'}
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ marginTop: compact ? '22px' : '28px' }} /* Offset for category label space */
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
    </div>
  );
}
