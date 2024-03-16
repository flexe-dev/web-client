import React from "react";
import { motion, MotionValue } from "framer-motion";
import { CreationProps } from "./CreatorShowcase";

interface Props {
  creation: CreationProps;
  translation?: MotionValue<number>;
}

function CreationTile(props: Props) {
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
}

export default CreationTile;
