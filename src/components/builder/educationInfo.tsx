import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { BaseFormComponentProps, Education, User } from "@/types";
type EducationInfoProps = BaseFormComponentProps & {
  user: Pick<User, "education">;
};
import { PlusIcon, Trash2Icon } from "lucide-react";
import EducationForm, { EducationFormRef } from "./educationForm";

const EducationInfo: React.FC<EducationInfoProps> = ({
  handleSubmit,
  hasNext,
  hasPrevious,
  onPrevious,
  onNext,
  user,
}) => {
  const [education, setEducation] = useState<Education[]>(user.education);
  // 2. Define a submit handler.
  const formRefs = useRef<
    Record<number, React.RefObject<EducationFormRef | null>>
  >({});

  // 2. Submit handler
  const onSubmit = async () => {
    const results: Education[] = [];

    for (const edu of education) {
      const ref = formRefs.current[edu.id];
      if (ref && ref.current) {
        const valid = await ref.current.validate();

        if (!valid) return; // Stop if any form is invalid
        results.push({
          ...edu,
          ...ref.current.getValues(),
        });
      }
    }

    handleSubmit({ education: results });
    if (onNext) onNext();
  };

  const onDeleteEducation = (id: number) => {
    if (education.length > 1)
      setEducation((value) => value.filter((v) => v.id !== id));
  };
  const onAddEducation = () => {
    setEducation((value) => [
      ...value,
      {
        id: Date.now(),
        collage: "",
        course: "",
        qualification: "",
        fromDate: "",
        toDate: "",
      },
    ]);
  };
  return (
    <div className="flex flex-col gap-y-8">
      {user &&
        education.map((education, index) => {
          if (!formRefs.current[education.id]) {
            formRefs.current[education.id] =
              React.createRef<EducationFormRef>();
          }
          return (
            <div className="flex flex-col gap-y-4" key={education.id}>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">Education{index + 1}</p>
                <Button
                  variant={"outline"}
                  className="px-0 py-0"
                  onClick={() => onDeleteEducation(education.id)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
              <EducationForm
                ref={formRefs.current[education.id]}
                key={education.id}
                education={education}
                onSubmit={() => {}}
              />
            </div>
          );
        })}
      <div className=" flex gap-x-4 items-center">
        <Button
          variant={"outline"}
          className="px-0 py-0 rounded-full"
          onClick={() => onAddEducation()}
        >
          <PlusIcon className="w-3 h-3" />
        </Button>
        <p className="text-sm text-center">Add Education</p>
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

export default EducationInfo;
