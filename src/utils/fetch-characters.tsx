import { constants } from "../config/constants";

export async function getCharacters(id: string) {
  try {
    const response = await fetch(
      `${constants.CHARACTERS}${id ? `/${id}` : ""}`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error: any) {
    console.error(error?.message);
  }
}

//

export async function searchCharactersByName(name: string) {
  try {
    const response = await fetch(
      `${constants.CHARACTERS}${name ? `/?name=${name}` : ""}`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(error?.message);
  }
}
