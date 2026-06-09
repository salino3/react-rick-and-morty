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
    expect(nameCharacter).toBeTruthy();
  });
});
