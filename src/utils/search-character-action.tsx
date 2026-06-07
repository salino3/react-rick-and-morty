export interface CharacterSearchAction {
  success: boolean;
  error: string;
  name?: string;
}

//
export async function searchCharactersAction(
  prevState: CharacterSearchAction,
  formData: FormData,
): Promise<CharacterSearchAction> {
  try {
    const name = formData.get("name") as string;

    return { success: true, error: "", name: name };
  } catch (err) {
    return { success: false, error: "Failed to search books" };
  }
}
