import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Panel from './components/object/Panel'
import Landing from './components/page/Landing';
import Score from './components/page/Score';
import { MyContext } from './context/MyContext'
import './App.scss'

function App() {
  const [shooted, setShooted] = useState<number[]>([0, 0, 0, 0, 0])
  const [reset, setReset] = useState<boolean>(false)
  const [score, setScore] = useState<number>(100)
  const [selected, setSelected] = useState<number>(0)
  const [mode, setMode] = useState<number>(0)
  const [secretCnt, setSecretCnt] = useState<number>(17)

  return (
    <MyContext.Provider value={{ shooted, setShooted, reset, setReset, score, setScore, selected, setSelected, mode, setMode, secretCnt, setSecretCnt }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/game' element={<Panel />} />
          <Route path='/score' element={<Score />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
