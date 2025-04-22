import { JSX, useEffect, useState } from "react";
import PersonalInfo from "./personalInfo";
import EducationInfo from "./educationInfo";
import { userStore } from "@/store/user";
import { User } from "@/types";
import WorkExperienceInfo from "./workExperienceInfo";
import SkillsInfo from "./skillsInfo";
import AddOtherSection from "./addOtherSection";
import { resumeStore } from "@/store/resume";

type StepComponentProps = {
  goNext: () => void;
  goPrevious: () => void;
  handleSubmit: (data: Partial<User>) => void;
  isEdit: boolean;
  userInfo: User;
  resumeId: number;
};

// Store component functions, not JSX
const formList: ((props: StepComponentProps) => JSX.Element)[] = [
  (props) => (
    <PersonalInfo
      isEdit={props.isEdit}
      handleSubmit={props.handleSubmit}
      user={props.userInfo}
      hasNext={true}
      hasPrevious={false}
      onNext={props.goNext}
      resumeId = {props.resumeId}
    />
  ),
  (props) => (
    <EducationInfo
      isEdit={props.isEdit}
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
      resumeId = {props.resumeId}
    />
  ),

  (props) => (
    <WorkExperienceInfo
      isEdit={props.isEdit}
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
      resumeId = {props.resumeId}
    />
  ),
  (props) => (
    <SkillsInfo
      isEdit={props.isEdit}
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
      resumeId = {props.resumeId}
    />
  ),

  (props) => (
    <AddOtherSection
      isEdit={props.isEdit}
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
      resumeId = {props.resumeId}
    />
  ),
];

const formListLabel: string[] = [
  "Personal Details",
  "Education Details",
  "Work Experience",
  "Skills",
  "Other Section",
];

type BuilderFormProps = {
  currentStage: number;
  isEdit: boolean;
  data: User;
  resumeId: number;
};

const BuilderForm: React.FC<BuilderFormProps> = ({
  currentStage,
  isEdit,
  resumeId,
  data,
}) => {
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);

  const [stage, setStage] = useState<number>(currentStage);
  const [loading, setLoading] = useState<boolean>(true);
  const updateResume = resumeStore((state) => state.updateResume);

  const goNextStage = () => {
    setStage((prev) => Math.min(prev + 1, formList.length - 1));
  };
  const goPreviousStage = () => {
    setStage((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = (data: Partial<User>) => {
    setUser({ ...data });
    updateResume(resumeId, data);
  };

  const CurrentForm = formList[stage];

  useEffect(() => {
    if (loading) {
      setUser(data);
      setLoading(false);
    }
  }, [setUser, data, loading]);

  return (
    <>
      {!loading && (
        <div className="flex w-full h-auto flex-col gap-y-8 py-8">
          <p className="font-bold text-center text-xl">
            {formListLabel[stage]}
          </p>
          <div className="w-full sm:w-[500px] mx-auto">
            {/* Call the component function with props */}
            <CurrentForm
              isEdit={isEdit}
              goNext={goNextStage}
              goPrevious={goPreviousStage}
              handleSubmit={handleSubmit}
              userInfo={user}
              resumeId={resumeId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BuilderForm;
