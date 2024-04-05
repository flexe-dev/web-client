"use client";

import React from "react";
import { motion } from "framer-motion";
const GalleryView = () => {
  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      <motion.h1 layout key={"gallery-header"} className="text-4xl font-bold">
        Gallery
      </motion.h1>
      <motion.h2
        layout
        key={"gallery-sub-title"}
        className="text-center h-32 my-2 text-lg text-secondary-header"
      >
        A handpicked curated collection of special Portfolios, Projects,
        Animations and overall cool designs that you may find inspiration from.
      </motion.h2>
      <section>
        
      </section>
    </div>
  );
};

export default GalleryView;
