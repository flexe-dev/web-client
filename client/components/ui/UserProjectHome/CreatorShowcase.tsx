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
import CreationTile from "./Tile";
import { useMediaQuery } from "react-responsive";

export interface CreationProps {
  creationImage?: ImageProps;
  creatorImage?: ImageProps;
  companyIcon?: JSX.Element;
  title: string;
  link?: string;
}

interface Props {
  children: React.ReactNode;
  creations: CreationProps[];
}

export const CreationParallaxWrapper = (props: Props) => {
  const [desktopDim, setDesktopDim] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width: 768px)" });
  useEffect(() => {
    setDesktopDim(desktop);
  }, [desktop]);

  const { children, creations } = props;
  const firstRow = creations.slice(0, desktopDim ? 2 : 1);
  const secondRow = creations.slice(2, desktopDim ? 4 : 3);
  const thirdRow = creations.slice(4, desktopDim ? 6 : 5);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 2], desktopDim ? [0, 400] : [0, 0]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 2], desktopDim ? [0, -400] : [0, 0]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [30, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], desktopDim ? [-400, 0] : [-150, 0]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[130dvh]  md:h-[180dvh] px-12 lg:px-24 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:750px] [transform-style:preserve-3d]"
    >
      {children}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex w-full flex-row-reverse space-x-reverse space-x-10 mb-10 ">
          {firstRow.map((creation) => (
            <CreationTile
              creation={creation}
              translation={translateXReverse}
              key={creation.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((creation) => (
            <CreationTile
              creation={creation}
              translation={translateX}
              key={creation.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
