'use client';
import DefaultLayout from '@/components/Layouts/defaultLayout';
import SelectGroup from '@/components/SelectGroup';
import SwitcherToggle from '@/components/SwitcherToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { academicTitles } from '@/lib/data';
import { DoctorFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Faculty } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const EditDoctor = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: '',
      image: '',
      academicTitle: '',
      faculty: '',
      description: '',
      isActive: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const fetchFacultyData = async () => {
    const response = await fetch(`/api/faculty`);
    if (response.ok) {
      const data = await response.json();
      setFacultyData(data);
    }
  };

  const getAcademicTitleId = (name: string) => {
    const title = academicTitles.find((title) => title.name === name);
    return title?.id || '';
  };

  const fetchDoctorData = async () => {
    const response = await fetch(`/api/doctor/${id}`);
    if (response.ok) {
      const doctor = await response.json();
      form.reset({
        name: doctor.name,
        image: doctor.image,
        academicTitle: getAcademicTitleId(doctor.academicTitle),
        faculty: doctor.facultyId,
        description: doctor.description,
        isActive: doctor.isActive,
      });
      setImagePreview(doctor.image);
      setIsActive(doctor.isActive);
      setFileName(doctor.image || '');
    }
  };

  useEffect(() => {
    fetchFacultyData();
    if (id) {
      fetchDoctorData();
    }
  }, [id]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast.error('Vui lòng tải lên một tệp hình ảnh');
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Chỉ cho phép tải lên các tệp hình ảnh');
      event.target.value = '';
      return;
    }
    setImageFile(file);
    form.setValue('image', file.name);
    setImagePreview(file.name);
    setFileName(file.name);
  };

  const handleToggle = (value: boolean) => {
    setIsActive(value);
    form.setValue('isActive', value);
  };

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    const academicTitleName =
      academicTitles.find((title) => title.id === values.academicTitle)?.name ||
      values.academicTitle;
    const response = await fetch(`/api/doctor`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctor: { id, ...values, academicTitle: academicTitleName },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Cập nhật thông tin bác sĩ thành công');
      router.push('/test-doctor');
    } else {
      toast.error(data.message || 'Cập nhật thông tin bác sĩ thất bại');
      // Nếu cập nhật thất bại do bác sĩ có lịch hẹn, reset trạng thái
      if (data.message === 'Bác sĩ này đang có cuộc hẹn không thể chuyển trạng thái') {
        setIsActive(true);
        form.setValue('isActive', true);
      }
    }
  };

  return (
    <DefaultLayout>
      <FormProvider {...form}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Sửa thông tin bác sĩ
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="mb-3 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <Label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Họ và tên
                  </Label>
                  <Input
                    type="text"
                    placeholder="Nhập họ tên bác sĩ"
                    {...register('name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <div className="flex flex-col">
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Trạng thái hoạt động
                    </Label>
                    <SwitcherToggle enabled={isActive} onToggle={handleToggle} />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-md border border-stroke p-2 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary pr-[120px]"
                    value={fileName}
                    readOnly
                    placeholder="Chưa có file nào được chọn"
                  />
                  <label
                    htmlFor="file-input"
                    className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-4 bg-[#EEEEEE] rounded-r-md cursor-pointer"
                  >
                    Chọn file
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <img
                    src={`/assets/doctor/${imagePreview}`}
                    alt="Image Preview"
                    className="mt-4 w-30 h-30 object-cover"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                )}
              </div>
              <div className="mb-12 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <SelectGroup
                    label="Học hàm/học vị"
                    options={academicTitles}
                    fieldName="academicTitle"
                  />
                  {errors.academicTitle && (
                    <span className="mt-12 block text-red-500">
                      {errors.academicTitle.message}
                    </span>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <SelectGroup
                    label="Chuyên khoa"
                    options={facultyData}
                    fieldName="faculty"
                  />
                  {errors.faculty && (
                    <span className="mt-12 block text-red-500">
                      {errors.faculty.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mô tả
                </Label>
                <Textarea
                  rows={6}
                  placeholder="Nhập mô tả"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('description')}
                />
                {errors.description && (
                  <span className="mt-2 block text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="flex justify-end">
                <button className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </DefaultLayout>
  );
};

export default EditDoctor;
