import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { BaseFormComponentProps, OtherSection, User } from "@/types";
import { PlusIcon, Trash2Icon } from "lucide-react";
import OtherSectionForm, { OtherSectionFormRef } from "./otherSectionForm";
import { useNavigate } from "react-router-dom";
type AddOtherSectionProps = BaseFormComponentProps & {
  user: Pick<User, "otherSections">;
};
const AddOtherSection: React.FC<AddOtherSectionProps> = ({
  handleSubmit,
  hasNext,
  hasPrevious,
  onPrevious,
  onNext,
  user,
  isEdit,
  resumeId,
}) => {
  const [otherSections, setOtherSections] = useState<OtherSection[]>(
    user.otherSections
  );

  const navigate = useNavigate();
  // 2. Define a submit handler.
  const formRefs = useRef<
    Record<number, React.RefObject<OtherSectionFormRef | null>>
  >({});

  // 2. Submit handler
  const onSubmit = async () => {
    const results: OtherSection[] = [];
    for (const sec of otherSections) {
      const ref = formRefs.current[sec.id];
      if (ref && ref.current) {
        const valid = await ref.current.validate();

        if (!valid) return; // Stop if any form is invalid
        const values = ref.current.getValues();
        results.push({
          id: sec.id,
          sectionTitle: values.title,
          fields: values.fields.map((field, idx) => ({
            ...field,
            id: sec.fields[idx]?.id ?? Date.now() + idx, // preserve original ID or generate fallback
          })),
        });
      }
    }

    handleSubmit({ otherSections: results });
    if (isEdit) {
      navigate(`/preview/${resumeId}`);
      return;
    }
    navigate(`/preview`);
    if (onNext && !isEdit) onNext();
  };

  const onDelete = (id: number) => {
    setOtherSections((value) => value.filter((v) => v.id !== id));
  };
  const onAdd = () => {
    setOtherSections((value) => [
      ...value,
      {
        id: Date.now(),
        sectionTitle: "",
        fields: [
          {
            id: Date.now(),
            fieldTitle: "",
            description: "",
          },
        ],
      },
    ]);
  };
  return (
    <div className="flex flex-col gap-y-8">
      {user &&
        otherSections.map((section, index) => {
          if (!formRefs.current[section.id]) {
            formRefs.current[section.id] =
              React.createRef<OtherSectionFormRef>();
          }
          return (
            <div className="flex flex-col gap-y-4" key={section.id}>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">
                  Other Section{index + 1}
                </p>
                <Button
                  variant={"outline"}
                  className="px-0 py-0"
                  onClick={() => onDelete(section.id)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
              <OtherSectionForm
                ref={formRefs.current[section.id]}
                section={section}
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
        <p className="text-sm text-center">Add Other Section</p>
      </div>
      <div className="flex w-full justify-between">
        {isEdit ? (
          <Button
            className="px-6  bg-sky-600 hover:bg-sky-500 text-white"
            type="submit"
            onClick={() => onSubmit()}
          >
            Save
          </Button>
        ) : (
          hasPrevious &&
          !isEdit && (
            <Button
              className="px-6  bg-sky-600 hover:bg-sky-500 text-white"
              type="button"
              onClick={() => onPrevious && onPrevious()}
            >
              Back
            </Button>
          )
        )}
        {hasNext && !isEdit && (
          <Button
            className="px-6 bg-sky-600 hover:bg-sky-500 text-white"
            type="submit"
            onClick={() => onSubmit()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddOtherSection;
