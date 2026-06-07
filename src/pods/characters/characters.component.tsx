import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
// Import required modules (Pagination for the dot navigation)
import { Autoplay, Pagination } from "swiper/modules";
import { useResizeObserver } from "../../hooks";
import { searchCharactersByName } from "../../utils/fetch-characters";
import { CardCharacter, FormSearchCharacter } from "./components";
import type { ResultCharacters } from "../../store/interface";

// ⚠️ IMPORTANT: Mandatory Swiper styles
import "swiper/css";
import "swiper/css/pagination";
//
import "./characters.styles.scss";

//
const setupFastPagination = (swiper: SwiperType) => {
  const bullets = swiper.pagination.bullets;
  if (!bullets) return;

  bullets.forEach((bullet, index) => {
    const newBullet = bullet.cloneNode(true) as HTMLElement;
    bullet.parentNode?.replaceChild(newBullet, bullet);
    bullets[index] = newBullet;

    newBullet.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      swiper.slideToLoop(index, 300);

      if (swiper.autoplay) {
        swiper.autoplay.stop();
      }
    });
  });
};

export const Characters: React.FC = () => {
  const [divRef, dimensions] = useResizeObserver<HTMLDivElement>();

  const swiperRef = useRef<SwiperType | null>(null);
  const swiperRef02 = useRef<SwiperType | null>(null);

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

  //
  const swiperSettings: SwiperProps = {
    // Load the pagination dot module
    modules: [Pagination, Autoplay],
    // Enable clickable pagination dots
    pagination: { clickable: true },
    // 🔄 TRUE INFINITE LOOP EFFECT ACTIVATED!
    loop: true,
    // Number of cards visible at the same time
    slidesPerView: dimensions?.width > 650 ? 2 : 1,
    // Space between cards (in pixels)
    spaceBetween: 20,
    // Allow touch/drag dragging
    allowTouchMove: true,

    // Configure 'Autoplay' for continuous crawl and hover pause
    autoplay: {
      delay: 0, // 0 delay forces it to immediately move to the next slide
      disableOnInteraction: false, // Prevents user interactions from permanently killing autoplay
      pauseOnMouseEnter: false, // ⏸️ Pauses the movement when mouse hovers over the container
    },
    speed: 6000, // 6000ms = 6 seconds per slide transition. Increase this number to make it even slower and smoother!

    //  Set the duration of the transition between slides (in milliseconds)
    className: "mySwiper",

    // Capture the instance when Swiper initializes
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
    onPaginationRender: (swiper) => {
      setupFastPagination(swiper);
    },
  };

  //
  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.paused = false;
      swiperRef.current.autoplay.start();
    }
  };

  // swiperSettings02
  const swiperSettings02: SwiperProps = {
    // Load the pagination dot module
    modules: [Pagination, Autoplay],
    // Enable clickable pagination dots
    pagination: { clickable: true },
    // 🔄 TRUE INFINITE LOOP EFFECT ACTIVATED!
    loop: true,
    // Number of cards visible at the same time
    slidesPerView: dimensions?.width > 650 ? 2 : 1,
    // Space between cards (in pixels)
    spaceBetween: 20,
    // Allow touch/drag dragging
    allowTouchMove: true,

    // Configure 'Autoplay' for continuous crawl and hover pause
    autoplay: {
      delay: 0, // 0 delay forces it to immediately move to the next slide
      disableOnInteraction: false, // Prevents user interactions from permanently killing autoplay
      pauseOnMouseEnter: false, // ⏸️ Pauses the movement when mouse hovers over the container
      reverseDirection: true,
    },
    speed: 6000, // 6000ms = 6 seconds per slide transition. Increase this number to make it even slower and smoother!

    //  Set the duration of the transition between slides (in milliseconds)
    className: "mySwiper",

    // Capture the instance when Swiper initializes
    onSwiper: (swiper) => {
      swiperRef02.current = swiper;
    },
    onPaginationRender: (swiper) => {
      setupFastPagination(swiper);
    },
  };

  //
  const handleMouseEnter02 = () => {
    if (swiperRef02.current) {
      swiperRef02.current.autoplay.stop();
    }
  };

  const handleMouseLeave02 = () => {
    if (swiperRef02.current) {
      swiperRef02.current.autoplay.paused = false;
      swiperRef02.current.autoplay.start();
    }
  };

  return (
    <div ref={divRef} className="rootCharacters">
      <h1>Characters!</h1>

      <FormSearchCharacter />

      {/* <div
        className="carrouselResultsWrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {resultData.length === 0 ? (
          <strong>There are no Characters</strong>
        ) : (
          <Swiper {...swiperSettings}>
            {resultData.slice(0, 10).map((data: ResultCharacters) => (
              <SwiperSlide key={data.id}>
                <CardCharacter data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
       <div
        className="carrouselResultsWrapper02"
        onMouseEnter={handleMouseEnter02}
        onMouseLeave={handleMouseLeave02}
      >
        {resultData.length === 0 ? (
          <strong>There are no Characters</strong>
        ) : (
          <Swiper {...swiperSettings02}>
            {resultData.slice(10, 20).map((data: ResultCharacters) => (
              <SwiperSlide key={data.id}>
                <CardCharacter data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div> */}
    </div>
  );
};
