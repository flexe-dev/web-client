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
      className="relative group/userdesign w-full max-w-[30rem] md:w-[30rem] lg:w-[39rem]  aspect-[16/9] flex-shrink-0"
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
        className="bg-slate-600 absolute z-[20] w-full max-w-[28rem] md:w-[28rem] lg:w-[37rem] rounded-lg  aspect-video  top-0 right-0 shadow-md shadow-neutral-800"
      ></div>
      <div
        id="creator-image-tile"
        className="absolute z-[30] bg-neutral-400 shadow-md shadow-neutral-800 rounded-xl w-[7rem] md:w-[9rem] lg:w-[10rem] aspect-square flex-shrink-0 -bottom-4 md:bottom-0 -left-8 md:left-0"
      >
        <div className="w-[3rem] aspect-square absolute left-3 bottom-3 rounded-full bg-blue-400 z-[40]"></div>
      </div>
    </motion.div>
  );
}

export default CreationTile;
