import MissSmall from "../assets/Miss small.png";
import HitSmall from "../assets/Hit small.png";
import Hit from "../assets/Hit.png";
import Miss from "../assets/Miss.png";
import { pos } from "./object/Board/types";

let shipsList: string[] = [];

const importAll = (r: any) => {
  return r.keys().map(r);
};

const imgLoad = () => {
  shipsList = importAll(require.context("../assets/ships/", false, /\.(png)$/));
};

let ships: number[][][] = [];
let flag: number[][] = [];
let std: number[] = [];
const size = [5, 4, 3, 3, 2],
  cnt = 5;

let data = {
  shipTypes: {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
  },

  layout: [
    {
      ship: "carrier",
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: "battleship",
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: "cruiser",
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: "submarine",
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: "destroyer",
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ],
};

const checkSum = () => {
  let i,
    j,
    s = 0;
  const row = 10;
  for (i = 0; i < row; i++) for (j = 0; j < row; j++) s += flag[i][j];
  return s;
};

const check = () => {
  let s = 17;
  if (s !== checkSum()) return false;
  return true;
};

const dirSum = (i: number, j: number, arr: number[][]) => {
  let c = 0;
  if (i > 0) c += arr[i - 1][j];
  if (i < 9) c += arr[i + 1][j];
  if (j > 0) c += arr[i][j - 1];
  if (j < 9) c += arr[i][j + 1];
  if (i > 0 && j > 0) c += arr[i - 1][j - 1];
  if (i < 9 && j > 0) c += arr[i + 1][j - 1];
  if (i > 0 && j < 9) c += arr[i - 1][j + 1];
  if (i < 9 && j < 9) c += arr[i + 1][j + 1];
  return c;
};

const randomPlace = (ship: number[][], n: number) => {
  ship = [];
  for (let i = 0; i < size[n]; i++) ship[i] = [];
  let vertical, xMax, yMax, i, originX, originY;
  const row = 10;
  vertical = Math.random() > 0.5;
  xMax = !vertical ? row - size[n] + 1 : row;
  yMax = !vertical ? row : row - size[n] + 1;
  let c = 0;
  do {
    originX = Math.floor(Math.random() * xMax);
    originY = Math.floor(Math.random() * yMax);
    let i = originX,
      j = originY,
      k;
    c = 0;
    if (vertical) {
      for (k = 0; k < size[n]; k++) c += dirSum(i, j + k, flag);
    } else {
      for (k = 0; k < size[n]; k++) c += dirSum(i + k, j, flag);
    }
  } while (flag[originX][originY] || c);

  if (vertical) {
    for (i = 0; i < size[n]; i++) {
      ship[i] = [originX, originY + i];
      flag[originX][originY + i] = 1;
    }
  } else {
    for (i = 0; i < size[n]; i++) {
      ship[i] = [originX + i, originY];
      flag[originX + i][originY] = 1;
    }
  }
  return ship;
};

const init = () => {
  let i, j;
  for (i = 0; i < 5; i++) std[i] = 0;
  for (i = 0; i < 10; i++) flag[i] = [];
  ships = [];
  for (i = 0; i < cnt; i++) ships[i] = [];
  do {
    for (i = 0; i < 10; i++) for (j = 0; j < 10; j++) flag[i][j] = 0;

    for (let i = 0; i < cnt; i++) {
      ships[i] = randomPlace(ships[i], i);
      data.layout[i].positions = ships[i];
    }
  } while (!check());
  imgLoad();
};

const dirSumwithDesign = (
  cur: pos,
  cb: pos[],
  df: number[],
  selected: number
) => {
  let c = 0;
  if (cur.x > 0)
    c += Number(
      cb.filter((e) => e.x === cur.x - 1 && e.y === cur.y).length > 0
    );
  if (cur.x < 9)
    c += Number(
      cb.filter((e) => e.x === cur.x + 1 && e.y === cur.y).length > 0
    );
  if (cur.y > 0)
    c += Number(
      cb.filter((e) => e.x === cur.x && e.y === cur.y - 1).length > 0
    );
  if (cur.y < 9)
    c += Number(
      cb.filter((e) => e.x === cur.x && e.y === cur.y + 1).length > 0
    );
  if (cur.x > 0 && cur.y > 0)
    c += Number(
      cb.filter((e) => e.x === cur.x - 1 && e.y === cur.y - 1).length > 0
    );
  if (cur.x < 9 && cur.y > 0)
    c += Number(
      cb.filter((e) => e.x === cur.x + 1 && e.y === cur.y - 1).length > 0
    );
  if (cur.x > 0 && cur.y < 9)
    c += Number(
      cb.filter((e) => e.x === cur.x - 1 && e.y === cur.y + 1).length > 0
    );
  if (cur.x < 9 && cur.y < 9)
    c += Number(
      cb.filter((e) => e.x === cur.x + 1 && e.y === cur.y + 1).length > 0
    );

  if (cur.x < 0 || cur.x > 9 || cur.y < 0 || cur.y > 9 || df[selected] >= 1)
    c = 100;
  return c;
};

const posX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const posY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export {
  MissSmall,
  HitSmall,
  Hit,
  Miss,
  size,
  cnt,
  posX,
  posY,
  data,
  shipsList,
  dirSumwithDesign,
  init,
};
