import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubmitBasicBtn } from "./submit-search-button.component";

let mockPending: boolean = false;
let mockFormData: FormData | null = null;

vi.mock("react", async (importOriginal) => {
  const actualReact = await importOriginal<typeof import("react")>();
  return { ...actualReact };
});

vi.mock("react-dom", async (importOriginal) => {
  const actualReactDom = await importOriginal<typeof import("react-dom")>();
  return {
    ...actualReactDom,
    useFormStatus: () => ({ pending: mockPending, data: mockFormData }),
  };
});

const renderComponent = (searchName = "") => {
  const utils = render(<SubmitBasicBtn searchName={searchName} />);
  return { ...utils };
};

describe("SubmitBasicBtn Component", () => {
  beforeEach(() => {
    mockPending = false;
    mockFormData = null;
  });

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

  it("Check form is sending data, the button must change his text to 'Loading...' and it must be disabled", () => {
    mockPending = true;

    renderComponent();

    const textBtn = screen.queryByText("Loading...");
    expect(textBtn).not.toBeNull();

    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("Avoid petition duplicated, if current input value 'liveValue' is egual to 'searchName', the button must be desabled", () => {
    const inputContainer = document.createElement("input");

    inputContainer.setAttribute("id", "name");
    inputContainer.value = "sa";
    document.body.appendChild(inputContainer);

    mockPending = false;

    renderComponent("sa");

    fireEvent.input(inputContainer);

    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);

    document.body.removeChild(inputContainer);
  });
});
