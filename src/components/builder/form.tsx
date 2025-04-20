import { JSX, useState } from "react";
import PersonalInfo from "./personalInfo";
import EducationInfo from "./educationInfo";
import { userStore } from "@/store/user";
import { User } from "@/types";
import WorkExperienceInfo from "./workExperienceInfo";
import SkillsInfo from "./skillsInfo";
import AddOtherSection from "./addOtherSection";

type StepComponentProps = {
  goNext: () => void;
  goPrevious: () => void;
  handleSubmit: (data: Partial<User>) => void;
  userInfo: User;
};

// Store component functions, not JSX
const formList: ((props: StepComponentProps) => JSX.Element)[] = [
  (props) => (
    <PersonalInfo
      handleSubmit={props.handleSubmit}
      user={props.userInfo}
      hasNext={true}
      hasPrevious={false}
      onNext={props.goNext}
    />
  ),
  (props) => (
    <EducationInfo
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
    />
  ),

  (props) => (
    <WorkExperienceInfo
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
    />
  ),
  (props) => (
    <SkillsInfo
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
    />
  ),

  (props) => (
    <AddOtherSection
      handleSubmit={props.handleSubmit}
      onNext={props.goNext}
      hasNext={true}
      hasPrevious={true}
      onPrevious={props.goPrevious}
      user={props.userInfo}
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

const BuilderForm = () => {
  const [stage, setStage] = useState<number>(0);

  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  const goNextStage = () => {
    setStage((prev) => Math.min(prev + 1, formList.length - 1));
  };
  const goPreviousStage = () => {
    setStage((prev) => Math.max(0, prev - 1));
  };

  const CurrentForm = formList[stage];

  return (
    <div className="flex w-full h-auto flex-col gap-y-8 py-8">
      <p className="font-bold text-center text-xl">{formListLabel[stage]}</p>
      <div className="w-full sm:w-[500px] mx-auto">
        {/* Call the component function with props */}
        <CurrentForm
          goNext={goNextStage}
          goPrevious={goPreviousStage}
          handleSubmit={setUser}
          userInfo={user}
        />
      </div>
    </div>
  );
};

export default BuilderForm;
