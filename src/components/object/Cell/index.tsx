import React, { useState, useEffect } from "react";

import { Props } from "./types";
import { size, Hit, Miss, MissSmall } from "../../Config";
import { useGlobalContext } from "../../../contexts/AppContext";

import "./index.scss";

const Cell = (props: Props, ref: React.Ref<HTMLDivElement>): JSX.Element => {
  const {
    reset,
    mode,
    turn,
    map,
    setTurn,
    humanShooted,
    setHumanShooted,
    humanPositions,
    comPositions,
    comShooted,
    setComShooted,
  } = useGlobalContext();
  const { x, y, state, isHuman } = props;
  const [chosen, mdChosen] = useState(0);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    mdChosen(0);
    setMarked(false);
  }, [reset]);

  const checkShootOrNot = (x: number, y: number) => {
    if (!isHuman && !marked && turn) {
      mdChosen(2);
      setMarked(true);
      comPositions.map((item, i) => {
        return item.map((pos) => {
          if (pos.x === x && pos.y === y) {
            mdChosen(1);
            let std: number[] = comShooted;
            if (std[i] < size[i]) std[i]++;
            setComShooted([...std]);
          }
          return true;
        });
      });
      setTurn(!turn);
    }

    if (isHuman && !marked && !turn) {
      mdChosen(2);
      setMarked(true);
      map[x][y] = 2;

      humanPositions.map((item, i) => {
        return item.map((pos) => {
          if (pos.x === x && pos.y === y) {
            mdChosen(1);
            map[x][y] = 1;
            let std: number[] = humanShooted;
            if (std[i] < size[i]) std[i]++;
            setHumanShooted([...std]);
          }
          return true;
        });
      });
      setTurn(!turn);
    }
  };

  return (
    <div
      className={"cell marginleft-" + x + " margintop-" + y}
      onClick={async () => {
        if (!mode) await checkShootOrNot(x, y);
      }}
      ref={ref}
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

export default React.forwardRef(Cell);
