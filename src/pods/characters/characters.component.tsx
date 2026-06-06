import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
// Import required modules (Pagination for the dot navigation)
import { Autoplay, Pagination } from "swiper/modules";

import { searchCharactersByName } from "../../utils/fetch-characters";
import type { ResultCharacters } from "../../store/interface";

// ⚠️ IMPORTANT: Mandatory Swiper styles
import "swiper/css";
import "swiper/css/pagination";
//
import "./characters.styles.scss";

export const Characters: React.FC = () => {
  const [nameCharacter, setNameCharacter] = useState<string>("");
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
    modules: [Pagination, Autoplay],
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

    // Configure 'Autoplay' for continuous crawl and hover pause
    autoplay: {
      delay: 0, // 0 delay forces it to immediately move to the next slide
      disableOnInteraction: false, // Prevents user interactions from permanently killing autoplay
      pauseOnMouseEnter: true, // ⏸️ Pauses the movement when mouse hovers over the container
    },
    speed: 6000, // 6000ms = 6 seconds per slide transition. Increase this number to make it even slower and smoother!

    //  Set the duration of the transition between slides (in milliseconds)
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
