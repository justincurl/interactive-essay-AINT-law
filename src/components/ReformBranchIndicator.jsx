import { useState, forwardRef } from 'react';

const ReformBranchIndicator = forwardRef(function ReformBranchIndicator({
  reform,
  onClick,
  isFocused = false,
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
          relative flex items-center justify-center
          min-w-[56px] min-h-[44px] px-3 py-2
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
        <span className={`
          text-[10px] font-medium whitespace-nowrap
          transition-colors
          ${isFocused || isHovered ? 'text-[#059669]' : 'text-[#6b7280]'}
        `}>
          What could change this?
        </span>
      </button>
    </div>
  );
});

export default ReformBranchIndicator;
