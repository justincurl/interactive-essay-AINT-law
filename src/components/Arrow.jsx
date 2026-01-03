export default function Arrow({ direction = 'right', dashed = false }) {
  const isVertical = direction === 'down';

  if (isVertical) {
    return (
      <div className="flex flex-col items-center justify-center h-12 py-2">
        <div
          className={`
            w-0.5
            h-full
            ${dashed ? 'border-l-2 border-dashed border-accent' : 'bg-text-secondary'}
          `}
        />
        <svg
          className="w-4 h-4 text-text-secondary -mt-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-2 min-w-[40px]">
      <div
        className={`
          h-0.5
          w-6
          ${dashed ? 'border-t-2 border-dashed border-accent' : 'bg-text-secondary'}
        `}
      />
      <svg
        className={`w-4 h-4 ${dashed ? 'text-accent' : 'text-text-secondary'} -ml-1`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
