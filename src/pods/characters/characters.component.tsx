import type React from "react";
import { useEffect, useState } from "react";
import { searchCharactersByName } from "../../utils/fetch-characters";
import type { ResultCharacters } from "../../store/interface";
import "./characters.styles.scss";

export const Characters: React.FC = () => {
  const [nameCharacter, setNameCharacter] = useState<string>("");

  const [resultData, setResultData] = useState<ResultCharacters[]>([]);

  //
  useEffect(() => {
    searchCharactersByName(nameCharacter).then((res) =>
      setResultData(res.results),
    );
  }, []);

  return (
    <div className="rootCharacters">
      <h1>Characters!</h1>
      <div className="containerResultsData">
        {resultData && resultData.length === 0
          ? "There is no Characters"
          : resultData.map((data: ResultCharacters) => (
              <div key={data.id} className="cardCharacter">
                <h3>{data.name}</h3>
              </div>
            ))}
      </div>
    </div>
  );
};
