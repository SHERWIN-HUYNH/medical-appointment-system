"use client";

import DefaultLayout from "@/components/Layouts/defaultLayout";
import { FacultyFormValidation } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AddFaculty = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Khởi tạo form với validation schema và giá trị mặc định
  const form = useForm<z.infer<typeof FacultyFormValidation>>({
    resolver: zodResolver(FacultyFormValidation),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Xử lý khi submit form
  const onSubmit = async (values: z.infer<typeof FacultyFormValidation>) => {
    setLoading(true);
    // Gửi request API để tạo chuyên khoa mới
    const response = await fetch(`/api/faculty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    // Xử lý response từ server
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Không thể thêm chuyên khoa");
      setLoading(false);
      return;
    }

    // Xử lý khi tạo thành công
    await response.json();
    toast.success("Thêm chuyên khoa thành công!");
    form.reset();
    setLoading(false);
  };

  // Render giao diện form
  return (
    <DefaultLayout>
      {/* Container chính */}
      <div className="rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
        {/* Nút quay lại */}
        <Button
          onClick={() => router.push("/test-faculty")}
          variant="ghost"
          className="flex items-center gap-2 hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft size={16} />
          Quay lại
        </Button>
        {/* Phần tiêu đề */}
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Thêm chuyên khoa
          </h3>
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
              {/* Nút submit form */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  {loading ? "Đang lưu..." : "Lưu"}
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
