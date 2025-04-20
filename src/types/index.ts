export type BaseFormComponentProps = {
  hasNext?: boolean;
  hasPrevious?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  handleSubmit: (user: Partial<User>) => void;
};

export type Education = {
  id: number;
  collage: string;
  qualification: string;
  course: string;
  fromDate: string;
  toDate: string;
};

export type WorkExperience = {
  id: number;
  company: string;
  role: string;
  value: number;
  fromDate: string;
  toDate: string;
  periodType: "month" | "year";
  description: string;
};

export type Skill = {
  id: number;
  value: string;
};

export type OtherSectionField = {
  id: number;
  fieldTitle: string;
  description: string;
};

export type OtherSection = {
  id: number;
  sectionTitle: string;
  fields: OtherSectionField[];
};

export type User = {
  fullName: string;
  email: string;
  address: string;
  about: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  otherSections: OtherSection[];
};
