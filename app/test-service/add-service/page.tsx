'use client';
import CreateServiceForm from '@/components/forms/CreateServiceForm';
import DefaultLayout from '@/components/Layouts/defaultLayout';
import SelectGroup from '@/components/SelectGroup';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { academicTitles, facultyData } from '@/lib/data';
import { ChangeEvent, useState } from 'react';

const AddService = () => {
  const [price, setPrice] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPrice(formatPrice(e.target.value));
    console.log(price);
  };
  return (
    <DefaultLayout>
      <div>
        <section className="sub-container max-w-[496px]">
          <CreateServiceForm />
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AddService;
