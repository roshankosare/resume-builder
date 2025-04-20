import { z } from "zod";
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter valid Email"),
  address: z.string().min(1, "Address is Required"),
  about: z.string(),
});

export const educationInfoSchema = z.object({
  collage: z.string().min(1, "This cannot be empty"),
  course: z.string().min(1, "This cannot be empty"),
  qualification: z.string().min(1, "This cannot be empty"),
  fromDate: z.string().min(1, "This cannot be empty"),
  toDate: z.string().min(1, "This cannot be empty"),
});

export const workExperienceSchema = z.object({
  company: z.string().min(1, "This cannot be empty"),
  role: z.string().min(1, "This cannot be empty"),
  value: z.coerce.number().min(1, "Must be grater than zero"),
  periodType: z.enum(["month", "year"]),
  fromDate: z.string().min(1, "This cannot be empty"),
  toDate: z.string().min(1, "This cannot be empty"),
  description: z.string(),
});

export const skillsSchema = z.object({
  skill: z.string().min(1, "This cannot be empty"),
});



export const otherSectionFieldSchema = z.object({
  fieldTitle: z.string().min(1, "This cannot be empty"),
  description: z.string(),
});

export const otherSectionSchema = z.object({
  title: z.string().min(1, "This cannot be empty"),
  fields: z.array(otherSectionFieldSchema),
});
