import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Education } from "@/types";
import { useEffect, forwardRef, useImperativeHandle } from "react";
import { z } from "zod";
import { educationInfoSchema } from "./schemas";

export type EducationFormRef = {
  validate: () => Promise<boolean>;
  getValues: () => z.infer<typeof educationInfoSchema>;
};
type EducationFormProps = {
  onSubmit: () => void;
  education: Education;
};
const EducationForm = forwardRef<EducationFormRef, EducationFormProps>(
  ({ education }, ref) => {
    const form = useForm<z.infer<typeof educationInfoSchema>>({
      resolver: zodResolver(educationInfoSchema),
      defaultValues: {
        collage: "",
        qualification: "",
        course: "",
        fromDate: "",
        toDate: "",
      },
    });

    useEffect(() => {
      form.reset({ ...education });
    }, [education,form]);

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const isValid = await form.trigger();
        return isValid;
      },
      getValues: () => form.getValues(),
    }));

    return (
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="collage"
            render={({ field }) => (
              <FormItem className="gap-y-4">
                <FormLabel className="text-gray-600">
                  Collage / University
                </FormLabel>
                <FormControl>
                  <Input placeholder="collage/university name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qualification"
            render={({ field }) => (
              <FormItem className="gap-y-4">
                <FormLabel className="text-gray-600">Qualification</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. B.E. / B.Tech" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem className="gap-y-4">
                <FormLabel className="text-gray-600">Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. computer science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="fromDate"
              render={({ field }) => (
                <FormItem className="gap-y-4">
                  <FormLabel className="text-gray-600">From </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="course start date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toDate"
              render={({ field }) => (
                <FormItem className="gap-y-4">
                  <FormLabel className="text-gray-600">To</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="course end date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    );
  }
);

export default EducationForm;
