"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UserFormValidation, UserLogin } from "@/lib/validation";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { createUser } from "@/lib/action/patient.actions";
import { toast } from "sonner";
import { PasswordInput } from "../PasswordInput";
import { Label } from "../ui/label";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const form = useForm<z.infer<typeof UserLogin>>({
    resolver: zodResolver(UserLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof UserLogin>) => {
    setIsLoading(true);
    console.log('VALUES  + PASSWORDS',values,currentPassword)
    const res = await signIn("credentials", {
      email: values.email,
      password: currentPassword,
      redirect: false,
    })
    if(res?.error){
      toast.error(res.error)
    }
    if (res?.ok) {
      toast.success("Login successfully");
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="JohnDoe@gmail.com"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="space-y-2 flex-1 mt-2">
            <Label htmlFor="current_password" className="shad-input-label ">Current Password</Label>
            <PasswordInput
              id="current_password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
        </div>
        
        <SubmitButton isLoading={isLoading} >Log In</SubmitButton>
      </form>
    </Form>
  );
};
