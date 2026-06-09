import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ResultCharacters } from "../../../../store/interface";
import { CardCharacter } from "./card-character.component";
import "./card-character.styles.scss";

const mockCharacter: ResultCharacters = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

describe("CardCharacter Component", () => {
  it("renders the correct label", () => {
    render(<CardCharacter data={mockCharacter} />);

    const nameCharacter = screen.getByText(mockCharacter.name);
    expect(nameCharacter).not.toBeNull();
  });

  it("has correct WCAG accessibility attributes", () => {
    render(<CardCharacter data={mockCharacter} />);

    // 1. The card is an article element
    const article = screen.getByRole("article");
    expect(article).not.toBeNull();

    // 2. The card is focusable (tabIndex="0")
    expect(article.getAttribute("tabindex")).toBe("0");

    // 3. The card is labelled by the heading
    const heading = screen.getByRole("heading", {
      level: 3,
      name: mockCharacter.name,
    });
    expect(heading).not.toBeNull();
    const headingId = heading.getAttribute("id");
    expect(headingId).toBe(`char-name-${mockCharacter.id}`);
    expect(article.getAttribute("aria-labelledby")).toBe(headingId);

    // 4. The image has a descriptive alt text
    const image = screen.getByRole("img");
    expect(image.getAttribute("alt")).toBe(`Portrait of ${mockCharacter.name}`);
    expect(image.getAttribute("src")).toBe(mockCharacter.image);

    // 5. The status indicator is hidden from screen readers
    const statusIndicator = article.querySelector(".status-indicator");
    expect(statusIndicator).not.toBeNull();
    expect(statusIndicator?.getAttribute("aria-hidden")).toBe("true");
    expect(statusIndicator?.classList.contains("status-alive")).toBe(true);

    // 6. Screen reader only labels are present
    expect(screen.getByText("Status:").classList.contains("sr-only")).toBe(
      true,
    );
    expect(screen.getByText("Species:").classList.contains("sr-only")).toBe(
      true,
    );
    expect(screen.getByText("Gender:").classList.contains("sr-only")).toBe(
      true,
    );
    expect(screen.getByText("Origin:").classList.contains("sr-only")).toBe(
      true,
    );
    expect(
      screen.getByText("Last known location:").classList.contains("sr-only"),
    ).toBe(true);
  });

  it("does not render Type section when type is empty", () => {
    render(<CardCharacter data={mockCharacter} />);
    expect(screen.queryByText("Type:")).toBeNull();
  });

  it("renders Type section when type is provided", () => {
    const characterWithType: ResultCharacters = {
      ...mockCharacter,
      type: "Super Scientist",
    };
    render(<CardCharacter data={characterWithType} />);

    const typeLabel = screen.getByText("Type:");
    expect(typeLabel).not.toBeNull();
    expect(typeLabel.classList.contains("sr-only")).toBe(true);
    expect(screen.getByText("Super Scientist")).not.toBeNull();
  });

  it("applies the 'sr-only' accessibility class to the Type label", () => {
    const characterWithType: ResultCharacters = {
      ...mockCharacter,
      type: "Super Scientist",
    };
    render(<CardCharacter data={characterWithType} />);

    // 1. Prove that screen readers can find and read it
    const typeLabel = screen.getByText("Type:");
    expect(typeLabel).toBeTruthy();

    // 2. Prove it is visually hidden by ensuring it has the sr-only class
    expect(typeLabel.classList.contains("sr-only")).toBe(true);

    // 3. Prove that the value is rendered next to it
    const typeValue = screen.getByText("Super Scientist");
    expect(typeValue).toBeTruthy();
  });

  it("renders Type section so that ONLY screen readers can read it", () => {
    const characterWithType: ResultCharacters = {
      ...mockCharacter,
      type: "Super Scientist",
    };

    // 1. Manually inject the .sr-only CSS rules into jsdom so Jest can read them
    const style = document.createElement("style");
    style.innerHTML = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
  `;
    document.head.appendChild(style);

    render(<CardCharacter data={characterWithType} />);

    // 2. Prove screen readers can find it
    const typeLabel = screen.getByTestId("type-label");
    expect(typeLabel).toBeTruthy();

    //  Double check the text content inside that specific element matches
    expect(typeLabel.textContent).toContain("Type:");

    // 3. Prove sighted users can not see it
    const computedStyles = window.getComputedStyle(typeLabel);
    expect(computedStyles.position).toBe("absolute");
    expect(computedStyles.width).toBe("1px");
    expect(computedStyles.height).toBe("1px");
    expect(computedStyles.overflow).toBe("hidden");

    // Clean up the style tag after the test finishes
    document.head.removeChild(style);
  });

  it("applies correct status indicator class for Dead status", () => {
    const deadCharacter: ResultCharacters = {
      ...mockCharacter,
      status: "Dead",
    };
    const { container } = render(<CardCharacter data={deadCharacter} />);

    const statusIndicator = container.querySelector(".status-indicator");
    expect(statusIndicator?.classList.contains("status-dead")).toBe(true);
  });

  it("applies correct status indicator class for unknown status", () => {
    const unknownCharacter: ResultCharacters = {
      ...mockCharacter,
      status: "unknown",
    };
    const { container } = render(<CardCharacter data={unknownCharacter} />);

    const statusIndicator = container.querySelector(".status-indicator");
    expect(statusIndicator?.classList.contains("status-unknown")).toBe(true);
  });
});
