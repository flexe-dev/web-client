import { DragHandle, SortableItem } from "@/components/dnd/Sortable";
import { Input } from "@/components/ui/input";
import { ContentBlockProp } from "@/lib/interface";
import React from "react";
import { images } from "@/lib/placeholder";
import Image from "next/image";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";
const ImageContent = (props: ContentBlockProp) => {
  const { previewMode } = usePostCreator();
  return (
    <SortableItem id={props.id}>
      <ContentWrapper>
        <div className="max-w-xl aspect-[4/3] p-4">
          <Image {...images[0]} />
        </div>
      </ContentWrapper>
    </SortableItem>
  );
};

export default ImageContent;
