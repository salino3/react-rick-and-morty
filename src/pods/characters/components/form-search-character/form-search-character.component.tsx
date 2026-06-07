import { useActionState, useEffect } from "react";
import type React from "react";
import {
  searchCharactersAction,
  type CharacterSearchAction,
} from "../../../../utils/search-character-action";
import { SubmitBasicBtn } from "../../../../common-app";
import "./form-search-character.styles.scss";

interface Props {
  searchNameCharacter: string;
  setSearchNameCharacter: React.Dispatch<React.SetStateAction<string>>;
}

export const FormSearchCharacter: React.FC<Props> = ({
  searchNameCharacter,
  setSearchNameCharacter,
}) => {
  const [state, formAction, isPending] = useActionState<
    CharacterSearchAction,
    FormData
  >(searchCharactersAction, { success: false, error: "" });

  //
  useEffect(() => {
    if (state.success) {
      setSearchNameCharacter(state.name ?? "");
    }
  }, [state.success, state.name]);

  return (
    <form id="rootFormSearchCharacter" action={formAction}>
      <fieldset disabled={isPending}>
        <legend>Discover Your Collection</legend>
        <div className="boxInput boxName">
          <input
            type="text"
            name="name"
            placeholder="Search a character"
            id={"name"}
          />
        </div>
        <SubmitBasicBtn searchName={searchNameCharacter} />
      </fieldset>
    </form>
  );
};
