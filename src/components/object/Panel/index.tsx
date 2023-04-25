import React, { useEffect } from 'react'
import Board from '../Board'
import Aircraft from '../../../assets/Aircraft Shape.png'
import Battle from '../../../assets/Battleship Shape.png'
import Cruiser from '../../../assets/Cruiser Shape.png'
import Submarine from '../../../assets/Submarine Shape.png'
import Carrier from '../../../assets/Carrier Shape.png'
import HitSmall from '../../../assets/Hit small.png'
import MissSmall from '../../../assets/Miss small.png'
import { useGlobalContext } from "../../../context/MyContext"
import { size, init } from '../../Config'

import './index.scss'

const Panel = () => {
  const { shooted, setShooted, setReset, reset, setScore, selected, setSelected, mode, setMode, setSecretCnt } = useGlobalContext()

  let hs1 = [], hs2 = [], hs3 = [], hs4 = [], hs5 = [], i;
  for (i = 0; i < shooted[0]; i++) hs1.push(<img src={HitSmall} alt="Hit small.png" key={i} />);
  for (i = 0; i < size[0] - shooted[0]; i++) hs1.push(<img src={MissSmall} alt="Miss small.png" key={i + shooted[0]} />);
  for (i = 0; i < shooted[1]; i++) hs2.push(<img src={HitSmall} alt="Hit small.png" key={i} />);
  for (i = 0; i < size[1] - shooted[1]; i++) hs2.push(<img src={MissSmall} alt="Miss small.png" key={i + shooted[1]} />);
  for (i = 0; i < shooted[2]; i++) hs3.push(<img src={HitSmall} alt="Hit small.png" key={i} />);
  for (i = 0; i < size[2] - shooted[2]; i++) hs3.push(<img src={MissSmall} alt="Miss small.png" key={i + shooted[2]} />);
  for (i = 0; i < shooted[3]; i++) hs4.push(<img src={HitSmall} alt="Hit small.png" key={i} />);
  for (i = 0; i < size[3] - shooted[3]; i++) hs4.push(<img src={MissSmall} alt="Miss small.png" key={i + shooted[3]} />);
  for (i = 0; i < shooted[4]; i++) hs5.push(<img src={HitSmall} alt="Hit small.png" key={i} />);
  for (i = 0; i < size[4] - shooted[4]; i++) hs5.push(<img src={MissSmall} alt="Miss small.png" key={i + shooted[4]} />);

  useEffect(() => {
    setShooted([0, 0, 0, 0, 0])
    setScore(100)
  }, [reset, setShooted, setScore, setSecretCnt])
  return (
    <div className="d-flex mt-5 justify-content-around">
      <div>
        <div className='d-flex flex-start'>
          <button onClick={() => {
            setReset(!reset)
            setMode(0)
            setSecretCnt(17)
            init()
          }}>reset</button>
          <button className="ms-2" onClick={() => {
            setReset(!reset)
            setMode(1)
          }} >design</button>
          {mode===1 && <button className="ms-2" onClick={() => {
            setReset(!reset)
            setMode(0)
          }}>start</button>}
        </div>
        <div className='w-80vh h-8vh'>
          <img className={"" + selected !== '0' && mode ?"panel-img design-mode":"panel-img"} src={Aircraft} alt="Aircraft.png" onClick={() => setSelected(0)} />
          {hs1}
        </div>
        <div className='w-80vh h-8vh'>
          <img className={"" + selected !== '1' && mode ?"panel-img design-mode":"panel-img"} src={Battle} alt="Battle.png" onClick={() => setSelected(1)} />
          {hs2}
        </div>
        <div className='w-80vh h-8vh'>
          <img className={"" + selected !== '2' && mode ?"panel-img design-mode":"panel-img"} src={Cruiser} alt="Cruiser.png" onClick={() => setSelected(2)} />
          {hs3}
        </div>
        <div className='w-80vh h-8vh'>
          <img className={"" + selected !== '3' && mode ?"panel-img design-mode":"panel-img"} src={Submarine} alt="Submarine.png" onClick={() => setSelected(3)} />
          {hs4}
        </div>
        <div className='w-80vh h-8vh'>
          <img className={"" + selected !== '4' && mode ?"panel-img design-mode":"panel-img"} src={Carrier} alt="Carrier.png" onClick={() => setSelected(4)} />
          {hs5}
        </div>
      </div>
      <div>
        <Board />
      </div>
    </div>
  )
}

export default Panel
