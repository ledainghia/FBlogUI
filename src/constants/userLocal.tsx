import { userLogin } from "../store/store";

export const getUserFromLocalStorage = (): userLogin | null => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user: userLogin = JSON.parse(userString);
    return user;
  }
  return null;
};
