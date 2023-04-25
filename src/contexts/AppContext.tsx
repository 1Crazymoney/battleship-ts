import { createContext, useContext } from "react";
import { GlobalContent } from "./types";

export const MyContext = createContext<GlobalContent>({
  shooted: [0, 0, 0, 0, 0], // set a default value
  setShooted: () => {},
  reset: false,
  setReset: () => {},
  score: 100,
  setScore: () => {},
  selected: 0,
  setSelected: () => {},
  mode: 0,
  setMode: () => {},
  secretCnt: 17,
  setSecretCnt: () => {},
});

export const useGlobalContext = () => useContext(MyContext);
