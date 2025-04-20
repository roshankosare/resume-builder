import React, { useState } from "react";
import { Button } from "../ui/button";
import { BaseFormComponentProps, Skill, User } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsSchema } from "./schemas";
import { Input } from "../ui/input";

type SkillsInfoProps = BaseFormComponentProps & {
  user: Pick<User, "skills">;
};
const SkillsInfo: React.FC<SkillsInfoProps> = ({
  handleSubmit,
  hasNext,
  hasPrevious,
  onPrevious,
  onNext,
  user,
}) => {
  const [skills, setSkills] = useState<Skill[]>(user.skills);

  const form = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skill: "",
    },
  });
  // 2. Submit handler
  const onSubmit = async (values: z.infer<typeof skillsSchema>) => {
    onAdd(values.skill);
    form.reset();
    // handleSubmit({ skills: skills });
    // if (onNext) onNext();
  };
  const saveSkills = () => {
    handleSubmit({
      skills: skills,
    });
    if (onNext) onNext();
  };

  const onDelete = (id: number) => {
    setSkills((value) => value.filter((v) => v.id !== id));
  };
  const onAdd = (skill: string) => {
    setSkills((value) => [
      ...value,
      {
        id: Date.now(),
        value: skill,
      },
    ]);
  };
  return (
    <div className="flex flex-col h-auto gap-y-8">
      <div className="grid grid-cols-4 gap-y-4 gap-x-4">
        {skills.map((value) => (
          <div
            key={value.id}
            className="px-4 py-2 flex flex-row gap-x-2   border bg-gray-100 border-gray-400  text-sm rounded-2xl  justify-center items-center"
          >
            <p className="text-sm text-gray-700">{value.value}</p>
            <button
              className="px-0 py-0 bg-transparent border-none hover:border rounded-full "
              onClick={() => onDelete(value.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem className="gap-y-4">
                <FormLabel className="text-gray-600">Skill</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="px-6" type="submit">
            Add
          </Button>
        </form>
        <div className="flex w-full justify-between">
          {hasPrevious && (
            <Button
              className="px-6  bg-sky-600 hover:bg-sky-500 text-white"
              type="button"
              onClick={() => onPrevious && onPrevious()}
            >
              Back
            </Button>
          )}
          {hasNext && (
            <Button
              className="px-6 bg-sky-600 hover:bg-sky-500 text-white"
              onClick={() => saveSkills()}
            >
              Next
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default SkillsInfo;
