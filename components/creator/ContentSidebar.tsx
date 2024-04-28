"use client";

import React, { useState } from "react";
import { CreatePost } from "@/lib/interface";
import { cn } from "@/lib/utils";
import {
  PhotoIcon,
  DocumentIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import TextBlock, { textTypes } from "./blocks/TextBlock";
import UserMediaBlock from "./blocks/UserMediaBlock";
import Image from "next/image";
import ImageBlock from "./blocks/ImageBlock";
import VideoBlock from "./blocks/VideoBlock";
import { ScrollArea } from "../ui/scroll-area";
interface Props {
  postContent: CreatePost[];
}

type SidebarTab = "document" | "photo";

const ContentSidebar = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>("photo");

  const renderedContent: Record<SidebarTab, React.ReactNode> = {
    document: <DocumentTab />,
    photo: <ContentTab postContent={props.postContent} />,
  };

  return (
    <aside
      className={cn(
        `h-screen sticky top-[5rem] lg:top-0 left-0  border-r-2 bg-background `,
        sidebarOpen ? "min-w-[16rem] max-w-[16rem] fixed lg:sticky" : "w-[3rem]"
      )}
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
    </aside>
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
            className="relative w-5/6 max-w-[83.33%] mx-4 my-2 h-[8rem] cursor-pointer rounded-md border-2 border-transparent hover:border-primary transition-all"
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
        <TextBlock key={`block-${text}`} text={text} />
      ))}
    </section>
  );
};
