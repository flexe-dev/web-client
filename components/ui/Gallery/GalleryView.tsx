"use client";

import { useAccountUser } from "@/components/context/User/AccountUserProvider";
import { images } from "@/lib/placeholder";
import { motion } from "framer-motion";
import { GalleryTile } from "./GalleryTile";

const GalleryView = () => {
  const { account } = useAccountUser();
  if (!account) return null;
  return (
    <motion.section
      layout={"position"}
      className="pt-8 flex relative flex-col w-full min-h-screen items-center"
    >
      <motion.h1 layout key={"gallery-header"} className="text-4xl font-bold">
        Gallery
      </motion.h1>
      <motion.h2
        layout
        key={"gallery-sub-title"}
        className="text-center my-2  max-w-screen-md text-lg text-secondary-header"
      >
        A handpicked curated collection of special Portfolios, Projects,
        Animations and overall cool designs that you may find inspiration from.
      </motion.h2>
      <motion.section
        layout="preserve-aspect"
        className="relative flex flex-wrap justify-center pl-12 pr-16 mt-4 py-8 items-center border-t-2 group/gallery-tile"
        key={"gallery-tile-section"}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <GalleryTile
            index={index}
            key={`gallery-tile-${index}`}
            creator={account.user}
            title="Placeholder Title"
            link="/explore"
            image={images[index % images.length]}
          />
        ))}
      </motion.section>
    </motion.section>
  );
};

export default GalleryView;
