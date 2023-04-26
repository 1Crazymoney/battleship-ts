import React, { useState, useEffect, useRef } from "react";

import Cell from "../Cell";
import { data, posX, posY, size, dirSumwithDesign } from "../../Config";
import { useGlobalContext } from "../../../contexts/AppContext";

import { pos, poswithstate } from "./types";
import "./index.scss";

const Board = () => {
  const vh = window.innerHeight / 100;

  const [globalMousePos, setGlobalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [localMousePos, setLocalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [secretBlock, setSecretBlock] = useState<pos[]>([]);
  const [block, setBlock] = useState<poswithstate[]>([]);
  const [dFlag, setDFlag] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [dir, setDir] = useState<boolean>(false);
  const { selected, mode, reset, secretCnt, setSecretCnt } = useGlobalContext();

  const board = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMoveOnBoard = (event: any) => {
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
  }, [dir]);

  useEffect(() => {
    setGlobalMousePos({ x: 0, y: 0 });
    setLocalMousePos({ x: 0, y: 0 });
    setBlock([]);
    setSecretBlock([]);
    setDir(false);
    setDFlag([0, 0, 0, 0, 0, 0]);
  }, [reset]);

  useEffect(() => {
    if (mode === 1) {
      setSecretCnt(0);
      let i;
      for (i = 0; i < 5; i++) data.layout[i].positions = [];
    }
  }, [mode, setSecretCnt]);

  const handleMouseMove = () => {
    const offsetLeft = board.current?.offsetLeft || 0;
    const offsetTop = board.current?.offsetTop || 0;

    setLocalMousePos({
      x: globalMousePos.x - offsetLeft,
      y: globalMousePos.y - offsetTop,
    });

    if (mode === 1) {
      let startX = Math.floor(localMousePos.x / (5 * vh)),
        startY = Math.floor(localMousePos.y / (5 * vh)),
        i;

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
  };

  useEffect(() => {
    handleMouseMove();
  }, [dir]);

  const handleClickOnBoard = () => {
    if (mode === 1) {
      if (block[0].state === true) {
        let tmp: pos[] = secretBlock;
        tmp.push(...block);
        setSecretBlock(tmp);

        let t: number[] = dFlag;
        t[selected] = 1;
        setDFlag(t);

        data.layout[selected].positions = block.map((item) => {
          return [item.x, item.y];
        });

        setSecretCnt(secretCnt + size[selected]);
      }
    }
  };
  return (
    <div>
      <div
        className="board-container"
        onMouseMove={handleMouseMove}
        ref={board}
        onClick={() => handleClickOnBoard()}
      >
        {posX.map((x: number) => {
          return posY.map((y: number) => {
            if (mode) {
              if (
                block &&
                block.filter((e) => e.x === x && e.y === y).length > 0
              ) {
                if (block[0].state === true)
                  return <Cell x={x} y={y} key={x * 10 + y} state={2} />;
                else return <Cell x={x} y={y} key={x * 10 + y} state={3} />;
              } else if (
                secretBlock &&
                secretBlock.filter((e) => e.x === x && e.y === y).length > 0
              )
                return <Cell x={x} y={y} key={x * 10 + y} state={1} />;
              else return <Cell x={x} y={y} key={x * 10 + y} state={0} />;
            } else {
              return <Cell x={x} y={y} key={x * 10 + y} state={0} />;
            }
          });
        })}
      </div>
    </div>
  );
};

export default Board;
