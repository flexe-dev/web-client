import React from "react";
import { BlockWrapper } from "./Wrapper";
import { Draggable } from "@/components/dnd/Draggable";
const ImageBlock = () => {
  return (
    <>
      <Draggable id="draggable-block-image">
        <BlockWrapper>
          <h1 className="text-2xl font-semibold">{"<Image / >"}</h1>
        </BlockWrapper>
      </Draggable>
    </>
  );
};

export default ImageBlock;
