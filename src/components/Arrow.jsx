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
  const dashArray = isReform ? '6 4' : 'none';

  if (isVertical) {
    return (
      <div
        className={`
          flex flex-col items-center justify-center h-12
          transition-opacity duration-300
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <svg
          width="16"
          height="48"
          viewBox="0 0 16 48"
          className={`
            ${animate ? 'animate-draw-arrow-down' : ''}
          `}
        >
          {/* Vertical line */}
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="40"
            stroke={strokeColor}
            strokeWidth="2"
            strokeDasharray={dashArray}
            className={animate ? 'animate-draw-line' : ''}
          />
          {/* Arrow head */}
          <path
            d="M4 36 L8 44 L12 36"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // Horizontal arrow - centered vertically
  if (compact) {
    return (
      <div
        className={`
          flex items-center justify-center px-1 self-center
          transition-opacity duration-300
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          className={animate ? 'animate-draw-arrow-right' : ''}
        >
          {/* Horizontal line */}
          <line
            x1="0"
            y1="6"
            x2="14"
            y2="6"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray={dashArray}
            className={animate ? 'animate-draw-line' : ''}
          />
          {/* Arrow head */}
          <path
            d="M12 3 L18 6 L12 9"
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

  return (
    <div
      className={`
        flex items-center justify-center px-2 min-w-[48px] self-center
        transition-opacity duration-300
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ marginTop: '28px' }} /* Offset for category label space */
    >
      <svg
        width="40"
        height="16"
        viewBox="0 0 40 16"
        className={animate ? 'animate-draw-arrow-right' : ''}
      >
        {/* Horizontal line */}
        <line
          x1="0"
          y1="8"
          x2="32"
          y2="8"
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray={dashArray}
          className={animate ? 'animate-draw-line' : ''}
        />
        {/* Arrow head */}
        <path
          d="M28 4 L36 8 L28 12"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
