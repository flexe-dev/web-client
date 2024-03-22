"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { useMediaQuery } from "react-responsive";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../carousel";
import AutoScroll from "embla-carousel-auto-scroll";
export interface CreationProps {
  creationImage?: ImageProps;
  creatorImage?: ImageProps;
  companyIcon?: JSX.Element;
  title: string;
  link?: string;
}

interface Props {
  children: React.ReactNode;
}

interface TileProps {
  creation: CreationProps;
  translation?: MotionValue<number>;
}

const creations = [
  { title: "a" },
  { title: "b" },
  { title: "c" },
  { title: "d" },
  { title: "e" },
  { title: "f" },
  { title: "g" },
  { title: "h" },
  { title: "i" },
];

export const CreationParallaxWrapper = (props: Props) => {
  const [desktopDim, setDesktopDim] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width: 768px)" });
  useEffect(() => {
    setDesktopDim(desktop);
  }, [desktop]);

  const { children } = props;
  const firstRow = creations.slice(0, desktopDim ? 4 : 8);
  const secondRow = creations.slice(4, 8);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [30, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [0.1, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], desktopDim ? [-450, 0] : [-350, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className=" h-[120dvh]  md:h-[190dvh]  overflow-hidden  antialiased relative flex flex-col self-auto [perspective:750px] [transform-style:preserve-3d]"
    >
      {children}
      <motion.div
        className=" w-[110dvw]"
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <Carousel
          plugins={[
            AutoScroll({
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          opts={{
            align: "end",
            loop: true,
          }}
        >
          <CarouselContent className="mb-20  mt-8 md:min-w-[1800px]">
            {firstRow.map((creation, index) => (
              <CarouselItem
                key={`carousel-item-row-1-${index}`}
                className=" md:basis-1/3 mx-8"
              >
                <CreationTile creation={creation} key={creation.title} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          plugins={[
            AutoScroll({
              direction: "forwards",
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="hidden md:block"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="mt-8 mb-20 min-w-[1800px] relative">
            {secondRow.map((creation, index) => (
              <CarouselItem
                key={`carousel-item-row-2-${index}`}
                className="basis-1/3 mx-8 "
              >
                <CreationTile creation={creation} key={creation.title} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </div>
  );
};

const CreationTile = (props: TileProps) => {
  const { creation, translation } = props;
  return (
    <motion.div
      className="relative group/userdesign w-full px-[2rem] md:px-0   md:max-w-[35rem]  lg:max-w-[39rem]  aspect-[3/2] md:aspect-[16/9] flex-shrink-0"
      style={{
        x: translation,
      }}
      whileHover={{
        y: -20,
      }}
      key={creation.title}
    >
      <div
        id="design-image-tile"
        className=" bg-slate-600 md:absolute z-[20] w-full  md:max-w-[33rem]  lg:max-w-[37rem] rounded-lg  aspect-[3/2] md:aspect-video  top-0 right-0 shadow-md shadow-neutral-800"
      ></div>
      <div
        id="creator-image-tile"
        className="absolute z-[30] bg-neutral-400 shadow-md shadow-neutral-800  rounded-xl w-[9rem] lg:w-[10rem] aspect-square flex-shrink-0 -bottom-4 lg:-bottom-[10%] left-1/3 md:-left-4 lg:-left-[10%]"
      >
        <div className=" hidden md:flex w-[3rem] aspect-square absolute left-3 bottom-3 rounded-full bg-blue-400 z-[40]"></div>
      </div>
    </motion.div>
  );
};
