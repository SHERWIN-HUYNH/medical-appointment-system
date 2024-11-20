import React from 'react'
import { Input } from './ui/input'

type TableSearchProps = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const TableSearch = ({ searchTerm, setSearchTerm }: TableSearchProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="flex w-full max-w-sm items-center">
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-230 rounded-full bg-transparent border-slate-300 shadow-inner shadow-slate-100"
        customProp={''}
      />
    </div>
  )
}

export default TableSearch
