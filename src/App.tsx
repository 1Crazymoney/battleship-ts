import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Panel from "./components/object/Panel";
import Landing from "./components/page/Landing";
import Score from "./components/page/Score";
import { MyContext } from "./contexts/AppContext";
import "./App.scss";

import { pos } from "./components/object/Board/types";

function App() {
  const [reset, setReset] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(0);
  const [winner, setWinner] = useState<number>(0);
  const [humanShooted, setHumanShooted] = useState<number[]>([0, 0, 0, 0, 0]);
  const [comShooted, setComShooted] = useState<number[]>([0, 0, 0, 0, 0]);
  const [humanSelected, setHumanSelected] = useState<number>(0);
  const [comSelected, setComSelected] = useState<number>(0);
  const [humanSecretCnt, setHumanSecretCnt] = useState<number>(17);
  const [comSecretCnt, setComSecretCnt] = useState<number>(17);
  const [humanPositions, setHumanPositions] = useState<pos[][]>([]);
  const [comPositions, setComPositions] = useState<pos[][]>([]);

  return (
    <MyContext.Provider
      value={{
        reset,
        setReset,
        mode,
        setMode,
        winner,
        setWinner,
        humanShooted,
        setHumanShooted,
        comShooted,
        setComShooted,
        humanSelected,
        setHumanSelected,
        comSelected,
        setComSelected,
        humanSecretCnt,
        setHumanSecretCnt,
        comSecretCnt,
        setComSecretCnt,
        humanPositions,
        setHumanPositions,
        comPositions,
        setComPositions,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Panel />} />
          <Route path="/score" element={<Score />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
