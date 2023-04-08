import { atom, selector } from "recoil";

const setToken = atom({
  key: "setToken",
  default: "",
});

const getToken = selector({
  key: "getToken",
  get: ({ get }) => {
    const token = get(setToken);
    return token;
  },
});

export { setToken, getToken };
