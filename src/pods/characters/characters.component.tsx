import type React from "react";
import { useEffect, useState } from "react";
// import { default as Slider } from "react-slick";
import Slider from "react-slick";

import { searchCharactersByName } from "../../utils/fetch-characters";
import type { ResultCharacters } from "../../store/interface";
// Slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//
import "./characters.styles.scss";

export const Characters: React.FC = () => {
  const [nameCharacter, setNameCharacter] = useState<string>("");

  const [resultData, setResultData] = useState<ResultCharacters[]>([]);

  //
  useEffect(() => {
    searchCharactersByName(nameCharacter).then((res) =>
      setResultData(res && res.results.length > 0 ? res.results : []),
    );
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipe: false, // Disables touch swipe
    draggable: false, // Disables mouse drag
    touchMove: false, // Prevents touch movement on mobile devices
    arrows: false, // Hides the default slick 'Slide' arrows
  };

  return (
    <div className="rootCharacters">
      <h1>Characters!</h1>
      <div className="carouselResultsWrapper">
        <Slider {...settings}>
          {resultData && resultData.length === 0 ? (
            <strong> There is no Characters</strong>
          ) : (
            resultData.map((data: ResultCharacters) => (
              <div key={data.id} className="cardCharacter">
                <h3>{data.name}</h3>
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );
};
