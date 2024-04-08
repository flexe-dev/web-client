import React, { use } from "react";
import Image from "next/image";
import { ImageProps } from "next/image";
import { User } from "@prisma/client";
import { Card, CardFooter, CardContent } from "../card";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarImage } from "../avatar";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
interface GalleryPostProps {
  title: string;
  link: string;
  image: ImageProps;
  index: number;
  creator: User;
}

export const GalleryTile = (props: GalleryPostProps) => {
  const { title, link, image, creator, index } = props;
  return (
    <Card
      key={`gallery-tile-${index}`}
      className="group cursor-pointer overflow-hidden rounded-lg border-0 relative min-w-[20rem] xl:min-w-[24rem] mx-3 my-2 aspect-[4/3] flex-shrink flex-grow basis-[20rem] xl:basis-[24rem] w-full"
    >
      <Image
        className="w-full aspect-[4/3] group-hover:scale-105 duration-200 transition-transform"
        {...image}
        objectFit="cover"
      />
      <div className="absolute z-[10] inset-0 group-hover:bg-neutral-950/50 duration-200 transition-colors"></div>
      <CardFooter className=" py-4 absolute z-[20] bottom-0 left-0 right-0 bg-background/70 justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1 items-center">
            <span>20.4k</span>
            <EyeIcon className="w-4 h-4" />
          </div>
          <div className="flex space-x-1 items-center">
            <span>1.2k</span>
            <HandThumbUpIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div>{creator.name}</div>
          <Avatar className="w-7 h-7">
            <AvatarImage className="object-cover" src={creator.image} />
          </Avatar>
        </div>
      </CardFooter>
    </Card>
  );
};
