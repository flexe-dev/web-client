"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "../button";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { InputChips, Chip } from "./InputChips";

interface AnimatedContainerProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

const mobileHeaderVars = {
  initial: {
    translateX: "-150%",
    transition: {
      duration: 0.25,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    translateX: "0%",
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.15,
    },
  },
};

const mobileLinkVars = {
  initial: {
    translateX: "-150%",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    translateX: "0%",
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.35,
    },
  },
};

const menuVars = {
  initial: {
    opacity: 0,
    scaleX: 0.75,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.25,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    opacity: 0,
    scaleX: 0.75,
    transition: {
      delay: 0.75,
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const contentPreference = [
  "Web Components",
  "Page Designs",
  "CSS Animations",
  "Landing Pages",
  "Software Mockups",
  "Mobile Designs",
  "Linux Homescreens",
];

const GallerySidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentSearchTags, setContentSearchTags] = useState<Chip[]>([]);
  const desktop = useMediaQuery({ query: "(min-width: 1024px)" });
  useEffect(() => {
    setSidebarOpen(desktop);
  }, [desktop]);
  return (
    <>
      <Button
        onClick={() => setSidebarOpen((prev) => !prev)}
        variant={"outline"}
        className={cn(
          "fixed mt-4 transition-all z-[80] ",
          sidebarOpen
            ? "left-[15rem] xl:left-[20rem] ease-in duration-300"
            : "left-[1rem] delay-700 duration-300"
        )}
      >
        <Bars3CenterLeftIcon className="w-8 h-8" />
      </Button>
      <AnimatedSidebar isOpen={sidebarOpen}>
        <>
          <AnimatedSection>
            <motion.h2
              variants={mobileHeaderVars}
              className="text-lg xl:text-xl"
            >
              Find Inspiration through
            </motion.h2>
            <div className="mx-6 my-2 flex flex-col space-y-2 text-muted-foreground group">
              {contentPreference.map((item, index) => (
                <motion.h3
                  variants={mobileLinkVars}
                  key={`content-preference-${index}`}
                  className="text-lg w-fit transition-colors font-semibold cursor-pointer group-hover:text-tertiary group-hover:hover:text-primary"
                >
                  - {item}
                </motion.h3>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <motion.h2
              variants={mobileHeaderVars}
              className="text-lg xl:text-xl"
            >
              Fiter by
            </motion.h2>
            <motion.div
              variants={mobileLinkVars}
              className="mx-6 my-2 flex flex-col space-y-2 text-muted-foreground group"
            >
              <InputChips
                content={contentSearchTags}
                setContent={setContentSearchTags}
                title="Tags"
              />
            </motion.div>
          </AnimatedSection>
        </>
      </AnimatedSidebar>
    </>
  );
};

export default GallerySidebar;

export const AnimatedSidebar = ({
  children,
  isOpen,
}: AnimatedContainerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          variants={menuVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="origin-left fixed top-[5rem] h-screen   w-[20rem] xl:w-[25rem] border-r"
        >
          <motion.div className="flex flex-col mt-12">{children}</motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export const AnimatedSection = ({ children }: AnimatedContainerProps) => {
  return (
    <motion.section
      variants={containerVars}
      initial="initial"
      animate="open"
      exit="initial"
      className="mx-4 my-4 "
    >
      {children}
    </motion.section>
  );
};
