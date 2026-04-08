import { Stakeholder } from '../types/stakeholder';

import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from '@tanstack/react-table';

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
  const table = useReactTable({
    data: stakeholders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  

  return (
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
  );
}
