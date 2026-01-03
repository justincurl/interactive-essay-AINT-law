export default function BypassArrow({ visible }) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-5 flex items-center justify-center">
      <svg
        width="420"
        height="80"
        viewBox="0 0 420 80"
        className="absolute"
        style={{ top: '-50px' }}
      >
        <defs>
          {/* Gradient for the bypass arrow */}
          <linearGradient id="bypassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>

          {/* Arrow marker */}
          <marker
            id="bypassArrowHead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="#059669"
            />
          </marker>
        </defs>

        {/* Curved bypass path - arcs over the impact node */}
        <path
          d="M 100 60
             C 100 20, 210 10, 210 10
             C 210 10, 320 20, 320 60"
          fill="none"
          stroke="url(#bypassGradient)"
          strokeWidth="2.5"
          strokeDasharray="6 3"
          strokeLinecap="round"
          markerEnd="url(#bypassArrowHead)"
          className="animate-draw-bypass"
        />

        {/* Label on the arc */}
        <text
          x="210"
          y="8"
          textAnchor="middle"
          className="text-[10px] font-medium"
          fill="#059669"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Reform Pathway
        </text>
      </svg>
    </div>
  );
}
