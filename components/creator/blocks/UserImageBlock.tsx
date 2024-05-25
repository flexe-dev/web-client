import { Draggable } from "@/components/dnd/Draggable";
import React from "react";
import Image from "next/image";
import { PostUserMedia } from "@/lib/interface";

interface Props {
  thumbnail?: string;
  content: PostUserMedia;
}

const UserImageBlock = (props: Props) => {
  const { content, thumbnail } = props;
  return (
    <Draggable id={`draggable-block-user||image||${content.content.id}`}>
      <div className="relative w-5/6 mx-4 my-2 h-[8rem] cursor-pointer rounded-md  transition-all">
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
      </div>
    </Draggable>
  );
};

export default UserImageBlock;
