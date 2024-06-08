import { Draggable } from "@/components/dnd/Draggable";
import React, { useEffect } from "react";
import Image from "next/image";
import { PostUserMedia } from "@/lib/interface";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { getVideoThumbnail } from "@/lib/utils";

interface Props {
  thumbnail?: string;
  content: PostUserMedia;
  dragging?: true;
}

const UserVideoBlock = (props: Props) => {
  const { content, thumbnail, dragging } = props;

  return (
    <Draggable id={`draggable-block-user||video||${content.content.id}`}>
      <div className="relative w-5/6 mx-4 my-2 h-[8rem] cursor-pointer rounded-md  transition-all">
        <BlockVisual
          content={content}
          thumbnail={thumbnail}
          dragging={dragging}
        />
        <div className="absolute right-2 top-2">
          <VideoCameraIcon className="w-8 h-8 stroke-neutral-200" />
        </div>
      </div>
    </Draggable>
  );
};

const BlockVisual = (props: Props) => {
  const { content, thumbnail, dragging } = props;

  return (
    <>
      <video
        src={content.content.location}
        className="rounded-md object-fill h-[8rem] w-full"
        autoPlay
        loop
      />
      {!dragging && (
        <Image
          src={thumbnail || content.content.location}
          alt={content.content.alt}
          fill
          style={{
            objectFit: "fill",
          }}
          className="rounded-md hover:opacity-0 transition-opacity"
        />
      )}
    </>
  );
};

export default UserVideoBlock;
