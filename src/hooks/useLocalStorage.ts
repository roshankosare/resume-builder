import { userStore } from "@/store/user";
import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const [localStorageLoaded, setLocalStorageLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log(user)
    if (localStorageLoaded) localStorage.setItem("user", JSON.stringify(user));
  }, [user, localStorageLoaded]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const updateUser = JSON.parse(user);
      setUser({
        ...updateUser,
      });
    }
    setLocalStorageLoaded(true);
  }, [setUser]);
};
