"use client";

import React from "react";
import { LayoutGroup, motion } from "framer-motion";
import { GalleryTile } from "./GalleryTile";
import { useAccount } from "@/components/context/AccountProvider";
import PlaceholderImage from "@/public/original-2f558c29eac9dc162da8e1ab9efe3d53.png";
import { ImageProps } from "next/image";
const GalleryView = () => {
  const { user } = useAccount();
  const image: ImageProps = {
    src: PlaceholderImage,
    alt: "Placeholder Image",
  };
  if (!user) return null;
  return (
    <motion.section
      layout
      className="py-12 px-4 flex relative flex-col w-full min-h-screen items-center"
    >
      <motion.h1 layout key={"gallery-header"} className="text-4xl font-bold">
        Gallery
      </motion.h1>
      <motion.h2
        layout
        key={"gallery-sub-title"}
        className="text-center my-2 h-24 max-w-screen-md text-lg text-secondary-header"
      >
        A handpicked curated collection of special Portfolios, Projects,
        Animations and overall cool designs that you may find inspiration from.
      </motion.h2>
      <motion.section
        layout="preserve-aspect"
        className="relative flex flex-wrap justify-center p-4 items-center border-t group/gallery-tile"
        key={"gallery-tile-section"}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <GalleryTile
            index={index}
            key={`gallery-tile-${index}`}
            creator={user}
            title="Placeholder Title"
            link="/inspiration"
            image={image}
          />
        ))}
      </motion.section>
    </motion.section>
  );
};

export default GalleryView;
