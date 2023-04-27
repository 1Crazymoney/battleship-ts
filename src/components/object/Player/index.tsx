import React from "react";

import { Props } from "./types";

import Board from "../Board";
import Notify from "../Notify";

const Player = (props: Props) => {
  const { isHuman } = props;

  return (
    <div className="d-flex flex-start mt-10vh">
      <div>
        <span>{isHuman ? "Human:" : "Com:"}</span>
        <Notify isHuman={isHuman} />
      </div>
      <Board isHuman={isHuman} />
    </div>
  );
};

export default Player;
