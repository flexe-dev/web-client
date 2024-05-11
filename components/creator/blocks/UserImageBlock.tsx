import { Draggable } from "@/components/dnd/Draggable";
import React from "react";
import Image from "next/image";
import { PostUserMedia } from "@/lib/interface";

interface Props {
  content: PostUserMedia;
}

const UserImageBlock = (props: Props) => {
  return (
    <Draggable id={`draggable-block-user||image||${props.content.content.id}`}>
      <div className="relative w-5/6 mx-4 my-2 h-[8rem] cursor-pointer rounded-md  transition-all">
        <Image
          key={`user-media-${props.content.content.id}`}
          src={props.content.content.location}
          alt={props.content.file.name}
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
