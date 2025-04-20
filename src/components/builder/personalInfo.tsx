import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { personalInfoSchema } from "./schemas";
import { BaseFormComponentProps, User } from "@/types";
import { Textarea } from "../ui/textarea";
type PersonalInfoProps = BaseFormComponentProps & {
  user: Pick<User, "fullName" | "address" | "email" |"about">;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  handleSubmit,
  user,
  hasNext,
  hasPrevious,
  onNext,
}) => {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      about: "",
    },
  });
  useEffect(() => {
    form.reset({
      fullName: user.fullName,
      email: user.email,
      address: user.address,
      about:user.about
    });
  }, [user, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof personalInfoSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    handleSubmit({
      fullName: values.fullName,
      address: values.address,
      email: values.email,
      about:values.about
    });
    if (onNext) onNext();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">E-mail</FormLabel>
              <FormControl>
                <Input placeholder="e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">Address</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">About You</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="tell about yourself"
                  {...field}
                  className="h-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-between">
          {hasPrevious && (
            <Button
              className="px-6  bg-sky-600 hover:bg-sky-500 text-white"
              type="button"
            >
              Back
            </Button>
          )}
          {hasNext && (
            <Button
              className="px-6 bg-sky-600 hover:bg-sky-500 text-white"
              type="submit"
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfo;
