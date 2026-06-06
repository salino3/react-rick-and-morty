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

  console.log("Result:", resultData);

  return (
    <div className="rootCharacters">
      <h1>Characters!</h1>
    </div>
  );
};
