import { Resume, User } from "@/types";
import { create } from "zustand";

type ResumeStore = {
  resumes: Resume[];
  setResume: (data: Resume[]) => void;
  addResume: (data: Resume) => void;
  deleteResume: (id: number) => void;
  updateResume: (id: number, data: Partial<User>) => void;
};

export const resumeStore = create<ResumeStore>((set) => ({
  resumes: [],
  setResume: (data: Resume[]) =>
    set({
      resumes: data,
    }),
  addResume: (data: Resume) =>
    set((state) => ({
      resumes: [
        ...state.resumes,
        {
          id: Date.now(),
          data: {
            ...data.data,
          },
        },
      ],
    })),
  deleteResume: (id: number) =>
    set((state) => {
      const result = state.resumes.filter((r) => r.id !== id);
      return {
        resumes: [...result],
      };
    }),
  updateResume: (id: number, data: Partial<User>) =>
    set((state) => {
      const result = state.resumes.map((r) =>
        r.id === id ? { ...r, data: { ...r.data, ...data } } : r
      );
      return {
        resumes: [...result],
      };
    }),
}));
