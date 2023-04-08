import { atom, selector } from "recoil";

const setOwner = atom({
  key: "setOwner",
  default: "",
});

const getOwner = selector({
  key: "getOwner",
  get: ({ get }) => {
    const owner = get(setOwner);
    return owner;
  },
});

export { setOwner, getOwner };
