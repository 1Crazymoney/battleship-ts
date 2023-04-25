import React, { useState, useEffect, useRef } from "react";
import Cell from "../Cell";
import { useGlobalContext } from "../../../context/MyContext";

import "./index.scss";
import { data } from "../../Config";

interface pos {
  x: number;
  y: number;
}

interface poswithstate extends pos {
  state: boolean;
}

const Board = () => {
  const posX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const posY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const vh = window.innerHeight / 100;
  console.log(vh);

  const [globalMousePos, setGlobalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [localMousePos, setLocalMousePos] = useState<pos>({ x: 0, y: 0 });
  const [block, setBlock] = useState<poswithstate[]>([]);
  const [secretBlock, setSecretBlock] = useState<pos[]>([]);
  const [dir, setDir] = useState<boolean>(false);
  const [dFlag, setDFlag] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const board = useRef<HTMLDivElement | null>(null);
  const { selected, mode, reset, secretCnt, setSecretCnt } = useGlobalContext();

  const size: number[] = [5, 4, 3, 3, 2];

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setGlobalMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleContextMenu = (event: any) => {
      event.preventDefault();
      setDir(!dir);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

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

  const dirSum = (cur: pos) => {
    let c = 0;
    if (cur.x > 0)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x - 1 && e.y === cur.y).length > 0
      );
    if (cur.x < 9)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x + 1 && e.y === cur.y).length > 0
      );
    if (cur.y > 0)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x && e.y === cur.y - 1).length > 0
      );
    if (cur.y < 9)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x && e.y === cur.y + 1).length > 0
      );
    if (cur.x > 0 && cur.y > 0)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x - 1 && e.y === cur.y - 1)
          .length > 0
      );
    if (cur.x < 9 && cur.y > 0)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x + 1 && e.y === cur.y - 1)
          .length > 0
      );
    if (cur.x > 0 && cur.y < 9)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x - 1 && e.y === cur.y + 1)
          .length > 0
      );
    if (cur.x < 9 && cur.y < 9)
      c += Number(
        secretBlock.filter((e) => e.x === cur.x + 1 && e.y === cur.y + 1)
          .length > 0
      );

    if (
      cur.x < 0 ||
      cur.x > 9 ||
      cur.y < 0 ||
      cur.y > 9 ||
      dFlag[selected] >= 1
    )
      c = 100;
    return c;
  };
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
        c += dirSum(tmp);
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

  return (
    <div>
      <div
        className="board-container"
        onMouseMove={handleMouseMove}
        ref={board}
        onClick={(e) => {
          if (e.nativeEvent.button === 0) {
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
          }
        }}
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
      {/* <div>
        {localMousePos && <b>{localMousePos.x},{localMousePos.y}</b>}
        <br />
        {globalMousePos && <b>{globalMousePos.x},{globalMousePos.y}</b>}
      </div> */}
    </div>
  );
};

export default Board;
