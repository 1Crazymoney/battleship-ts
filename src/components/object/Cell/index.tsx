import { useState, useEffect } from "react";

import { Props } from "./types";
import { size, Hit, Miss, MissSmall } from "../../Config";
import { useGlobalContext } from "../../../contexts/AppContext";

import "./index.scss";

const Cell = (props: Props) => {
  const { x, y, state, isHuman } = props;

  const [chosen, mdChosen] = useState(0);
  const [marked, setMarked] = useState(false);

  const {
    humanShooted,
    comShooted,
    setHumanShooted,
    setComShooted,
    reset,
    mode,
    humanPositions,
    comPositions,
  } = useGlobalContext();

  useEffect(() => {
    mdChosen(0);
    setMarked(false);
  }, [reset]);

  const checkShootOrNot = (x: number, y: number) => {
    if (!marked) {
      mdChosen(2);
      if (isHuman)
        humanPositions.map((item, i) => {
          return item.map((pos) => {
            if (pos.x === x && pos.y === y) {
              mdChosen(1);
              let std: number[] = humanShooted;
              if (std[i] < size[i]) std[i]++;
              setHumanShooted([...std]);
              setMarked(true);
            }
            return true;
          });
        });
      else
        comPositions.map((item, i) => {
          return item.map((pos) => {
            if (pos.x === x && pos.y === y) {
              mdChosen(1);
              let std: number[] = comShooted;
              if (std[i] < size[i]) std[i]++;
              setComShooted([...std]);
              setMarked(true);
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
