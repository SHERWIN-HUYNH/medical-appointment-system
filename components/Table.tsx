import React from 'react'

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderRow: (item: any) => React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
}) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu để hiển thị.</p>
  }

  return (
    <table className="w-full mt-4 table-fixed">
      <thead>
        <tr className="text-center text-sm text-slate-600">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">{data.map((item) => renderRow(item))}</tbody>
    </table>
  )
}

export default Table
