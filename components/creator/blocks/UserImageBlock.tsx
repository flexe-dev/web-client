import { Draggable } from "@/components/dnd/Draggable";
import React from "react";
import Image from "next/image";
import { PostUserMedia } from "@/lib/interface";
import {
  VideoCameraIcon,
  PhotoIcon,
  GifIcon,
} from "@heroicons/react/24/outline";

interface Props {
  thumbnail?: string;
  content: PostUserMedia;
}

const UserImageBlock = (props: Props) => {
  const { content, thumbnail } = props;
  return (
    <Draggable id={`draggable-block-user||image||${content.content.id}`}>
      <div className="relative w-5/6 mx-4 my-2 h-[8rem] cursor-pointer rounded-md  transition-all">
        {content.content.format === "IMAGE" ? (
          <Image
            key={`user-media-${content.content.id}`}
            src={thumbnail || content.content.location}
            alt={content.file.name}
            fill
            style={{
              objectFit: "cover",
            }}
            className="rounded-md"
          />
        ) : (
          <GIFVisual content={content} thumbnail={thumbnail} />
        )}
        <div className="absolute right-2 top-2">
          {content.content.format === "GIF" ? (
            <GifIcon className="w-8 h-8 stroke-neutral-200" />
          ) : (
            <PhotoIcon className="w-8 h-8 stroke-neutral-200" />
          )}
        </div>
      </div>
    </Draggable>
  );
};

const GIFVisual = (props: Props) => {
  const { content, thumbnail } = props;
  return (
    <React.Fragment key={`user-media-${content.content.id}`}>
      <Image
        src={content.content.location}
        alt={content.file.name}
        fill
        style={{
          objectFit: "cover",
        }}
        className="rounded-md"
      />
      <Image
        src={thumbnail || content.content.location}
        alt={content.file.name}
        fill
        style={{
          objectFit: "cover",
        }}
        className="rounded-md hover:opacity-0 transition-opacity"
      />
    </React.Fragment>
  );
};

export default UserImageBlock;
