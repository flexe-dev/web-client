import React from "react";

import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import { PostUserMedia } from "@/lib/interface";

interface MediaProps {
  thumbnail?: string;
}

const UserMediaBlock = ({ thumbnail }: MediaProps) => {
  return (
    <button className="relative w-full h-full">
      <Image
        src={thumbnail ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO}
        alt="User Media Thumbnail"
        fill
        style={{
          objectFit: "cover",
        }}
        sizes="100%"
        className="rounded-md"
      />
      <div className="rounded-sm absolute inset-0 h-full group w-full bg-neutral-950/75 dark:bg-neutral-950/90 flex flex-col items-center justify-center">
        <CameraIcon className="w-12 h-12 stroke-white group-hover:stroke-tertiary dark:group-hover:stroke-secondary-header transition-colors" />
        <h2 className="text-xl font-bold text-white group-hover:text-tertiary dark:group-hover:text-secondary-header transition-colors">
          Uploaded
        </h2>
      </div>
    </button>
  );
};

export default UserMediaBlock;
