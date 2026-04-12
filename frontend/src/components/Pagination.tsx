import React from 'react';
import clsx from 'clsx';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

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

interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export function PaginationButton({ onClick, disabled, selected, children }: PaginationButtonProps) {
  return (
    <button
      className={clsx('pagination-button', selected ? 'selected' : 'ghost')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface PaginationEndProps {
  onClick: () => void;
  disabled?: boolean;
}

export function PaginationEnd({ onClick, disabled }: PaginationEndProps) {
  return (
    <button className="pagination-button end" onClick={onClick} disabled={disabled}>
          <MdKeyboardDoubleArrowRight />
    </button>
  );
}

export function PaginationNext ({ onClick, disabled }: PaginationEndProps) {
  return (
    <button className="pagination-button end" onClick={onClick} disabled={disabled}>
          <MdOutlineKeyboardArrowRight />
    </button>
  );
}

export function PaginationPrevious ({ onClick, disabled }: PaginationEndProps) {
  return (
    <button className="pagination-button end" onClick={onClick} disabled={disabled}>
          <MdOutlineKeyboardArrowLeft />
    </button>
  );
}

export function PaginationStart({ onClick, disabled }: PaginationEndProps) {
  return (
    <button className="pagination-button end" onClick={onClick} disabled={disabled}>
          <MdKeyboardDoubleArrowLeft />
    </button>
  );
}
