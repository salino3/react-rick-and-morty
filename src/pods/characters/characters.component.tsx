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

      swiper.params.speed = 300;
      // swiper.setTransition(300);
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

  const [searchNameCharacter, setSearchNameCharacter] = useState<string>("");
  const [resultData, setResultData] = useState<ResultCharacters[]>([]);

  useEffect(() => {
    searchCharactersByName(searchNameCharacter)
      .then((res) => {
        setResultData(res && Array.isArray(res.results) ? res.results : []);
      })
      .catch((err) => {
        console.error("Error loading characters:", err);
        setResultData([]);
      });
  }, [searchNameCharacter]);

  //
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update(); // Ricalcola le slide e aggiorna i cloni del loop
      if (swiperRef.current.autoplay) {
        swiperRef.current.autoplay.stop();
        swiperRef.current.autoplay.start(); // Forza il riavvio immediato dell'autoscroll
      }
    }
    if (swiperRef02.current) {
      swiperRef02.current.update();
      if (swiperRef02.current.autoplay) {
        swiperRef02.current.autoplay.stop();
        swiperRef02.current.autoplay.start();
      }
    }
  }, [resultData]);

  const currentSlidesPerView = dimensions?.width > 650 ? 2 : 1;

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
    const swiper = swiperRef.current;
    if (swiper && swiper.autoplay) {
      swiper.autoplay.stop();
      swiper.params.speed = 300;
      // swiper.setTransition(300);
      swiper.slideToClosest(300, false);
    }
  };

  const handleMouseLeave = () => {
    const swiper = swiperRef.current;
    if (swiper && swiper.autoplay) {
      swiper.params.speed = 6000;
      swiper.autoplay.paused = false;
      swiper.autoplay.start();
    }
  };

  // swiperSettings02
  const swiperSettings02: SwiperProps = {
    modules: [Pagination, Autoplay],
    pagination: { clickable: true },
    loop: true,
    slidesPerView: currentSlidesPerView,
    spaceBetween: 20,
    allowTouchMove: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: true,
    },
    speed: 6000,
    className: "mySwiper",
    onSwiper: (swiper) => {
      swiperRef02.current = swiper;
    },
    onPaginationRender: (swiper) => {
      setupFastPagination(swiper);
    },
  };

  const handleMouseEnter02 = () => {
    const swiper = swiperRef02.current;
    if (swiper && swiper.autoplay) {
      swiper.autoplay.stop();
      swiper.params.speed = 300;
      // swiper.setTransition(300);
      swiper.slideToClosest(300, false);
    }
  };

  const handleMouseLeave02 = () => {
    const swiper = swiperRef02.current;
    if (swiper && swiper.autoplay) {
      swiper.params.speed = 6000;
      swiper.autoplay.paused = false;
      swiper.autoplay.start();
    }
  };

  return (
    <div ref={divRef} className="rootCharacters">
      <h1>Characters!</h1>

      <FormSearchCharacter
        searchNameCharacter={searchNameCharacter}
        setSearchNameCharacter={setSearchNameCharacter}
      />

      <div
        className="carrouselResultsWrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {resultData.length === 0 ? (
          <strong>There are no Characters</strong>
        ) : (
          <Swiper {...swiperSettings}>
            {resultData.slice(0, 10).map((data: ResultCharacters) => (
              <SwiperSlide key={`top-${data.id}`}>
                <CardCharacter data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {resultData.length > 10 && (
        <div
          className="carrouselResultsWrapper02"
          onMouseEnter={handleMouseEnter02}
          onMouseLeave={handleMouseLeave02}
        >
          <Swiper {...swiperSettings02}>
            {resultData.slice(10, 20).map((data: ResultCharacters) => (
              <SwiperSlide key={`bottom-${data.id}`}>
                <CardCharacter data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
