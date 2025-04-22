import { resumeStore } from "@/store/resume";
import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const resumes = resumeStore((state) => state.resumes);
  const setResume = resumeStore((state) => state.setResume);
  const [localStorageLoaded, setLocalStorageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (localStorageLoaded)
      localStorage.setItem("resumes", JSON.stringify(resumes));
  }, [resumes, localStorageLoaded]);

  useEffect(() => {
    const resumes = localStorage.getItem("resumes");

    if (resumes) {
      const updateResume = JSON.parse(resumes);
      setResume(updateResume);
    }
    setLocalStorageLoaded(true);
  }, [setResume]);
};
