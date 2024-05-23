"use client";

import React, { useEffect, useState } from "react";
import { cn, resizeImage } from "@/lib/utils";
import {
  PhotoIcon,
  DocumentIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../ui/button";
import { DropAnimation, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import { usePostCreator } from "../../context/PostCreatorProvider";
import { PostUserMedia, PostUserMediaThumbnail } from "@/lib/interface";
import DocumentTab from "./TextTab";
import ContentTab from "./VisualTab";
import StylingTab from "./StylingTab";

type SidebarTab = "document" | "photo" | "styling";

export const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.6",
      },
    },
  }),
};

const ContentSidebar = () => {
  const { sidebarOpen, setSidebarOpen, content, activeStylingTool } =
    usePostCreator();
  const [activeTab, setActiveTab] = useState<SidebarTab>("photo");
  const [thumbnails, setThumbnails] = useState<PostUserMediaThumbnail[]>([]);
  const [previousTab, setPreviousTab] = useState<SidebarTab | undefined>();

  useEffect(() => {
    generateThumbnailObjects(content).then((thumbnails) => {
      setThumbnails(thumbnails);
    });
  }, [content]);

  useEffect(() => {
    if (activeStylingTool && activeTab !== "styling") {
      handleTabChange("styling");
    } else if (!activeStylingTool && activeTab === "styling") {
      setActiveTab(previousTab ?? "photo");
    }
  }, [activeStylingTool]);

  const handleTabChange = (tab: SidebarTab) => {
    setPreviousTab(activeTab !== "styling" ? activeTab : previousTab);
    setActiveTab(tab);
  };

  const renderedContent: Record<SidebarTab, React.ReactNode> = {
    document: <DocumentTab />,
    photo: <ContentTab thumbnailObject={thumbnails} />,
    styling: <StylingTab />,
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
                  onClick={() => handleTabChange("document")}
                  variant={"outline"}
                  className={cn(
                    "flex border-0 rounded-none justify-center hover:bg-accent/50 items-center h-[2.25rem] w-full",
                    activeTab === "document" && "bg-accent  hover:bg-accent"
                  )}
                >
                  <DocumentIcon className="h-7 w-7 stroke-secondary-header" />
                </Button>
                <Button
                  onClick={() => handleTabChange("photo")}
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
          sidebarOpen
            ? "left-[15rem] delay-75"
            : "duration-200 ml-[0.125rem] left-1"
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

const generateThumbnailObjects = async (
  content: PostUserMedia[]
): Promise<PostUserMediaThumbnail[]> => {
  const thumbnails: Promise<PostUserMediaThumbnail[]> = Promise.all(
    content.map(async (media) => ({
      thumbnail:
        media.content.format === "IMAGE"
          ? await resizeImage(media.file, 500, 300)
          : undefined,
      contentID: media.content.id,
    }))
  );
  return thumbnails;
};
