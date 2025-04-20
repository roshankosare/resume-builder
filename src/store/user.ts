import { User } from "@/types";
import { create } from "zustand";

type UserStore = {
  user: User;
  setUser: (user: Partial<User>) => void;
};

export const userStore = create<UserStore>((set) => ({
  user: {
    fullName: "",
    address: "",
    email: "",
    about: "",
    education: [
      {
        id: Date.now(),
        collage: "",
        qualification: "",
        course: "",
        fromDate: "",
        toDate: "",
      },
    ],
    workExperience: [],
    skills: [],
    otherSections: [],
  },
  setUser: (user) =>
    set((state) => ({
      user: {
        ...state.user,
        ...user,
      },
    })),
}));
