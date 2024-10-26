"use client";
import { ChildNodeProps } from "@/lib/interface";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ImageProps } from "next/image";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Carousel, CarouselContent, CarouselItem } from "../Shared/carousel";
export interface CreationProps {
  creationImage?: ImageProps;
  creatorImage?: ImageProps;
  companyIcon?: JSX.Element;
  title: string;
  link?: string;
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
  { title: "j" },
];

export const CreationParallaxWrapper = (props: ChildNodeProps) => {
  const [desktopDim, setDesktopDim] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width: 768px)" });
  useEffect(() => {
    setDesktopDim(desktop);
  }, [desktop]);

  const { children } = props;
  const firstRow = creations.slice(0, desktopDim ? 4 : 8);
  const secondRow = creations.slice(4, 9);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { scrollXProgress } = useScroll({
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
    useTransform(scrollYProgress, [0, 0.2], [6, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      desktopDim ? [-450, -100] : [-350, 0]
    ),
    springConfig
  );

  const translateX = useSpring(
    useTransform(scrollXProgress, [0, 0.2], [0, 100]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className=" h-[120dvh]  md:h-[170dvh]  overflow-hidden  antialiased relative flex flex-col self-auto [perspective:750px] [transform-style:preserve-3d]"
    >
      {children}
      <motion.div
        className=" w-[100dvw]"
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="mb-10 ml-1 mt-8 ">
            {firstRow.map((creation, index) => (
              <CarouselItem
                key={`carousel-item-row-1-${index}`}
                className=" md:basis-1/3 mx-2"
              >
                <CreationTile creation={creation} key={creation.title} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Carousel
          className="hidden md:block"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="mt-8 mb-20 relative">
            {secondRow.map((creation, index) => (
              <CarouselItem
                key={`carousel-item-row-2-${index}`}
                className="basis-1/4 mx-2"
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
      className="relative group/userdesign w-full md:w-11/12 px-[2rem] md:px-0 md:max-w-[35rem] lg:max-w-[39rem] aspect-[3/2] md:aspect-[16/9] flex-shrink-0"
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
        className="bg-slate-600 md:absolute z-[20] w-full  md:max-w-[33rem]  lg:max-w-[37rem] rounded-lg  aspect-[3/2] md:aspect-video  top-0 right-0 shadow-md shadow-neutral-800 dark:shadow-transparent border-2 border-secondary-foreground"
      />
    </motion.div>
  );
};
