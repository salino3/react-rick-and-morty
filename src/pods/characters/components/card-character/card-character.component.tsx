import type React from "react";
import type { ResultCharacters } from "../../../../store/interface";
import "./card-character.styles.scss";

interface Props {
  data: ResultCharacters;
}

export const CardCharacter: React.FC<Props> = ({ data }) => {
  return (
    <div className="cardCharacter">
      <h3>{data.name}</h3>
    </div>
  );
};
