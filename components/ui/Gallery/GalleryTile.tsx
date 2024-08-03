import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { User } from "next-auth";
import Image, { ImageProps } from "next/image";
import { Avatar, AvatarImage } from "../avatar";
import { Card, CardFooter } from "../card";

//todo: replace this with the user post object
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
      className="group cursor-pointer border dark:border-0 overflow-hidden relative min-w-[20rem] xl:min-w-[24rem] mx-3 my-2 aspect-[4/3] flex-shrink flex-grow basis-[20rem] xl:basis-[24rem] w-full"
    >
      <Image
        className="w-full aspect-[4/3] rounded-t-sm rounded-b-lg dark:pb-[0.025rem] dark:px-[0.0125rem] group-hover:scale-105 duration-200 transition-transform"
        {...image}
        objectFit="cover"
      />
      <div className="absolute z-[10] inset-0 group-hover:bg-neutral-950/50 duration-200 transition-colors" />
      <CardFooter className="py-3 absolute rounded-b-lg z-[20] bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm justify-between">
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
            <AvatarImage
              className="object-cover"
              src={creator.image ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO}
            />
          </Avatar>
        </div>
      </CardFooter>
    </Card>
  );
};
