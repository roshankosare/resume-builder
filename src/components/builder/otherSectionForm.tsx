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
import { OtherSection, OtherSectionField } from "@/types";
import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { z } from "zod";
import { otherSectionFieldSchema, otherSectionSchema } from "./schemas";
import OtherSectionFieldForm, {
  OtherSectionFieldFormRef,
} from "./otherSectionFieldForm";
import { Button } from "../ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";

export type OtherSectionFormRef = {
  validate: () => Promise<boolean>;
  getValues: () => z.infer<typeof otherSectionSchema>;
};
type OtherSectionFormProps = {
  onSubmit: () => void;
  section: OtherSection;
};
const OtherSectionForm = forwardRef<OtherSectionFormRef, OtherSectionFormProps>(
  ({ section }, ref) => {
    const [fieldForms, setFieldForm] = useState<OtherSectionField[]>(
      section.fields
    );
    const formRefs = useRef<
      Record<number, React.RefObject<OtherSectionFieldFormRef | null>>
    >({});
    const onDelete = (id: number) => {
      setFieldForm((value) => value.filter((v) => v.id !== id));
    };
    const onAdd = () => {
      setFieldForm((value) => [
        ...value,
        {
          id: Date.now(),
          fieldTitle: "",
          description: "",
        },
      ]);
    };

    const form = useForm<z.infer<typeof otherSectionSchema>>({
      resolver: zodResolver(otherSectionSchema),
      defaultValues: {},
    });

    useEffect(() => {
      form.reset({ title: section.sectionTitle });
    }, [section, form]);

    useImperativeHandle(ref, () => ({
      validate: async () => {
        const isValid = await form.trigger("title");
        if (!isValid) return false;
        // const allFields: OtherSectionField[] = [];

        for (const field of fieldForms) {
          const fieldRef = formRefs.current[field.id];

          if (fieldRef?.current) {
            const valid = await fieldRef.current.validate();
            if (!valid) return false;

            // allFields.push({
            //   id: field.id,
            //   title:
            //   ...fieldRef.current.getValues(),
            // });
          }
        }

        return true;
      },
      getValues: () => {
        const values = form.getValues();
        const children = fieldForms
          .map((field) => formRefs.current[field.id]?.current?.getValues())
          .filter(
            (child): child is z.infer<typeof otherSectionFieldSchema> => !!child
          );
        return {
          ...values,
          fields: children,
        };
      },
    }));

    return (
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="gap-y-4">
                <FormLabel className="text-gray-600">Title</FormLabel>
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
        </form>

        <div className=" flex gap-x-4 items-center">
          <Button
            variant={"outline"}
            className="px-0 py-0 rounded-full"
            onClick={() => onAdd()}
          >
            <PlusIcon className="w-3 h-3" />
          </Button>
          <p className="text-sm text-center">Add Field</p>
        </div>

        {fieldForms.map((field, index) => {
          if (!formRefs.current[field.id]) {
            formRefs.current[field.id] =
              React.createRef<OtherSectionFieldFormRef>();
          }
          return (
            <div className="flex flex-col gap-y-4" key={field.id}>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">
                  Filed Section{index + 1}
                </p>
                <Button
                  variant={"outline"}
                  className="px-0 py-0"
                  onClick={() => onDelete(field.id)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
              <OtherSectionFieldForm
                ref={formRefs.current[field.id]}
                field={field}
                onSubmit={() => {}}
              />
            </div>
          );
        })}
      </Form>
    );
  }
);

export default OtherSectionForm;
