import React from "react";
import { BlockWrapper } from "./Wrapper";
const ImageBlock = () => {
  return (
    <BlockWrapper id="draggable-block-image">
      <h1 className="text-2xl font-bold">{"<Image / >"}</h1>
    </BlockWrapper>
  );
};

export default ImageBlock;
