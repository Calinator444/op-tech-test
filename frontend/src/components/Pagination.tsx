import React from 'react';
import clsx from 'clsx';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

export function PaginationContainer({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('pagination-container', className)} {...props}>{children}</div>;
}

interface PaginationSelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: number;
  options: number[];
}

export function PaginationSelector({ value, options, className, ...props }: PaginationSelectorProps) {
  return (
    <div className="pagination-selector">
      Page Size:
      <select className={clsx('select', className)} value={value} {...props}>
        {options.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PaginationGroup({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('pagination', className)} {...props}>{children}</div>;
}

type PaginationVariant = 'selected' | 'ghost';

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PaginationVariant;
}

export function PaginationButton({ variant = 'ghost', className, children, ...props }: PaginationButtonProps) {
  return (
    <button
      className={clsx('pagination-button', variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}

type PaginationNavProps = Omit<PaginationButtonProps, 'variant' | 'children'>;

export function PaginationEnd({ className, ...props }: PaginationNavProps) {
  return (
    <PaginationButton className={clsx('end', className)} {...props}>
      <MdKeyboardDoubleArrowRight />
    </PaginationButton>
  );
}

export function PaginationStart({ className, ...props }: PaginationNavProps) {
  return (
    <PaginationButton className={clsx('end', className)} {...props}>
      <MdKeyboardDoubleArrowLeft />
    </PaginationButton>
  );
}

export function PaginationNext({ className, ...props }: PaginationNavProps) {
  return (
    <PaginationButton className={clsx('end', className)} {...props}>
      <MdOutlineKeyboardArrowRight />
    </PaginationButton>
  );
}

export function PaginationPrevious({ className, ...props }: PaginationNavProps) {
  return (
    <PaginationButton className={clsx('end', className)} {...props}>
      <MdOutlineKeyboardArrowLeft />
    </PaginationButton>
  );
}
