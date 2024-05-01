import React from "react";
import { BlockWrapper } from "./Wrapper";
import { Draggable } from "@/components/dnd/Draggable";

const VideoBlock = () => {
  return (
    <Draggable id="draggable-block-video">
      <BlockWrapper>
        <h1 className="text-2xl font-bold">{"<Video / >"}</h1>
      </BlockWrapper>
    </Draggable>
  );
};

export default VideoBlock;
