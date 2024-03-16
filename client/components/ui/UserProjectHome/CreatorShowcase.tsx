"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import CreationTile from "./Tile";
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
    useTransform(scrollYProgress, [0, 0.5], [0.1, 1]),
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
      className=" w-[100dvw] h-[120dvh]  md:h-[190dvh]  overflow-hidden  antialiased relative flex flex-col self-auto [perspective:750px] [transform-style:preserve-3d]"
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
            {firstRow.map((creation) => (
              <CarouselItem className=" md:basis-1/3 mx-8">
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
              <CarouselItem className="basis-1/3 mx-8 ">
                <CreationTile creation={creation} key={creation.title} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </div>
  );
};
