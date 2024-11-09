import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createService, UserLogin } from '@/lib/validation';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import { Label } from '../ui/label';
import SubmitButton from '../SubmitButton';
import { faculty2, facultyData } from '@/lib/data';
import { SelectItem } from '../ui/select';

const CreateServiceForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const form = useForm<z.infer<typeof createService>>({
    resolver: zodResolver(createService),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      faculty: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof createService>) => {
    setIsLoading(true);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Xin chào 👋</h1>
          <p className="text-dark-700">
            Bước đầu của sức khỏe tốt hơn – Đặt lịch hẹn ngay hôm nay!
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Tên dịch vụ"
          placeholder=""
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="price"
          label="Giá dịch vụ"
          placeholder=""
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="faculty"
          label="Chọn chuyên khoa"
          placeholder="Select a faculty"
        >
          {faculty2.map((faculty, i) => (
            <SelectItem key={faculty.name + i} value={faculty.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{faculty.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Thông tin chi tiết"
        />
        <SubmitButton isLoading={isLoading}>Tạo</SubmitButton>
      </form>
    </Form>
  );
};

export default CreateServiceForm;
