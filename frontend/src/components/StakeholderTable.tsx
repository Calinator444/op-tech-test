import React from 'react';
import { Stakeholder } from '../types/stakeholder';
import clsx from 'clsx';
import { useReactTable, getCoreRowModel, createColumnHelper, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


interface Props {
  stakeholders: Stakeholder[];
}

const columnHelper = createColumnHelper<Stakeholder>();

const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("role", {
    header: "Role",
  }),
  columnHelper.accessor("organisation", {
    header: "Organisation",
  }),
  columnHelper.accessor("title", {
    header: "Title",
  
    cell: (info) => info.getValue() || "-"
  }),
];

export function StakeholderTable({ stakeholders }: Props) {
  if (stakeholders.length === 0) {
    return <p className="empty-message">No stakeholders found.</p>;
  }



  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  })
  
  const table = useReactTable({
    data: stakeholders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const totalPages = table.getPageCount();
  const current = pagination.pageIndex;
  const start = Math.min(
    Math.max(current - 1, 0),
    Math.max(totalPages - 3, 0)
  );
  const visiblePages = Array.from({ length: Math.min(3, totalPages) }, (_, i) => start + i + 1);


  return (
    <>
    <table className="stakeholder-table">
      <thead>
        <tr>
        {table.getFlatHeaders().map(header => <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>)}
        </tr>
      </thead>
      <tbody>

        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))} 
      </tbody>
    </table>
    <div className='pagination-container'>

    <div className='pagination-selector'>
      Page Size:
      <select className='select' value={pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
        <option>
          5
        </option>
        <option>
          10
        </option>
        <option>
          25
        </option>
      </select>
    </div>

      <div className='pagination'>
        <button className='pagination-button end' onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button className='pagination-button end' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <MdKeyboardArrowLeft />
        </button>
        {
          visiblePages.map(page => (
            <button className={clsx('pagination-button ', pagination.pageIndex === page - 1 ? "selected" : "ghost" )} key={page} onClick={() => table.setPageIndex(page - 1)} disabled={pagination.pageIndex === page - 1}>
              {page}
            </button>
          ))
        }     
        <button className='pagination-button end' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <MdKeyboardArrowRight />  
        </button>
        <button className='pagination-button end' onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
    </>
  );
}
