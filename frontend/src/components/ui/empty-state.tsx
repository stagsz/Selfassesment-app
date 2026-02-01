'use client';

import { type LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface EmptyStateProps {
  /** Icon to display */
  icon: LucideIcon;
  /** Main title text */
  title: string;
  /** Descriptive message */
  description: string;
  /** Optional action element (button, link, etc.) */
  action?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * EmptyState component for displaying when no data is available
 * Used for empty lists, no search results, and initial states
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
