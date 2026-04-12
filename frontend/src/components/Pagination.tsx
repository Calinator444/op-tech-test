import React from 'react';
import clsx from 'clsx';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface PaginationContainerProps {
  children: React.ReactNode;
}

export function PaginationContainer({ children }: PaginationContainerProps) {
  return <div className="pagination-container">{children}</div>;
}

interface PaginationSelectorProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

export function PaginationSelector({ value, options, onChange }: PaginationSelectorProps) {
  return (
    <div className="pagination-selector">
      Page Size:
      <select className="select" value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

interface PaginationGroupProps {
  children: React.ReactNode;
}

export function PaginationGroup({ children }: PaginationGroupProps) {
  return <div className="pagination">{children}</div>;
}

type PaginationVariant = 'selected' | 'ghost';

interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?: PaginationVariant;
  children: React.ReactNode;
}

export function PaginationButton({ onClick, className, disabled, variant = 'ghost', children }: PaginationButtonProps) {

  return (
    <button
      className={clsx('pagination-button', variant, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface PaginationNavProps {
  onClick: () => void;
  disabled?: boolean;
}

export function PaginationEnd({ onClick, disabled }: PaginationNavProps) {
  return (
    <PaginationButton onClick={onClick} disabled={disabled} className="end">
      <MdKeyboardDoubleArrowRight />
    </PaginationButton>
  );
}

export function PaginationStart({ onClick, disabled }: PaginationNavProps) {
  return (
    <PaginationButton onClick={onClick} disabled={disabled} className="end">
      <MdKeyboardDoubleArrowLeft />
    </PaginationButton>
  );
}

export function PaginationNext({ onClick, disabled }: PaginationNavProps) {
  return (
    <PaginationButton onClick={onClick} disabled={disabled} className="end">
      <MdOutlineKeyboardArrowRight />
    </PaginationButton>
  );
}

export function PaginationPrevious({ onClick, disabled }: PaginationNavProps) {
  return (
    <PaginationButton onClick={onClick} disabled={disabled} className="end">
      <MdOutlineKeyboardArrowLeft />
    </PaginationButton>
  );
}
