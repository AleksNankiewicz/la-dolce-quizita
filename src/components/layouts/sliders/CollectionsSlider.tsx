"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ThreeDots } from "react-loader-spinner";
import { Collection } from "@prisma/client";
import SliderLabel from "./SliderLabel";

type CollectionsSliderProps = {
  collections: Collection[];
  title: string;
  seeAllLink?: string;
};

const CollectionsSlider = ({
  collections,
  title,
  seeAllLink,
}: CollectionsSliderProps) => {
  const animation = { duration: 20000, easing: (t: number) => t };
  const [loading, setLoading] = useState(true);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: true,
    mode: "free",
    renderMode: "performance",
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 13,
        },
      },
    },
    slides: {
      perView: 2,
      spacing: 13,
    },

    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  if (loading) {
    return (
      <div className="relative mx-2 flex h-[180px] w-full items-center justify-center sm:h-[240px] md:h-[200px] lg:h-[280px]">
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="white"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <SliderLabel title={title} seeAllLink={seeAllLink} />
      <div ref={sliderRef} className="keen-slider">
        <div className="from-background-950 absolute -left-2 top-0 z-20 h-full w-16 bg-gradient-to-r to-background/0"></div>
        <div className="from-background-950 absolute -right-2 top-0 z-20 h-full w-20 bg-gradient-to-l to-background/0"></div>

        {collections.map((collection) => (
          <div
            key={collection.id}
            className="keen-slider__slide relative flex h-[150px] rounded-xl"
          >
            <Link
              href={`/collections/${collection.slug}`}
              className="h-full w-full"
            >
              <div className="relative h-full w-full">
                {collection.img && (
                  <Image
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    blurDataURL={collection.img}
                    placeholder="blur"
                    src={collection.img}
                    fill
                    alt={collection.title}
                    className="object-cover brightness-[0.60] duration-300 group-hover:scale-125"
                  />
                )}
              </div>
              {collection.title && (
                <p
                  className={`absolute bottom-2 left-2 flex w-full items-center justify-start px-2 text-lg font-semibold text-white`}
                >
                  {collection.title}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsSlider;
