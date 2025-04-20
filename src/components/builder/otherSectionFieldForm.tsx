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
import { OtherSectionField } from "@/types";
import { useEffect, forwardRef, useImperativeHandle } from "react";
import { z } from "zod";
import { otherSectionFieldSchema } from "./schemas";
import { Textarea } from "../ui/textarea";
export type OtherSectionFieldFormRef = {
  validate: () => Promise<boolean>;
  getValues: () => z.infer<typeof otherSectionFieldSchema>;
};
type OtherSectionFieldFormProps = {
  onSubmit: () => void;
  field: OtherSectionField;
};
const OtherSectionFieldForm = forwardRef<
  OtherSectionFieldFormRef,
  OtherSectionFieldFormProps
>(({ field }, ref) => {
  const form = useForm<z.infer<typeof otherSectionFieldSchema>>({
    resolver: zodResolver(otherSectionFieldSchema),
    defaultValues: {},
  });

  useEffect(() => {
    form.reset({ ...field });
  }, [field, form]);

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
          name="fieldTitle"
          render={({ field }) => (
            <FormItem className="gap-y-4">
              <FormLabel className="text-gray-600">Field Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. project / achievements"
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
              <FormLabel className="text-gray-600">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

OtherSectionFieldForm.displayName = "OtherSectionFieldForm";
export default OtherSectionFieldForm;
