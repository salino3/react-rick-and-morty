import type React from "react";
import { useEffect, useState } from "react";
import { searchCharactersByName } from "../../utils/fetch-characters";
import "./characters.styles.scss";

export const Characters: React.FC = () => {
  const [nameCharacter, setNameCharacter] = useState<string>("");

  //
  useEffect(() => {
    searchCharactersByName(nameCharacter);
  }, []);

  return (
    <div className="rootCharacters">
      <h1>Characters!</h1>
    </div>
  );
};
