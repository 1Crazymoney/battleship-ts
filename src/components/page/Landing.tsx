import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div>
        <span>Battle Ship</span>
        <br />
        <Link to="/game">Let's play 1player game</Link>
      </div>
    </div>
  );
};

export default Landing;
