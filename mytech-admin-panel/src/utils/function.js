import {
  flexRender,
} from "@tanstack/react-table";
import { saveAs } from "file-saver";

  
  export const exportData = (table) => {
    const headers = table?.getHeaderGroups()[0].headers.map((header) =>
      header?.column?.columnDef?.header
        ? flexRender(header?.column?.columnDef?.header, header?.getContext())
        : ""
    );

    const rows = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().map((cell) => cell.getValue())
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "table_data.csv");
  };