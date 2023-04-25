import { createContext, useContext } from "react"
export type GlobalContent = {
  shooted: number[],
  setShooted: (c: number[]) => void,
  reset: boolean,
  setReset: (c: boolean) => void,
  score: number,
  setScore: (c: number) => void,
  selected: number,
  setSelected: (c: number) => void,
  mode: number,
  setMode: (c: number) => void,
  secretCnt: number,
  setSecretCnt: (c: number) => void
}
export const MyContext = createContext<GlobalContent>({
  shooted: [0, 0, 0, 0, 0], // set a default value
  setShooted: () => { },
  reset: false,
  setReset: () => { },
  score: 100,
  setScore: () => { },
  selected: 0,
  setSelected: () => { },
  mode: 0,
  setMode: () => { },
  secretCnt: 17,
  setSecretCnt: () => { }
})

export const useGlobalContext = () => useContext(MyContext)
