'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Select } from './select';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      totalItems,
      pageSize,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 25, 50],
      className,
    },
    ref
  ) => {
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onPageSizeChange(parseInt(e.target.value, 10));
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'flex flex-col sm:flex-row items-center justify-between gap-4 px-2',
          className
        )}
      >
        {/* Items per page selector */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show</span>
          <div className="w-20">
            <Select
              value={String(pageSize)}
              onChange={handlePageSizeChange}
              options={pageSizeOptions.map((size) => ({
                value: String(size),
                label: String(size),
              }))}
              size="sm"
              aria-label="Items per page"
            />
          </div>
          <span>per page</span>
        </div>

        {/* Page info and navigation */}
        <div className="flex items-center gap-4">
          {/* Items range display */}
          <span className="text-sm text-gray-600">
            {totalItems === 0
              ? 'No items'
              : `${startItem}-${endItem} of ${totalItems}`}
          </span>

          {/* Navigation buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
            </Button>

            {/* Page number display */}
            <span className="px-3 text-sm text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
