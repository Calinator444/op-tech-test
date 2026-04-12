import React, { useEffect, useMemo } from 'react';
import { Stakeholder } from '../types/stakeholder';
import clsx from 'clsx';
import { useReactTable, getCoreRowModel, createColumnHelper, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'react-toastify';
interface Props {
  stakeholders: Stakeholder[];
}

const columnHelper = createColumnHelper<Stakeholder>();

const columns = [
    columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue() || "-"
  }),
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

];

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 5;
const PAGE_SIZE_OPTIONS = [5, 10, 25];

const queryParamsSchema = z.object({
  totalRecords: z.number(),
  page: z.coerce.number().int().positive().nullable().transform((val) => val ?? DEFAULT_PAGE_INDEX + 1),
  pageSize: z.coerce.number().int().positive().nullable().transform((val) => val ?? DEFAULT_PAGE_SIZE),
})
.refine(({page, pageSize, totalRecords}) => {
  if(!PAGE_SIZE_OPTIONS.includes(pageSize)) {
    return false;
  }
  if(page > Math.ceil(totalRecords / pageSize)) {
    return false;
  }
  return true;
});

export function StakeholderTable({ stakeholders }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  // pagination pulls from query params and falls back to defaults if they're invalid or missing.
  const {pageSize, pageIndex, error} = useMemo(() => {
    const result = queryParamsSchema.safeParse({
      totalRecords: stakeholders.length,
      page: searchParams.get('page'),
      pageSize: searchParams.get('pageSize'),
    });

    if (!result.success) {
      console.log('result', result);
      return { pageIndex: DEFAULT_PAGE_INDEX, pageSize: DEFAULT_PAGE_SIZE, error: true };
    }
    

    return { pageIndex: result.data.page - 1, pageSize: result.data.pageSize, error: result.error };
  }, [searchParams, stakeholders.length]);

  useEffect(()=> {
    if (error) {
      toast.error('Invalid pagination parameters in URL. Resetting to defaults.');
    }
  }, [error]);

  const table = useReactTable({
    data: stakeholders,
    autoResetPageIndex: false,
    columns,
    getCoreRowModel: getCoreRowModel(),
    
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    },

    // Query param based pagination based on this example: https://tanstack.com/table/latest/docs/framework/react/examples/query-router-search-params
    onPaginationChange: (pagination)=> {

      // Account for scenarios where onPaginationChange passes an updater function

      if(typeof pagination === "function")
      {
        const result = pagination({ pageIndex: pageIndex, pageSize:      pageSize });

        setSearchParams({
          page: String(result.pageIndex + 1),
          pageSize: String(result.pageSize),
         });
         return;
      }

      // Account for scenarios where onPaginationChange passes an already updated pagination object
      setSearchParams({
        page: String(pagination.pageIndex + 1),
        pageSize: String(pagination.pageSize),
       });
      
    } ,
  });
  
  if (stakeholders.length === 0) {
    return <p className="empty-message">No stakeholders found.</p>;
  }

  const totalPages = table.getPageCount();

  const { pagination } = table.getState();
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

        {PAGE_SIZE_OPTIONS.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
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
