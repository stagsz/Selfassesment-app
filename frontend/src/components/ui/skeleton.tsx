'use client';

import { clsx } from 'clsx';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant for the skeleton */
  variant?: 'rectangular' | 'circular' | 'text';
  /** Width of the skeleton (can be number for pixels or string for other units) */
  width?: number | string;
  /** Height of the skeleton (can be number for pixels or string for other units) */
  height?: number | string;
}

function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200',
        {
          'rounded-md': variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'rounded h-4': variant === 'text',
        },
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}

/** Skeleton for a card stat display */
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white shadow-sm p-6',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} height={32} />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <Skeleton variant="text" width={100} className="mt-4" />
    </div>
  );
}

/** Skeleton for chart sections */
function SkeletonChart({ className, height = 280 }: { className?: string; height?: number }) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        className
      )}
    >
      <div className="p-6 pb-0">
        <Skeleton variant="text" width={180} height={24} />
      </div>
      <div className="p-6">
        <Skeleton variant="rectangular" height={height} className="w-full" />
      </div>
    </div>
  );
}

/** Skeleton for grid items (assessment status breakdown) */
function SkeletonStatusGrid({ count = 5 }: { count?: number }) {
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="p-6 pb-0">
        <Skeleton variant="text" width={160} height={24} />
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg flex flex-col items-center">
              <Skeleton variant="text" width={40} height={28} className="mb-2" />
              <Skeleton variant="text" width={60} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonChart, SkeletonStatusGrid };
