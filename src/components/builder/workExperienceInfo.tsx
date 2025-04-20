import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { BaseFormComponentProps, User, WorkExperience } from "@/types";
type WorkExperienceInfoProps = BaseFormComponentProps & {
  user: Pick<User, "workExperience">;
};
import { PlusIcon, Trash2Icon } from "lucide-react";
import WorkExperienceForm, {
  WorkExperienceFormRef,
} from "./workExperienceForm";

const WorkExperienceInfo: React.FC<WorkExperienceInfoProps> = ({
  handleSubmit,
  hasNext,
  hasPrevious,
  onPrevious,
  onNext,
  user,
}) => {
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(
    user.workExperience
  );
  // 2. Define a submit handler.
  const formRefs = useRef<
    Record<number, React.RefObject<WorkExperienceFormRef | null>>
  >({});

  // 2. Submit handler
  const onSubmit = async () => {
    const results: WorkExperience[] = [];

    for (const wrk of workExperience) {
      const ref = formRefs.current[wrk.id];
      if (ref && ref.current) {
        const valid = await ref.current.validate();

        if (!valid) return; // Stop if any form is invalid
        results.push({
          ...wrk,
          ...ref.current.getValues(),
        });
      }
    }

    handleSubmit({ workExperience: results });
    if (onNext) onNext();
  };

  const onDelete = (id: number) => {
    if (workExperience.length > 1)
      setWorkExperience((value) => value.filter((v) => v.id !== id));
  };
  const onAdd = () => {
    setWorkExperience((value) => [
      ...value,
      {
        id: Date.now(),
        company: "",
        role: "",
        fromDate: "",
        toDate: "",
        periodType: "year" as "year" | "month",
        value: 1,
        description:""
      },
    ]);
  };
  return (
    <div className="flex flex-col gap-y-8">
      {user &&
        workExperience.map((workExp, index) => {
          if (!formRefs.current[workExp.id]) {
            formRefs.current[workExp.id] =
              React.createRef<WorkExperienceFormRef>();
          }
          return (
            <div className="flex flex-col gap-y-4" key={workExp.id}>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">
                  Work Experience{index + 1}
                </p>
                <Button
                  variant={"outline"}
                  className="px-0 py-0"
                  onClick={() => onDelete(workExp.id)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
              <WorkExperienceForm
                ref={formRefs.current[workExp.id]}
                workExp={workExp}
                onSubmit={() => {}}
              />
            </div>
          );
        })}
      <div className=" flex gap-x-4 items-center">
        <Button
          variant={"outline"}
          className="px-0 py-0 rounded-full"
          onClick={() => onAdd()}
        >
          <PlusIcon className="w-3 h-3" />
        </Button>
        <p className="text-sm text-center">Add Work Experience</p>
      </div>
      <div className="flex w-full justify-between">
        {hasPrevious && (
          <Button
            onClick={() => onPrevious && onPrevious()}
            type="button"
            className="px-6  bg-sky-600 hover:bg-sky-500 text-white"
          >
            Back
          </Button>
        )}
        {hasNext && (
          <Button
            className="px-6 bg-sky-600 hover:bg-sky-500 text-white"
            onClick={() => onSubmit()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkExperienceInfo;
