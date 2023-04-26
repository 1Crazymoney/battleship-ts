import { useState, useEffect, useRef, useCallback } from "react";

import Cell from "../Cell";
import {
  posX,
  posY,
  size,
  dirSumwithDesign,
  init,
  // cnt,
} from "../../Config";
import { useGlobalContext } from "../../../contexts/AppContext";

import { pos, poswithstate, Props } from "./types";
import "./index.scss";

const Board = (props: Props) => {
  const { isHuman } = props;
  const vh = window.innerHeight / 100;

  const [globalMousePos, setGlobalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [localMousePos, setLocalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [secretBlock, setSecretBlock] = useState<pos[]>([]);
  const [block, setBlock] = useState<poswithstate[]>([]);
  const [dFlag, setDFlag] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [dir, setDir] = useState<boolean>(false);
  const {
    mode,
    reset,
    humanSelected,
    humanSecretCnt,
    setHumanSecretCnt,
    humanPositions,
    setHumanPositions,
    setComPositions,
  } = useGlobalContext();

  const board = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    setGlobalMousePos({ x: 0, y: 0 });
    setLocalMousePos({ x: 0, y: 0 });
    setBlock([]);
    setSecretBlock([]);
    setDir(false);
    setDFlag([0, 0, 0, 0, 0, 0]);
    if (!isHuman) setComPositions(init());
  }, [reset, isHuman, setComPositions]);

  useEffect(() => {
    if (isHuman && mode === 1) {
      setHumanSecretCnt(0);
      setHumanPositions([]);
    }
  }, [isHuman, mode, setHumanPositions, setHumanSecretCnt]);

  const handleMouseMove = useCallback(() => {
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

        setHumanSecretCnt(humanSecretCnt + size[selected]);
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
                  return (
                    <Cell
                      x={x}
                      y={y}
                      key={x * 10 + y}
                      state={2}
                      isHuman={isHuman}
                    />
                  );
                else
                  return (
                    <Cell
                      x={x}
                      y={y}
                      key={x * 10 + y}
                      state={3}
                      isHuman={isHuman}
                    />
                  );
              } else if (
                secretBlock &&
                secretBlock.filter((e) => e.x === x && e.y === y).length > 0
              )
                return (
                  <Cell
                    x={x}
                    y={y}
                    key={x * 10 + y}
                    state={1}
                    isHuman={isHuman}
                  />
                );
              else
                return (
                  <Cell
                    x={x}
                    y={y}
                    key={x * 10 + y}
                    state={0}
                    isHuman={isHuman}
                  />
                );
            } else {
              return (
                <Cell
                  x={x}
                  y={y}
                  key={x * 10 + y}
                  state={0}
                  isHuman={isHuman}
                />
              );
            }
          });
        })}
      </div>
    </div>
  );
};

export default Board;
