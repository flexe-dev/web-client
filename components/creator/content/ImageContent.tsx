import { SortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp, PostUserMedia } from "@/lib/interface";
import React from "react";
import Image from "next/image";
import ContentWrapper from "./ContentWrapper";
import { PhotoIcon } from "@heroicons/react/24/outline";

export const ImageContent = (props: ContentBlockProp) => {
  const { value } = props;

  return (
    <SortableItem id={props.id}>
      <ContentWrapper id={props.id} type="image">
        <div className="w-fit flex relative max-w-4xl aspect-[4/3] p-4">
          {value ? (
            <Image
              width={(value as PostUserMedia).content.width}
              height={(value as PostUserMedia).content.height}
              src={(value as PostUserMedia).content.location}
              alt={(value as PostUserMedia).file.name}
              // layout="fill"
              // objectFit="contain"
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
  //todo: give user ability to upload a picture or select from sidebar
  return (
    <div className="max-w-2xl flex justify-center items-center">
      <PhotoIcon className="w-36 h-36" />
      <h2>Place Image Here</h2>
    </div>
  );
};
