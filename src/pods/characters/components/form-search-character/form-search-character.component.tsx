import { useActionState } from "react";
import type React from "react";
import {
  searchCharactersAction,
  type CharacterSearchAction,
} from "../../../../utils/search-character-action";
import "./form-search-character.styles.scss";

export const FormSearchCharacter: React.FC = () => {
  const [state, formAction, isPending] = useActionState<
    CharacterSearchAction,
    FormData
  >(searchCharactersAction, { success: false, error: "" });

  return (
    <form id="rootFormSearchCharacter">
      <div className="boxInput boxName">
        <input
          type="text"
          name="name"
          placeholder="Search a character"
          id={"name"}
        />
      </div>
    </form>
  );
};
