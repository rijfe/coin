import { atom, selector } from "recoil";

const setId = atom({
  key: "setId",
  default: "",
});

const getId = selector({
  key: "getId",
  get: ({ get }) => {
    const id = get(setId);
    return id;
  },
});

export { setId, getId };
