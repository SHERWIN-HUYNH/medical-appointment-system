"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  id: string;
  name: string;
}

interface SelectGroupProps {
  label: string;
  options: Option[];
  fieldName: string;
}

const SelectGroup: React.FC<SelectGroupProps> = ({ label, options = [], fieldName }) => {
  const { register } = useFormContext();
  
  return (
    <div className="mb-1 h-10">
      <label className="mb-2.5 block text-md font-semibold text-primary">{label}</label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          {...register(fieldName)}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >
          <option value="" disabled className="text-slate-500 dark:text-bodydark">
            Chọn <span className="lowercase">{label}</span>
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id} className="text-body dark:text-bodydark">
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectGroup;
