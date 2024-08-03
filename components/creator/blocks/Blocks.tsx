import React from "react";
import TextBlock, { textTypes } from "./TextBlock";
import ImageBlock from "./ImageBlock";
import VideoBlock from "./VideoBlock";
interface Props {
  id: BlockID;
}

const BlockID = [
  ...textTypes,
  "draggable-block-image",
  "draggable-block-video",
] as const;

export type BlockID = (typeof BlockID)[number];

const RenderedItem: Record<BlockID, React.ReactNode> = {
  "draggable-block-title": <TextBlock id="draggable-block-title" />,
  "draggable-block-subtitle": <TextBlock id="draggable-block-subtitle" />,
  "draggable-block-text": <TextBlock id="draggable-block-text" />,
  "draggable-block-image": <ImageBlock />,
  "draggable-block-video": <VideoBlock />,
};

const Blocks = ({ id }: Props) => {
  return RenderedItem[id];
};

export default Blocks;
