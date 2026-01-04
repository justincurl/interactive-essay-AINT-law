import { useState } from 'react';

/**
 * ReformTrigger - Modular trigger for opening the reform panel
 *
 * Consists of two complementary elements:
 * - Element A: BranchingNode - A circular node on the right edge of the Impact box
 * - Element B: TextPrompt - A text link below the Impact box
 *
 * Both elements trigger the same action (opening the reform panel).
 */

// Element A: Branching Path Node
function BranchingNode({
  onClick,
  isOpen = false,
  isActivated = false,
  disabled = false
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!disabled) {
      onClick?.();
    }
  };

  const isHighlighted = isOpen || isActivated || isHovered;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={`
        absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/4
        w-4 h-4 rounded-full
        flex items-center justify-center
        transition-all duration-200 ease-out
        border-2
        ${isHighlighted
          ? 'bg-[#059669] border-[#059669] scale-110'
          : 'bg-white border-[#10b981] hover:scale-110'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        z-20
        group
      `}
      aria-label="Explore reforms"
      title="Explore reforms"
    >
      {/* Plus/Fork icon */}
      <svg
        className={`w-2.5 h-2.5 transition-colors ${isHighlighted ? 'text-white' : 'text-[#10b981]'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>

      {/* Tooltip - only show on hover when not open */}
      {isHovered && !isOpen && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-[#1f2937] text-white text-[10px] rounded whitespace-nowrap z-30 pointer-events-none">
          Explore reforms
        </div>
      )}
    </button>
  );
}

// Element B: Text Prompt - styled as a small tab peeking from bottom of node
function TextPrompt({
  onClick,
  isOpen = false,
  disabled = false
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={`
        -mt-0.5 px-2.5 py-1
        text-[10px] font-medium
        transition-all duration-200
        rounded-b-md
        border border-t-0 border-[#d1d5db]
        bg-white/80
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isOpen
          ? 'opacity-0 pointer-events-none -translate-y-1'
          : 'opacity-100 translate-y-0'
        }
        ${isHovered && !isOpen
          ? 'bg-[#f0fdf4] border-[#10b981] text-[#059669]'
          : 'text-[#737373]'
        }
        shadow-sm
      `}
      aria-label="What could change this?"
    >
      What could change this?
    </button>
  );
}

// Curved connecting path from node to reform panel
function ConnectingPath({ isOpen = false }) {
  if (!isOpen) return null;

  return (
    <svg
      className="absolute right-0 top-1/2 pointer-events-none z-10"
      style={{
        width: '60px',
        height: '80px',
        transform: 'translate(50%, -25%)',
        overflow: 'visible'
      }}
    >
      <path
        d="M 0 0 Q 30 0 40 30 Q 50 60 60 60"
        fill="none"
        stroke="#059669"
        strokeWidth="2"
        strokeDasharray="4 3"
        className="animate-dash-flow"
      />
    </svg>
  );
}

// Main export - combines both elements
export default function ReformTrigger({
  reform,
  onClick,
  isOpen = false,
  isActivated = false,
  visible = false,
  disabled = false
}) {
  if (!visible || !reform) return null;

  const handleClick = () => {
    onClick?.(reform);
  };

  return (
    <>
      {/* Element A: Branching Node - positioned on right edge of parent */}
      <BranchingNode
        onClick={handleClick}
        isOpen={isOpen}
        isActivated={isActivated}
        disabled={disabled}
      />

      {/* Connecting path when open */}
      <ConnectingPath isOpen={isOpen} />
    </>
  );
}

// Export individual elements for flexibility
export { BranchingNode, TextPrompt, ConnectingPath };
