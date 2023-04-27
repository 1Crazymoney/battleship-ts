import { createContext, useContext } from "react";
import { GlobalContent } from "./types";

export const MyContext = createContext<GlobalContent>({
  reset: false,
  setReset: () => {},
  mode: 0,
  setMode: () => {},
  winner: 0,
  setWinner: () => {},
  turn: true,
  setTurn: () => {},
  map: [],
  setMap: () => {},

  humanPositions: [],
  setHumanPositions: () => {},
  humanShooted: [0, 0, 0, 0, 0], // set a default value
  setHumanShooted: () => {},
  humanSelected: 0,
  setHumanSelected: () => {},
  humanSecretCnt: 17,
  setHumanSecretCnt: () => {},

  comPositions: [],
  setComPositions: () => {},
  comShooted: [0, 0, 0, 0, 0], // set a default value
  setComShooted: () => {},
  comSelected: 0,
  setComSelected: () => {},
  comSecretCnt: 17,
  setComSecretCnt: () => {},
});

export const useGlobalContext = () => useContext(MyContext);
