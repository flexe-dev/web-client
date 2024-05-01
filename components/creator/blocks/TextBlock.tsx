import { Draggable } from "@/components/dnd/Draggable";
import { BlockWrapper } from "./Wrapper";
import React from "react";

export const textTypes = [
  "draggable-block-title",
  "draggable-block-subtitle",
  "draggable-block-text",
] as const;
export type Text = (typeof textTypes)[number];

interface BlockProps {
  id: Text;
}

const TitleVisual = () => {
  return <h1 className="text-2xl font-bold">{"<Title / >"}</h1>;
};

const SubTitleVisual = () => {
  return <h2 className="text-xl font-semibold">{"<SubTitle / >"}</h2>;
};

const TextVisual = () => {
  return <p className="text-lg">{"<Text / >"}</p>;
};

const BlockThumbnail: Record<Text, React.ReactNode> = {
  "draggable-block-title": <TitleVisual />,
  "draggable-block-subtitle": <SubTitleVisual />,
  "draggable-block-text": <TextVisual />,
};

const TextBlock = ({ id }: BlockProps) => {
  return (
    <>
      <Draggable id={id}>
        <BlockWrapper>{BlockThumbnail[id]}</BlockWrapper>
      </Draggable>
    </>
  );
};

export default TextBlock;
