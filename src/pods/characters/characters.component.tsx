import type React from "react";
import { useEffect } from "react";
import { constants } from "../../config/constants";
import "./characters.styles.scss";

export const Characters: React.FC = () => {
  //
  async function getCharacters(id: string) {
    try {
      const response = await fetch(constants.CHARACTERS + id);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error: any) {
      console.error(error?.message);
    }
  }

  useEffect(() => {
    getCharacters("");
  }, []);

  return (
    <div className="rootCharacters">
      <h1>Characters!</h1>
    </div>
  );
};
