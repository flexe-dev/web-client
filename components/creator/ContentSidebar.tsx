"use client";

import React, { useState } from "react";
import { CreatePost } from "@/lib/interface";
import { cn } from "@/lib/utils";
import {
  PhotoIcon,
  DocumentIcon,
  ArrowLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import TextBlock, { textTypes } from "./blocks/TextBlock";
import UserMediaBlock from "./blocks/UserMediaBlock";
import Image from "next/image";
import ImageBlock from "./blocks/ImageBlock";
import VideoBlock from "./blocks/VideoBlock";
import { ScrollArea } from "../ui/scroll-area";
import { useBlockDrag } from "../context/PostDragProvider";
import { DropAnimation, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import { usePostCreator } from "../context/PostCreatorProvider";
import Droppable from "../dnd/Droppable";

interface Props {
  postContent: CreatePost[];
}

type SidebarTab = "document" | "photo";

export const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.6",
      },
    },
  }),
};

const ContentSidebar = (props: Props) => {
  const { sidebarOpen, setSidebarOpen } = usePostCreator();
  const [activeTab, setActiveTab] = useState<SidebarTab>("photo");
  const { activeDragID } = useBlockDrag();
  const renderedContent: Record<SidebarTab, React.ReactNode> = {
    document: <DocumentTab />,
    photo: <ContentTab postContent={props.postContent} />,
  };

  return (
    <>
      <motion.aside
        initial={{ width: "16rem" }}
        animate={{
          width: sidebarOpen ? "16rem" : "3rem",
          transition: {
            ease: [0, 0.55, 0.45, 1],
            duration: 0.25,
            delay: 0.05,
          },
        }}
        className={cn(
          `h-screen top-[5rem] z-[60] left-0 fixed border-t border-r-2 bg-background`
        )}
      >
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.2, delay: 0.2 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
            >
              <h1 className="flex border-b-2 divide-x-2">
                <Button
                  onClick={() => setActiveTab("document")}
                  variant={"outline"}
                  className={cn(
                    "flex border-0 rounded-none justify-center hover:bg-accent/50 items-center h-[2.25rem] w-full",
                    activeTab === "document" && "bg-accent  hover:bg-accent"
                  )}
                >
                  <DocumentIcon className="h-7 w-7 stroke-secondary-header" />
                </Button>
                <Button
                  onClick={() => setActiveTab("photo")}
                  variant={"outline"}
                  className={cn(
                    "border-0 rounded-none flex justify-center items-center h-[2.25rem] hover:bg-accent/50 w-full",
                    activeTab === "photo" && "bg-accent hover:bg-accent"
                  )}
                >
                  <PhotoIcon className="h-7 w-7 stroke-secondary-header" />
                </Button>
              </h1>

              {renderedContent[activeTab]}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          "h-8 w-8 bg-background rounded-full fixed top-[9rem] transition-all z-[61] duration-150",
          sidebarOpen ? "left-[15rem] delay-75" : "ml-[0.125rem] left-1"
        )}
      >
        <ChevronDoubleRightIcon
          className={cn(`w-5 h-5 transition-all`, sidebarOpen && "rotate-180")}
        />
      </Button>
      <motion.div
        initial={{ width: "18rem" }}
        animate={{
          width: sidebarOpen ? "18rem" : "3rem",
          transition: {
            ease: [0, 0.55, 0.45, 1],
            duration: 0.25,
            delay: 0.05,
          },
        }}
        className={`h-screen hidden lg:block
        }`}
      ></motion.div>
    </>
  );
};

export default ContentSidebar;

const ContentTab = ({ postContent }: Props) => {
  const content = ["block", "uploaded"] as const;
  type ContentType = (typeof content)[number];
  const [renderedContent, setRenderedContent] = useState<ContentType>("block");
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="w-full text-center mb-4 font-semibold py-2 border-b-2">
        {renderedContent === "block" ? "Visuals" : "Uploaded"}
      </h2>
      {renderedContent === "block" ? (
        <>
          <div
            className="relative w-5/6 max-w-[83.33%] mx-4 my-2 h-[8rem] cursor-pointer rounded-md border-2 border-transparent hover:border-primary"
            onClick={() => {
              setRenderedContent("uploaded");
            }}
          >
            <UserMediaBlock thumbnail={postContent?.at(0)} />
          </div>

          <ImageBlock />

          <VideoBlock />
        </>
      ) : (
        <>
          <div className="cursor-pointer w-full">
            <Button
              variant={"ghost"}
              onClick={() => {
                setRenderedContent("block");
              }}
              className="flex space-x-2 items-center justify-start ml-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </Button>
          </div>
          <ScrollArea className="h-[73dvh] w-full">
            {postContent.map((content, index) => (
              <div className="relative w-5/6 mx-4 my-2 h-[8rem] cursor-pointer rounded-md  transition-all">
                <Image
                  key={`user-media-${index}`}
                  src={content.content.location}
                  alt={content.file.name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  className="rounded-md"
                />
              </div>
            ))}
          </ScrollArea>
        </>
      )}
    </section>
  );
};

const DocumentTab = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="w-full text-center border-b-2 font-semibold py-2 mb-4">
        Text
      </h2>
      {textTypes.map((text) => (
        <TextBlock id={text} />
      ))}
    </section>
  );
};
