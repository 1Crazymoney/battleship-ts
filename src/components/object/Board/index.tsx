import React, { useState, useEffect, useRef, useCallback } from "react";

import Cell from "../Cell";
import { size, dirSumwithDesign, init } from "../../Config";
import { useGlobalContext } from "../../../contexts/AppContext";

import { pos, poswithstate, Props } from "./types";
import "./index.scss";

const Board = (props: Props) => {
  const { isHuman } = props;
  const vh = window.innerHeight / 100;
  const board = useRef<HTMLDivElement | null>(null);

  const [globalMousePos, setGlobalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [localMousePos, setLocalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [secretBlock, setSecretBlock] = useState<pos[]>([]);
  const [block, setBlock] = useState<poswithstate[]>([]);
  const [dFlag, setDFlag] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [dir, setDir] = useState<boolean>(false);
  const {
    mode,
    reset,
    turn,
    map,
    humanSelected,
    humanSecretCnt,
    setHumanSecretCnt,
    humanPositions,
    setHumanPositions,
    setComPositions,
  } = useGlobalContext();

  useEffect(() => {
    ////////// Direct Change
    const handleMouseMoveOnBoard = (event: any) => {
      if (!isHuman) return;
      setGlobalMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleContextMenu = (event: any) => {
      event.preventDefault();
      setDir(!dir);
    };

    window.addEventListener("mousemove", handleMouseMoveOnBoard);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveOnBoard);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [dir, isHuman]);

  useEffect(() => {
    ////////// Reset Change
    setGlobalMousePos({ x: 0, y: 0 });
    setLocalMousePos({ x: 0, y: 0 });
    setBlock([]);
    setSecretBlock([]);
    setDir(false);
    setDFlag([0, 0, 0, 0, 0, 0]);
    if (!isHuman) setComPositions(init());
  }, [reset, isHuman, setComPositions]);

  useEffect(() => {
    ////////// Mode Change
    if (isHuman && mode === 1) {
      setHumanSecretCnt(0);
      setHumanPositions([]);
    }
  }, [mode, isHuman, setHumanPositions, setHumanSecretCnt]);

  const handleMouseMove = useCallback(() => {
    ////////// Mouse move on Board
    if (!isHuman) return;
    const offsetLeft = board.current?.offsetLeft || 0;
    const offsetTop = board.current?.offsetTop || 0;

    setLocalMousePos({
      x: globalMousePos.x - offsetLeft,
      y: globalMousePos.y - offsetTop,
    });

    if (isHuman && mode === 1) {
      let startX = Math.floor(localMousePos.x / (5 * vh)),
        startY = Math.floor(localMousePos.y / (5 * vh)),
        i,
        selected = humanSelected;

      if (!dir) startX -= Math.floor(size[selected] / 2);
      else startY -= Math.floor(size[selected] / 2);

      let b: poswithstate[] = [],
        c = 0;
      for (i = 0; i < size[selected]; i++) {
        let tmp: poswithstate;

        if (!dir) tmp = { x: startX + i, y: startY, state: true };
        else tmp = { x: startX, y: startY + i, state: true };

        b.push(tmp);
        c += dirSumwithDesign(tmp, secretBlock, dFlag, selected);
      }
      if (c > 0)
        b = b.map((item) => {
          return { x: item.x, y: item.y, state: false };
        });
      setBlock(b);
    }
  }, [
    dFlag,
    dir,
    globalMousePos.x,
    globalMousePos.y,
    humanSelected,
    isHuman,
    localMousePos.x,
    localMousePos.y,
    mode,
    secretBlock,
    vh,
  ]);

  useEffect(() => {
    handleMouseMove();
  }, [dir, handleMouseMove]);

  const handleClickOnBoard = () => {
    ////////// Set Design
    if (!isHuman) return;
    if (mode === 1) {
      if (block[0].state === true) {
        let tmp: pos[] = secretBlock;
        tmp.push(...block);
        setSecretBlock(tmp);

        let t: number[] = dFlag,
          selected = humanSelected;
        t[selected] = 1;
        setDFlag(t);

        let tt: pos[][] = humanPositions;
        tt[selected] = block;
        ////////////////////////////////////////////////////////very Curious!
        // console.log(tt, humanPositions);

        setHumanSecretCnt(humanSecretCnt + size[selected]);
      }
    }
  };

  ////////// Cells
  let cells: JSX.Element[] = [],
    x: number,
    y: number;
  const inputRefs = React.useRef<HTMLDivElement[]>([]);
  for (x = 0; x < 10; x++)
    for (y = 0; y < 10; y++) {
      if (mode) {
        if (
          block &&
          // eslint-disable-next-line no-loop-func
          block.filter((e) => e.x === x && e.y === y).length > 0
        ) {
          if (inputRefs.current && block[0].state === true)
            cells.push(
              <Cell
                x={x}
                y={y}
                key={x * 10 + y}
                state={2}
                isHuman={isHuman}
                // eslint-disable-next-line no-loop-func
                ref={(el) => {
                  if (el) inputRefs.current.push(el);
                }}
              />
            );
          else
            cells.push(
              <Cell
                x={x}
                y={y}
                key={x * 10 + y}
                state={3}
                isHuman={isHuman}
                // eslint-disable-next-line no-loop-func
                ref={(el) => {
                  if (el) inputRefs.current.push(el);
                }}
              />
            );
        } else if (
          secretBlock &&
          // eslint-disable-next-line no-loop-func
          secretBlock.filter((e) => e.x === x && e.y === y).length > 0
        )
          cells.push(
            <Cell
              x={x}
              y={y}
              key={x * 10 + y}
              state={1}
              isHuman={isHuman}
              // eslint-disable-next-line no-loop-func
              ref={(el) => {
                if (el) inputRefs.current.push(el);
              }}
            />
          );
        else
          cells.push(
            <Cell
              x={x}
              y={y}
              key={x * 10 + y}
              state={0}
              isHuman={isHuman}
              // eslint-disable-next-line no-loop-func
              ref={(el) => {
                if (el) inputRefs.current.push(el);
              }}
            />
          );
      } else {
        cells.push(
          <Cell
            x={x}
            y={y}
            key={x * 10 + y}
            state={0}
            isHuman={isHuman}
            // eslint-disable-next-line no-loop-func
            ref={(el) => {
              if (el) inputRefs.current.push(el);
            }}
          />
        );
      }
    }

  useEffect(() => {
    ////////// Auto Pick
    if (turn === false && isHuman) {
      let x, y;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (map[x][y] !== 0);
      console.log(x, y, map[x][y]);
      inputRefs.current[x * 10 + y].click();
    }
  }, [turn, isHuman, map]);

  return (
    <div>
      <div
        className="board-container"
        onMouseMove={handleMouseMove}
        ref={board}
        onClick={() => handleClickOnBoard()}
      >
        {cells.map((cell) => {
          return cell;
        })}
      </div>
    </div>
  );
};

export default Board;
