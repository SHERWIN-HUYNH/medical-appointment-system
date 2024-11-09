'use client';

import DefaultLayout from '@/components/Layouts/defaultLayout';
import { FacultyFormValidation } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import { Form } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

const AddFaculty = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [searchIcon, setSearchIcon] = useState('');
  const [iconResults, setIconResults] = useState<string[]>([]);

  // Khởi tạo form với validation schema và giá trị mặc định
  const form = useForm<z.infer<typeof FacultyFormValidation>>({
    resolver: zodResolver(FacultyFormValidation),
    defaultValues: {
      name: '',
      description: '',
      image: '',
    },
  });

  // Xử lý khi submit form
  const onSubmit = async (values: z.infer<typeof FacultyFormValidation>) => {
    setLoading(true);
    // Gửi request API để tạo chuyên khoa mới
    const response = await fetch(`/api/faculty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    // Xử lý response từ server
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || 'Không thể thêm chuyên khoa');
      setLoading(false);
      return;
    }

    // Xử lý khi tạo thành công
    await response.json();
    toast.success('Thêm chuyên khoa thành công!');
    form.reset();
    setLoading(false);
  };

  // Cập nhật hàm handleIconSelect
  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    setSearchIcon(iconName); // Cập nhật giá trị trong input
    form.setValue('image', iconName); // Cập nhật giá trị trong form
    form.clearErrors('image'); // Xóa lỗi khi đã chọn icon
  };

  // Cập nhật hàm xử lý thay đổi input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchIcon(value);
    if (value) {
      form.setValue('image', value);
      form.clearErrors('image');
    }
  };

  // Thêm hàm search icon từ API Iconify
  useEffect(() => {
    const searchIcons = async () => {
      if (searchIcon.length < 2) {
        setIconResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.iconify.design/search?query=${searchIcon}&limit=100`,
        );
        const data = await response.json();
        setIconResults(data.icons || []);
      } catch (error) {
        console.error('Error searching icons:', error);
        setIconResults([]);
      }
    };

    const debounce = setTimeout(() => {
      searchIcons();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchIcon]);

  // Render giao diện form
  return (
    <DefaultLayout>
      {/* Container chính */}
      <div className="rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
        {/* Nút quay lại */}
        <Button
          onClick={() => router.push('/test-faculty')}
          variant="ghost"
          className="flex items-center gap-2 hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft size={16} />
          Quay lại
        </Button>
        {/* Phần tiêu đề */}
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Thêm chuyên khoa</h3>
        </div>

        {/* Form thêm chuyên khoa */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {/* Trường nhập tên chuyên khoa */}
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Chuyên khoa"
                  placeholder="Nhập tên chuyên khoa"
                />
              </div>

              {/* Trường nhập mô tả */}
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="description"
                  label="Mô tả"
                  placeholder="Nhập mô tả chuyên khoa"
                />
              </div>

              {/* Thêm phần tìm kiếm và chọn icon */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Icon cho chuyên khoa
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={searchIcon}
                    onChange={handleSearchChange}
                    placeholder="Tìm icon (ví dụ: doctor, medical, heart...)"
                    className={`w-full rounded border-[1.5px] bg-transparent px-5 py-3 dark:border-strokedark`}
                  />
                  {selectedIcon && (
                    <div className="flex items-center gap-2">
                      <Icon icon={selectedIcon} width="24" height="24" />
                    </div>
                  )}
                </div>

                {/* Chỉ hiển thị lỗi khi không có giá trị trong input */}
                {form.formState.errors.image && !searchIcon && (
                  <span className="text-red-700 text-sm mt-1">
                    {form.formState.errors.image.message}
                  </span>
                )}

                {/* Hiển thị kết quả tìm kiếm icon */}
                {iconResults.length > 0 && (
                  <div className="mt-2 grid grid-cols-8 gap-2 p-2 border rounded max-h-[300px] overflow-y-auto">
                    {iconResults.map((icon) => (
                      <div
                        key={icon}
                        onClick={() => handleIconSelect(icon)}
                        className={`p-2 cursor-pointer hover:bg-gray-100 rounded flex items-center justify-center ${
                          selectedIcon === icon ? 'bg-primary/20' : ''
                        }`}
                      >
                        <Icon icon={icon} width="24" height="24" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Nút submit form */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  {loading ? 'Đang lưu...' : 'Lưu'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default AddFaculty;
