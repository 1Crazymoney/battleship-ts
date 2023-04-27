import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../../contexts/AppContext";

import Player from "../Player";

import "./index.scss";

const Panel = () => {
  const {
    reset,
    setReset,
    mode,
    setMode,
    // map,
    setMap,
    setWinner,
    setTurn,
    humanShooted,
    comShooted,
    setHumanShooted,
    setComShooted,
    humanSecretCnt,
    comSecretCnt,
    setHumanSecretCnt,
    setComSecretCnt,
  } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    //////////////Reset change
    setHumanShooted([0, 0, 0, 0, 0]);
    setComShooted([0, 0, 0, 0, 0]);
    setComSecretCnt(17);
    setTurn(true);
    setMap([]);
    let m: number[][] = [];
    for (let i = 0; i < 10; i++) {
      m[i] = [];
      for (let j = 0; j < 10; j++) m[i][j] = 0;
    }
    setMap(m);
  }, [reset, setHumanShooted, setComShooted, setComSecretCnt, setTurn, setMap]);

  useEffect(() => {
    //////////check if final
    let humanSum = 0,
      comSum = 0;
    humanShooted.forEach((item) => (humanSum += item));
    comShooted.forEach((item) => (comSum += item));
    if (
      (humanSecretCnt !== 0 && humanSum === humanSecretCnt) ||
      comSum === comSecretCnt
    ) {
      // console.log("finish");
      if (humanSum === humanSecretCnt) setWinner(1);
      else setWinner(2);
      setReset(!reset);
      navigate("/score");
    }
  }, [
    humanShooted,
    comShooted,
    navigate,
    humanSecretCnt,
    comSecretCnt,
    setWinner,
    setReset,
    reset,
  ]);

  return (
    <div className="d-flex flex-column justify-content-between mt-10vh">
      <div className="d-flex justify-content-center">
        <button
          className="panel-btn"
          onClick={() => {
            setReset(!reset);
            setMode(0);
            setHumanSecretCnt(0);
            setComSecretCnt(17);
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
      <div className="d-flex">
        <Player isHuman={true} />
        <Player isHuman={false} />
      </div>
    </div>
  );
};

export default Panel;
