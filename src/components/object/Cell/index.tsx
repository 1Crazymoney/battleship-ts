import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Props } from "./types";

import { data, size } from "../../Config";
import { useGlobalContext } from "../../../contexts/AppContext";

import Hit from "../../../assets/Hit.png";
import Miss from "../../../assets/Miss.png";
import MissSmall from "../../../assets/Miss small.png";

import "./index.scss";

const Cell = (props: Props) => {
  const { x, y, state } = props;

  const [chosen, mdChosen] = useState(0);
  const [marked, setMarked] = useState(false);

  const {
    shooted,
    setShooted,
    reset,
    setReset,
    score,
    setScore,
    mode,
    secretCnt,
  } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    mdChosen(0);
    setMarked(false);
  }, [reset]);

  const checkShootOrNot = (x: number, y: number) => {
    if (!marked) {
      mdChosen(2);
      setScore(score - 1);
      data.layout.map((item, i) => {
        return item.positions.map((pos) => {
          if (pos[0] === x && pos[1] === y) {
            mdChosen(1);
            setScore(score);
            let std: number[] = shooted;
            if (std[i] < size[i]) std[i]++;
            setShooted([...std]);
            setMarked(true);
            let j,
              sum = 0;
            for (j = 0; j < 5; j++) sum += std[j];
            if (sum === secretCnt) {
              setReset(!reset);
              navigate("/score");
            }
          }
          return true;
        });
      });
    }
  };

  return (
    <div
      className={"cell marginleft-" + x + " margintop-" + y}
      onClick={async () => {
        if (!mode) await checkShootOrNot(x, y);
      }}
    >
      {mode === 1 && state === 1 && (
        <img src={Hit} alt="Hit.png" className="cell-img" />
      )}
      {mode === 1 && state === 2 && (
        <img src={MissSmall} alt="MissSmall.png" className="cell-img" />
      )}
      {mode === 1 && state === 3 && (
        <img src={MissSmall} alt="MissSmall.png" className="cell-img warning" />
      )}
      {!mode && chosen === 1 && (
        <img src={Hit} alt="Hit.png" className="cell-img" />
      )}
      {!mode && chosen === 2 && (
        <img src={Miss} alt="Miss.png" className="cell-img" />
      )}
    </div>
  );
};

export default Cell;
