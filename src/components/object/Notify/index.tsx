import { MissSmall, HitSmall, shipsList } from "../../Config";

import { useGlobalContext } from "../../../contexts/AppContext";
import { size, cnt } from "../../Config";

import { Props } from "./types";
import "./index.scss";

const Notify = (props: Props) => {
  const { isHuman } = props;
  const {
    humanShooted,
    humanSelected,
    setHumanSelected,
    comShooted,
    comSelected,
    mode,
  } = useGlobalContext();
  const data = [0, 1, 2, 3, 4];

  const handleSelect = (s: number) => {
    if (isHuman) setHumanSelected(s);
  };

  let sign: JSX.Element[][] = [],
    ship: JSX.Element[][] = [];
  let i: number,
    j: number,
    shooted = isHuman ? humanShooted : comShooted,
    selected = isHuman ? humanSelected : comSelected;

  for (i = 0; i < cnt; i++) {
    sign[i] = [];
    for (j = 0; j < shooted[i]; j++)
      sign[i].push(
        <img src={HitSmall} alt="Hit small.png" key={j} className="img-cell" />
      );
    for (j = 0; j < size[i] - shooted[i]; j++)
      sign[i].push(
        <img
          src={MissSmall}
          alt="Miss small.png"
          key={j + shooted[i]}
          className="img-cell"
        />
      );
    ship[i] = [];
    ship[i].push(
      <img
        className={
          "" + selected !== `${i}` && mode && isHuman
            ? "panel-img design-mode"
            : "panel-img"
        }
        src={shipsList[i]}
        alt={"png"}
        key={i}
      />
    );
  }
  return (
    <div>
      {data.map((i) => {
        return (
          <div className="h-5vh" key={i}>
            <div onClick={() => handleSelect(i)} className="display-inline">
              {ship[i]}
            </div>
            {sign[i]}
          </div>
        );
      })}
    </div>
  );
};

export default Notify;
