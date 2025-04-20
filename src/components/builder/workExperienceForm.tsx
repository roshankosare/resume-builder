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
import { WorkExperience } from "@/types";
import { useEffect, forwardRef, useImperativeHandle } from "react";
import { z } from "zod";
import { workExperienceSchema } from "./schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export type WorkExperienceFormRef = {
  validate: () => Promise<boolean>;
  getValues: () => z.infer<typeof workExperienceSchema>;
};
type WorkExperienceFormProps = {
  onSubmit: () => void;
  workExp: WorkExperience;
};
const WorkExperienceForm = forwardRef<
  WorkExperienceFormRef,
  WorkExperienceFormProps
>(({ workExp }, ref) => {
  const form = useForm<z.infer<typeof workExperienceSchema>>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {},
  });

  useEffect(() => {
    form.reset({ ...workExp });
  }, [workExp, form]);

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
          name="company"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">
                Organization / Company Name
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g. microsoft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">Role</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg. product manager"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">Describe Job</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="tell about the job "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="gap-y-4">
                <FormLabel className="text-gray-600">Period</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g. computer science"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="periodType"
            render={({ field }) => (
              <FormItem className="gap-y-4">
                <FormLabel className="text-gray-600">Month / Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
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
                  <Input type="date" placeholder="course end date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
});

export default WorkExperienceForm;
