import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useMemo, useState } from 'react';

const TableElectricVehicle = ({
  data,
  columns,
  selectedRows,
  setSelectedRows,
  onRequestDelete,
  onEdit,
}) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const toggleAllRowsSelected = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((row) => row.id)));
    }
  };

  const toggleRowSelected = (rowId) => {
    const newSelectedRows = new Set(selectedRows);
    if (selectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);
  };

  const updateSorting = (columnId) => {
    setSorting((old) => {
      old = old || [];

      if (
        columnId === 'selection' ||
        columnId === 'actions' ||
        old === undefined
      ) {
        return;
      }

      // Find if the column is already being sorted
      let existingSort = false;
      try {
        existingSort = old.find((d) => d.id === columnId);
      } catch (e) {
        console.log(old);
        console.error(e);
      }

      if (existingSort) {
        if (existingSort.desc) {
          // If it's descending, remove the sort
          return old.filter((d) => d.id !== columnId);
        } else {
          // If it's ascending, switch to descending
          return old.map((d) => {
            if (d.id === columnId) {
              return { ...d, desc: true };
            }
            return d;
          });
        }
      } else {
        // If it's not being sorted, add as ascending
        return [...old, { id: columnId, desc: false }];
      }
    });
  };

  const enhancedColumns = useMemo(
    () => [
      {
        header: () => (
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={selectedRows.size === data.length}
            onChange={toggleAllRowsSelected}
          />
        ),
        id: 'selection',
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={selectedRows.has(row.original.id)}
            onChange={() => toggleRowSelected(row.original.id)}
          />
        ),
        disableFilters: true, // Disable filtering for this column
        disableSortBy: true, // Disable sorting for this column
      },
      ...columns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex flex-row flex-grow justify-around">
            <button className="mx-2" onClick={() => onEdit(row.original)}>
              <FaEdit size={20} />
            </button>
            <button
              className="mx-2"
              onClick={() => onRequestDelete(row.original.id)}
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    [columns, selectedRows, data.length, onEdit, onRequestDelete]
  );

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <div className="flex items-center justify-between p-2 md:hidden">
        <div className="flex gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="First page"
          >
            <FiChevronsLeft />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="Previous page"
          >
            <FiChevronLeft />
          </button>
        </div>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="Next page"
          >
            <FiChevronRight />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="Last page"
          >
            <FiChevronsRight />
          </button>
        </div>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border dark:border-gray-700 p-2 text-left align-middle bg-gray-100 dark:bg-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => updateSorting(header.id)}
                >
                  <div className="flex items-center justify-between">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? (
                        <FiArrowDown />
                      ) : (
                        <FiArrowUp />
                      )
                    ) : (
                      <span className="inline-block w-4 h-4"></span> // Empty space for alignment
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel() &&
          table.getRowModel().rows &&
          table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border dark:border-gray-700 p-2 text-left align-middle"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="100%" className="text-center p-2">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between p-2">
        <div className="flex gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="First page"
          >
            <FiChevronsLeft />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="Previous page"
          >
            <FiChevronLeft />
          </button>
        </div>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="Next page"
          >
            <FiChevronRight />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            aria-label="Last page"
          >
            <FiChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableElectricVehicle;
