import { pos } from "../components/object/Board/types";
export interface GlobalContent {
  reset: boolean;
  setReset: (c: boolean) => void;
  mode: number;
  setMode: (c: number) => void;
  winner: number;
  setWinner: (c: number) => void;

  humanPositions: pos[][];
  setHumanPositions: (c: pos[][]) => void;
  humanShooted: number[];
  setHumanShooted: (c: number[]) => void;
  humanSelected: number;
  setHumanSelected: (c: number) => void;
  humanSecretCnt: number;
  setHumanSecretCnt: (c: number) => void;

  comPositions: pos[][];
  setComPositions: (c: pos[][]) => void;
  comShooted: number[];
  setComShooted: (c: number[]) => void;
  comSelected: number;
  setComSelected: (c: number) => void;
  comSecretCnt: number;
  setComSecretCnt: (c: number) => void;
}
