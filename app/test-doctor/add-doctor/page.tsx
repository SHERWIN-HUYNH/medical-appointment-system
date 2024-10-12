import DefaultLayout from "@/components/Layouts/defaultLayout";
import SelectGroup from "@/components/SelectGroup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { academicTitles, facultyData } from "@/lib/data";

import React from "react";

const AddDoctor = () => {
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Thêm bác sĩ
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-3 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Họ và tên
                </Label>
                <Input
                  type="text"
                  placeholder="Nhập họ tên bác sĩ"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <div>
                  <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Hình ảnh
                  </Label>
                  <input
                    type="file"
                    className="w-full rounded-md border border-stroke p-2 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <SelectGroup label="học hàm/học vị" options={academicTitles} />
              </div>
              <div className="w-full xl:w-1/2">
                <SelectGroup label="chuyên khoa" options={facultyData} />
              </div>
            </div>

            <div className="mb-3">
              <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mô tả
              </Label>
              <Textarea
                rows={5}
                placeholder="Nhập mô tả"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></Textarea>
            </div>

            <div className="flex justify-end">
              <button className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Thêm
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddDoctor;
