import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubmitBasicBtn } from "./submit-search-button.component";

vi.mock("react", async (importOriginal) => {
  const actualReact = await importOriginal<typeof import("react")>();
  return {
    ...actualReact,
  };
});

const renderComponent = (searchName = "") => {
  const utils = render(<SubmitBasicBtn searchName={searchName} />);
  return { ...utils };
};

describe("SubmitBasicBtn Component", () => {
  it("Check when component is mounted, there is visible the text 'Search Character' and the magnifying icon on the button", () => {
    renderComponent();

    const iconAriaLbel = screen.queryByLabelText(/Magnifying Glass Icon/i);
    expect(iconAriaLbel).not.toBeNull();

    const iconDataTestId = screen.getByTestId("magnifying-glass-icon");
    expect(iconDataTestId).toBeTruthy();

    //
    const textBtn = screen.queryByText("Search Character");

    expect(textBtn).not.toBe(null);
    expect(textBtn?.matches("Search Character"));
  });
});
