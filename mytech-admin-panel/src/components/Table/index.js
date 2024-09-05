"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { exportData } from "../../utils/function";
import CalendarAndFiltersModal from "../Calendar";
import CommonTabs from "../Product/ProductTabs";
import Image from "next/image";

const CommonTable = ({
  data,
  columns,
  isExportData,
  productData,
  handleTabChange,
  setIsOpenAddProduct
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const columnsWithSelection = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="w-5 h-5 border rounded-md"
            {...{
              checked: table?.getIsAllRowsSelected(),
              onChange: table?.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="w-5 h-5 rounded-md"
            {...{
              checked: row.getIsSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
        size: 20,
      },
      ...columns,
    ],
    [columns]
  );
  
  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    if (isExportData && table) {
      exportData(table);
    }
  }, [isExportData]);

  const pageNumbers = useMemo(() => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageLimit = 5;

    let startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    let endPage = Math.min(startPage + pageLimit - 1, totalPages);

    if (endPage - startPage + 1 < pageLimit) {
      startPage = Math.max(endPage - pageLimit + 1, 1);
    }

    return {
      startPage,
      endPage,
      totalPages,
      currentPage,
    };
  }, [table]);

  return (
    <div className="pb-8 table-container">
      <div className="flex flex-col gap-3 py-6 lg:gap-0 md:flex-row md:justify-between">
        <div>
          <CommonTabs data={productData} onTabChange={handleTabChange} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative mb-4">
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 pl-8 border border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 flex items-center pointer-events-none left-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0 1 14 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <CalendarAndFiltersModal />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-fixed">
          <thead>
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 shadow-md">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left bg-white text-black-500 cursor-pointer h-[60px] border-b-[2px] border-transparent"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {<div className="flex items-center gap-2">
                      {flexRender(
                        header?.column?.columnDef?.header,
                        header?.getContext()
                      )}
                      {header.column.getIsSorted() === "asc"  && header.id !== "select" ? (
                        <svg
                          className="w-4 h-4 transition-transform transform rotate-180"
                          fill="#A3A9B6"
                          stroke="#A3A9B6"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      ) : header.column.getIsSorted() === "desc" && header.id !== "select"  ? (
                        <svg
                          className="w-4 h-4 transition-transform transform rotate-360"
                          fill="#A3A9B6"
                          stroke="#A3A9B6"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      ) : (
                        header.id !== "select"  &&<svg
                          className="w-4 h-4 transition-transform transform rotate-360"
                          fill="#A3A9B6"
                          stroke="#A3A9B6"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </div>}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`h-[60px] hover:bg-gray-25 border-b-[1px] border-[#EAF8FF] ${
                  row.getIsSelected() ? "bg-[#F9F9FC]" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-4 space-x-2 pagination-controls">
        <button
          className={`px-4 py-2 text-cyan-600 bg-cyan-50 rounded-md ${
            table.getState().pagination.pageIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() =>
            table.setPageIndex(table.getState().pagination.pageIndex - 1)
          }
          disabled={table.getState().pagination.pageIndex === 0}
        >
          <Image
            src="svg/left-arrow.svg"
            alt="left-arrow"
            width={10}
            height={10}
          />
        </button>

        {pageNumbers.startPage > 1 && <span className="px-2 py-1">...</span>}

        {Array.from(
          { length: pageNumbers.endPage - pageNumbers.startPage + 1 },
          (_, i) => pageNumbers.startPage + i
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-4 py-2 rounded-md ${
              table.getState().pagination.pageIndex + 1 === pageNumber
                ? "bg-cyan-600 text-white"
                : "bg-cyan-50 text-cyan-600"
            }`}
            onClick={() => table.setPageIndex(pageNumber - 1)}
          >
            {pageNumber}
          </button>
        ))}

        <>
          {pageNumbers.endPage < pageNumbers.totalPages && (
            <span className="px-2 py-1">...</span>
          )}
          <button
            className={`px-4 py-2 text-gray-700 bg-cyan-50 rounded-md ${
              table.getState().pagination.pageIndex ===
              pageNumbers.totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
            }
            disabled={
              table.getState().pagination.pageIndex ===
              pageNumbers.totalPages - 1
            }
          >
            <Image
              src="svg/right-arrow.svg"
              alt="right-arrow"
              width={10}
              height={10}
            />
          </button>
        </>
      </div>
    </div>
  );
};

export default CommonTable;
