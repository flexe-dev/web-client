"use client";
import { DragOverlay } from "@dnd-kit/core";
import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ContentSidebar, { dropAnimationConfig } from "./sidebar/ContentSidebar";
import Blocks, { BlockID } from "./blocks/Blocks";
import { useBlockDrag } from "../context/PostDragProvider";
import { usePostCreator } from "../context/PostCreatorProvider";
import { Switch } from "../ui/switch";
import UserVideoBlock from "./blocks/UserVideoBlock";
import UserImageBlock from "./blocks/UserImageBlock";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AnimatePresence } from "framer-motion";

const PostContent = () => {
  const {
    document,
    previewMode,
    setPreviewMode,
    content,
    setActiveStylingTool,
  } = usePostCreator();
  const { activeDragID } = useBlockDrag();

  const getRenderedDragOverlay = (id: string): React.ReactNode => {
    if (id.includes("draggable-content")) {
      const contentBlock = document.find((block) => block.id === id);
      return contentBlock ? (
        <contentBlock.content
          id={contentBlock.id}
          value={contentBlock.value}
          style={contentBlock.style}
        />
      ) : null;
    }
    if (id.includes("user")) {
      const [_, type, contentId] = id.split("||");
      const contentMedia = content.find(
        (media) => media.content.id === contentId
      );
      if (!contentMedia) return null;

      return (
        <div className="opacity-50">
          {type === "video" ? (
            <UserVideoBlock content={contentMedia} dragging />
          ) : (
            <UserImageBlock content={contentMedia} />
          )}
        </div>
      );
    }
    return <Blocks id={id as BlockID} />;
  };

  return (
    <>
      <ContentSidebar />
      <section
        onClick={() => setActiveStylingTool(null)}
        className="z-[20] w-full justify-center h-full flex relative"
      >
        <section className="mx-16 lg:mx-6 relative w-full flex flex-col space-y-2 py-12 px-8 container border border-dashed rounded-md my-12 ">
          <div className="absolute flex space-x-2 right-10 top-4">
            <Switch
              checked={previewMode}
              onCheckedChange={() => setPreviewMode(!previewMode)}
            />
            <h3>Preview Mode</h3>
          </div>
          <AnimatePresence>
            <SortableContext
              id="droppable-post-content"
              strategy={verticalListSortingStrategy}
              items={document.map((document) => document.id)}
            >
              {document.map((document, index) => {
                return (
                  <React.Fragment key={`document-component-${index}`}>
                    <document.content
                      id={document.id}
                      value={document.value}
                      style={document.style}
                      options={document.options}
                    />
                  </React.Fragment>
                );
              })}
            </SortableContext>
          </AnimatePresence>
        </section>
      </section>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeDragID ? getRenderedDragOverlay(activeDragID as string) : null}
      </DragOverlay>
      <div
        className="z-[10] absolute inset-0"
        onClick={() => setActiveStylingTool(null)}
      />
    </>
  );
};

export default PostContent;
