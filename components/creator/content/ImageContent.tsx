import { SortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp } from "@/lib/interface";
import React from "react";
import { images } from "@/lib/placeholder";
import Image from "next/image";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { PhotoIcon } from "@heroicons/react/24/outline";

export const ImageContent = (props: ContentBlockProp) => {
  const { previewMode, onDelete } = usePostCreator();
  const { value } = props;

  return (
    <SortableItem id={props.id}>
      <ContentWrapper id={props.id}>
        <div className="w-fit flex  max-w-4xl aspect-[4/3] p-4">
          {value ? (
            <Image
              src={value as string}
              alt="image"
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <DefaultImage />
          )}
        </div>
      </ContentWrapper>
    </SortableItem>
  );
};

const DefaultImage = () => {
  return (
    <div className="max-w-2xl flex justify-center items-center">
      <PhotoIcon className="w-36 h-36" />
      <h2>Place Image Here</h2>
    </div>
  );
};
