import React, { useEffect } from "react";

import { MissSmall, HitSmall, shipsList } from "../../Config";

import { useGlobalContext } from "../../../contexts/AppContext";
import { size, init, cnt } from "../../Config";

import Board from "../Board";

import "./index.scss";

const LeftPanel = () => {
  const { shooted, selected, setSelected, mode } = useGlobalContext();
  const data = [0, 1, 2, 3, 4];

  const handleSelect = (s: number) => {
    setSelected(s);
  };

  let sign: JSX.Element[][] = [],
    ship: JSX.Element[][] = [];
  let i: number, j: number;

  for (i = 0; i < cnt; i++) {
    sign[i] = [];
    for (j = 0; j < shooted[i]; j++)
      sign[i].push(
        <img src={HitSmall} alt="Hit small.png" key={j} className="img-cell" />
      );
    for (j = 0; j < size[i] - shooted[i]; j++)
      sign[i].push(
        <img
          src={MissSmall}
          alt="Miss small.png"
          key={j + shooted[i]}
          className="img-cell"
        />
      );
    ship[i] = [];
    ship[i].push(
      <img
        className={
          "" + selected !== `${i}` && mode
            ? "panel-img design-mode"
            : "panel-img"
        }
        src={shipsList[i]}
        alt={"png"}
        key={i}
      />
    );
  }
  return (
    <div>
      {data.map((i) => {
        return (
          <div className="w-80vh h-8vh">
            <div onClick={() => handleSelect(i)} className="display-inline">
              {ship[i]}
            </div>
            {sign[i]}
          </div>
        );
      })}
    </div>
  );
};

const Panel = () => {
  const { setShooted, setReset, reset, setScore, mode, setMode, setSecretCnt } =
    useGlobalContext();

  useEffect(() => {
    setShooted([0, 0, 0, 0, 0]);
    setScore(100);
  }, [reset, setShooted, setScore, setSecretCnt]);
  return (
    <div className="d-flex justify-content-around mt-10vh">
      <div>
        <div className="d-flex flex-start">
          <button
            className="panel-btn"
            onClick={() => {
              setReset(!reset);
              setMode(0);
              setSecretCnt(17);
              init();
            }}
          >
            reset
          </button>
          <button
            className="ms-2 panel-btn"
            onClick={() => {
              setReset(!reset);
              setMode(1);
            }}
          >
            design
          </button>
          {mode === 1 && (
            <button
              className="ms-2 panel-btn"
              onClick={() => {
                setReset(!reset);
                setMode(0);
              }}
            >
              start
            </button>
          )}
        </div>
        <LeftPanel />
      </div>
      <div>
        <Board />
      </div>
    </div>
  );
};

export default Panel;
