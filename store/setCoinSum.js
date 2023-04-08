import { atom, selector } from "recoil";

const setCoinSum = atom({
  key: "setCoinSum",
  default: "",
});

const getCoinSum = selector({
  key: "getCoinSum",
  get: ({ get }) => {
    const sum = get(setCoinSum);
    return sum;
  },
});

export { setCoinSum, getCoinSum };
