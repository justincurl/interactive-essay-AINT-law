import { useState } from 'react';

const nodeStyles = {
  blue: {
    bg: 'bg-node-blue',
    border: 'border-node-blue',
    borderStyle: 'border-2 border-solid',
  },
  gray: {
    bg: 'bg-node-gray',
    border: 'border-node-gray',
    borderStyle: 'border-2 border-solid',
  },
  cream: {
    bg: 'bg-node-cream',
    border: 'border-node-cream',
    borderStyle: 'border-2 border-solid',
  },
  reform: {
    bg: 'bg-cream',
    border: 'border-accent',
    borderStyle: 'border-2 border-dashed',
  },
};

export default function Node({
  id,
  type = 'blue',
  title,
  subtitle,
  isSelected = false,
  onClick
}) {
  const styles = nodeStyles[type] || nodeStyles.blue;

  return (
    <button
      onClick={() => onClick?.(id)}
      className={`
        ${styles.bg}
        ${styles.borderStyle}
        ${styles.border}
        ${isSelected ? 'ring-2 ring-accent ring-offset-2' : ''}
        rounded-lg
        p-4
        min-w-[200px]
        max-w-[280px]
        text-left
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-md
        hover:scale-[1.02]
        focus:outline-none
        focus:ring-2
        focus:ring-accent
        focus:ring-offset-2
      `}
    >
      <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
        {title}
      </h3>
      <p className="font-body text-sm text-text-secondary leading-relaxed">
        {subtitle}
      </p>
    </button>
  );
}
