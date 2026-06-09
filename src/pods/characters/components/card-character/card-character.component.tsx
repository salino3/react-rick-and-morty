import type React from "react";
import type { ResultCharacters } from "../../../../store/interface";
import "./card-character.styles.scss";

interface Props {
  data: ResultCharacters;
}

export const CardCharacter: React.FC<Props> = ({ data }) => {
  const headingId = `char-name-${data.id}`;

  return (
    <article className="cardCharacter" aria-labelledby={headingId} tabIndex={0}>
      <h3 id={headingId}>{data.name}</h3>
      <img
        src={data.image}
        alt={`Portrait of ${data.name}`}
        className="cardCharacter__image"
      />
      <div className="cardCharacter__details">
        <p>
          <span className="sr-only">Status: </span>
          <span
            className={`status-indicator status-${data.status.toLowerCase()}`}
            aria-hidden="true"
          />
          {data.status}
        </p>
        <p>
          <span className="sr-only">Species: </span>
          {data.species}
        </p>
        {data.type && (
          <p>
            <span className="sr-only">Type: </span>
            {data.type}
          </p>
        )}
        <p>
          <span className="sr-only">Gender: </span>
          {data.gender}
        </p>
        <p>
          <span className="sr-only">Origin: </span>
          Origin: {data.origin.name}
        </p>
        <p>
          <span className="sr-only">Last known location: </span>
          Location: {data.location.name}
        </p>
      </div>
    </article>
  );
};
