import React from "react";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
  //   data: any[];
  //   renderRow: (item: any) => React.ReactNode;
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-center text-sm text-slate-600">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
