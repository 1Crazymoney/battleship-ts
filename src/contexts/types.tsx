export interface GlobalContent {
  shooted: number[];
  setShooted: (c: number[]) => void;
  reset: boolean;
  setReset: (c: boolean) => void;
  score: number;
  setScore: (c: number) => void;
  selected: number;
  setSelected: (c: number) => void;
  mode: number;
  setMode: (c: number) => void;
  secretCnt: number;
  setSecretCnt: (c: number) => void;
}
