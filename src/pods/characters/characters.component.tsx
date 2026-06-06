import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
// Import required modules (Pagination for the dot navigation)
import { Pagination } from "swiper/modules";

import { searchCharactersByName } from "../../utils/fetch-characters";
import type { ResultCharacters } from "../../store/interface";

// ⚠️ IMPORTANT: Mandatory Swiper styles
import "swiper/css";
import "swiper/css/pagination";
//
import "./characters.styles.scss";

export const Characters: React.FC = () => {
  const [nameCharacter] = useState<string>("");
  const [resultData, setResultData] = useState<ResultCharacters[]>([]);

  useEffect(() => {
    searchCharactersByName(nameCharacter)
      .then((res) => {
        setResultData(res && Array.isArray(res.results) ? res.results : []);
      })
      .catch((err) => {
        console.error("Error loading characters:", err);
        setResultData([]);
      });
  }, [nameCharacter]);

  //
  const swiperSettings: SwiperProps = {
    // Load the pagination dot module
    modules: [Pagination],
    // Enable clickable pagination dots
    pagination: { clickable: true },
    // 🔄 TRUE INFINITE LOOP EFFECT ACTIVATED!
    loop: true,
    // Number of cards visible at the same time
    slidesPerView: 2,
    // Space between cards (in pixels)
    spaceBetween: 20,
    // Allow touch/drag dragging
    allowTouchMove: true,
    className: "mySwiper",
  };

  return (
    <div className="rootCharacters">
      <h1>Characters!</h1>
      <div className="carouselResultsWrapper">
        {resultData.length === 0 ? (
          <strong>There are no Characters</strong>
        ) : (
          <Swiper {...swiperSettings}>
            {resultData.map((data: ResultCharacters) => (
              <SwiperSlide key={data.id}>
                <div className="cardCharacter">
                  <h3>{data.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
