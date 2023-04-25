import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../contexts/AppContext";

const Score = () => {
  const { score } = useGlobalContext();
  return (
    <div className="d-flex justify-content-center mt-5">
      <div>
        <span>Your Score is {score}...</span>
        <br />
        <button>
          <Link to="/">go home</Link>
        </button>
      </div>
    </div>
  );
};

export default Score;
