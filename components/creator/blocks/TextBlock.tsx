import { ClassNameProp } from "@/lib/interface";
import { BlockWrapper } from "./Wrapper";
import React from "react";

export const textTypes = ["title", "subtitle", "text"] as const;
export type Text = (typeof textTypes)[number];

interface BlockProps extends ClassNameProp {
  text: Text;
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
  title: <TitleVisual />,
  subtitle: <SubTitleVisual />,
  text: <TextVisual />,
};

//todo: Implement Drag and Drop Functionality
const TextBlock = ({ text }: BlockProps) => {
  return <BlockWrapper>{BlockThumbnail[text]}</BlockWrapper>;
};

export default TextBlock;
