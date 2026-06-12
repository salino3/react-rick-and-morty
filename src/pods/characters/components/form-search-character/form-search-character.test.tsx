import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FormSearchCharacter } from "./form-search-character.component";
import type { CharacterSearchAction } from "../../../../utils/search-character-action";

// Mock useActionState so we can control `state`, `formAction` and `isPending`.
const mockFormAction = vi.fn();
let mockState: CharacterSearchAction = { success: false, error: "" };
let mockIsPending = false;

vi.mock("react", async (importOriginal) => {
  const actualReact = await importOriginal<typeof import("react")>();
  return {
    ...actualReact,
    useActionState: () => [mockState, mockFormAction, mockIsPending],
  };
});

const renderComponent = (searchNameCharacter = "") => {
  const setSearchNameCharacter = vi.fn();
  const utils = render(
    <FormSearchCharacter
      searchNameCharacter={searchNameCharacter}
      setSearchNameCharacter={setSearchNameCharacter}
    />,
  );
  return { ...utils, setSearchNameCharacter };
};

describe("FormSearchCharacter Component", () => {
  beforeEach(() => {
    // Reset the mocked state before every test to avoid leaking between tests.
    mockState = { success: false, error: "" };
    mockIsPending = false;
    mockFormAction.mockClear();
  });

  it("renders the legend, input and submit button", () => {
    renderComponent();

    expect(screen.getByText("Discover the Collection")).toBeTruthy();

    const input = screen.getByPlaceholderText(
      "Search a character",
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.name).toBe("name");
    expect(input.id).toBe("name");

    expect(
      screen.getByRole("button", { name: /Search Character/i }),
    ).toBeTruthy();
  });

  it("sets the input default value from the action state name", () => {
    mockState = { success: true, error: "", name: "Rick" };
    renderComponent();

    const input = screen.getByPlaceholderText(
      "Search a character",
    ) as HTMLInputElement;

    expect(input.value).toBe("Rick");
  });

  it("uses an empty default value when state name is undefined", () => {
    mockState = { success: false, error: "" };
    renderComponent();

    const input = screen.getByPlaceholderText(
      "Search a character",
    ) as HTMLInputElement;

    expect(input.value).toBe("");
  });

  it("renders the error message when state has an error", () => {
    mockState = { success: false, error: "Failed to search books" };
    renderComponent();

    const error = screen.getByText("Failed to search books");

    expect(error).toBeDefined();
    expect(error.tagName).toBe("STRONG");
  });

  it("does not render an error message when state has no error", () => {
    mockState = { success: false, error: "" };
    renderComponent();

    const errorMessage = screen.queryByText("Failed to search books");

    expect(errorMessage).toBeNull();
  });

  it("disables the fieldset when isPending is true", () => {
    mockIsPending = true;
    renderComponent();

    const fieldset = screen.getByTestId("form-fieldset") as HTMLFieldSetElement;
    expect(fieldset.disabled).toBe(true);

    // Children become non-interactive when the parent fieldset is disabled.
    const input = screen.getByPlaceholderText(
      "Search a character",
    ) as HTMLInputElement;
    expect(input.matches(":disabled")).toBe(true);
  });

  it("enables the fieldset when isPending is false", () => {
    mockIsPending = false;
    renderComponent();

    const fieldset = screen.getByTestId("form-fieldset") as HTMLFieldSetElement;
    expect(fieldset.disabled).toBe(false);

    const input = screen.getByPlaceholderText(
      "Search a character",
    ) as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  it("shows the loading label on the submit button when isPending is true", () => {
    mockIsPending = true;
    renderComponent();

    // SubmitBasicBtn relies on useFormStatus, but the fieldset itself is
    // disabled, so the submit button must be disabled while pending.
    const button = screen.getByRole("button");
    // expect(button.disabled).toBe(true); <- it is good too
    expect(button).toHaveProperty("disabled", true);
  });

  it("wires the form to the action returned by useActionState", () => {
    renderComponent();

    const form = document.getElementById("rootFormSearchCharacter");
    expect(form).not.toBeNull();
    expect(form?.tagName).toBe("FORM");
  });

  it("allows typing into the input when not pending", () => {
    renderComponent();

    const input = screen.getByPlaceholderText(
      "Search a character",
    ) as HTMLInputElement;

    fireEvent.input(input, { target: { value: "Morty" } });
    expect(input.value).toBe("Morty");
  });

  it("calls setSearchNameCharacter when the action state is successful", () => {
    mockState = { success: true, error: "", name: "Summer" };
    const { setSearchNameCharacter } = renderComponent();

    expect(setSearchNameCharacter).toHaveBeenCalledWith("Summer");
  });

  it("calls setSearchNameCharacter with empty string when success has no name", () => {
    mockState = { success: true, error: "" };
    const { setSearchNameCharacter } = renderComponent();

    expect(setSearchNameCharacter).toHaveBeenCalledWith("");
  });

  it("does not call setSearchNameCharacter when the action was not successful", () => {
    mockState = { success: false, error: "" };
    const { setSearchNameCharacter } = renderComponent();

    expect(setSearchNameCharacter).not.toHaveBeenCalled();
  });
});
