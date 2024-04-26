"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "../button";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { InputChips, Chip } from "./InputChips";
import {
  mobileHeaderVars,
  mobileLinkVars,
  menuVars,
  containerVars,
} from "@/app/gallery/animationValues";
import { BgTransitionButton } from "../AnimatedButton";
import { ScrollArea } from "../scroll-area";
import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
interface AnimatedContainerProps extends ChildNodeProps, ClassNameProp {}

const contentPreference = [
  "Web Components",
  "Page Designs",
  "CSS Animations",
  "Landing Pages",
  "Software Mockups",
  "Mobile Designs",
  "Linux Homescreens",
];

const GallerySidebarWrapper = ({ children }: ChildNodeProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentSearchTags, setContentSearchTags] = useState<Chip[]>([]);
  const [techStackTags, setTechStackTags] = useState<Chip[]>([]);
  const desktop = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    setSidebarOpen(desktop);
  }, [desktop]);

  const handleUpdateFilters = () => {
    //todo: Update Content Displayed Based on Submitted Filters
  };

  return (
    <motion.main className="relative flex">
      <Button
        onClick={() => setSidebarOpen((prev) => !prev)}
        variant={"outline"}
        className={cn(
          "fixed mt-4 z-[30] transition-all backdrop-blur-lg",
          sidebarOpen
            ? "left-[15rem] ease-in duration-300"
            : "left-[1rem] delay-200 duration-300 ease-in"
        )}
      >
        <Bars3CenterLeftIcon className="w-8 h-8" />
      </Button>

      <AnimatePresence>
        {sidebarOpen && (
          <AnimatedSidebar key={"gallery-sidebar"}>
            <>
              <AnimatedSection>
                <SidebarSubHeader>Find Inspiration through</SidebarSubHeader>
                <SidebarContentWrapper>
                  {contentPreference.map((item, index) => (
                    <motion.h3
                      variants={mobileLinkVars}
                      key={`content-preference-${index}`}
                      className="text-lg w-fit transition-colors font-semibold cursor-pointer group-hover:text-tertiary group-hover:hover:text-primary"
                    >
                      - {item}
                    </motion.h3>
                  ))}
                </SidebarContentWrapper>
              </AnimatedSection>
              <AnimatedSection className="flex flex-col">
                <SidebarSubHeader>Fiter by</SidebarSubHeader>
                <SidebarContentWrapper>
                  <InputChips
                    sectionID={"content-search-tags"}
                    className="mb-4"
                    content={contentSearchTags}
                    setContent={setContentSearchTags}
                    key={"content-search-tags"}
                    title="Tags"
                  />
                  <InputChips
                    sectionID={"tech-stack-tags"}
                    content={techStackTags}
                    setContent={setTechStackTags}
                    key={"tech-stack-tags"}
                    title="Tech Stack"
                  />
                  <motion.div layout key={"filter-submit"}>
                    <BgTransitionButton className="w-full my-4">
                      Apply Filters
                    </BgTransitionButton>
                  </motion.div>
                </SidebarContentWrapper>
              </AnimatedSection>
            </>
          </AnimatedSidebar>
        )}
        {children}
        {sidebarOpen && (
          <motion.div
            layout
            key={"sidebar-overlay"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/90 z-[50] lg:hidden "
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default GallerySidebarWrapper;

export const AnimatedSidebar = ({ children }: AnimatedContainerProps) => {
  return (
    <motion.aside
      layout
      key={"animated-sidebar"}
      variants={menuVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="origin-left z-[60] lg:z-0 fixed pt-4 lg:sticky h-screen bg-background top-[5rem] min-w-[20rem] w-[20rem] border-r-2 "
    >
      <ScrollArea className="h-[95dvh]">
        <motion.div className="flex flex-col sticky top-[6rem] pt-12 ">
          {children}
        </motion.div>
      </ScrollArea>
    </motion.aside>
  );
};

export const AnimatedSection = ({
  children,
  className,
}: AnimatedContainerProps) => {
  return (
    <motion.section
      variants={containerVars}
      initial="initial"
      animate="open"
      exit="initial"
      className={cn("mx-4 my-4", className)}
    >
      {children}
    </motion.section>
  );
};

const SidebarSubHeader = ({ children }: AnimatedContainerProps) => {
  return (
    <motion.h2 variants={mobileHeaderVars} className="text-lg">
      {children}
    </motion.h2>
  );
};

const SidebarContentWrapper = ({
  children,
  className,
}: AnimatedContainerProps) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className={cn(
        "mx-6 my-2 flex flex-col space-y-2 text-muted-foreground group",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
