import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../contexts/AppContext";

const Score = () => {
  const { reset, setReset, winner, setHumanShooted, setComShooted } =
    useGlobalContext();

  const initGame = () => {
    setHumanShooted([0, 0, 0, 0, 0]);
    setComShooted([0, 0, 0, 0, 0]);
    setReset(!reset);
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <div>
        <span>{winner === 0 ? "You win!" : "You lost!"}</span>
        <br />
        <button onClick={initGame}>
          <Link to="/">go home</Link>
        </button>
      </div>
    </div>
  );
};

export default Score;
