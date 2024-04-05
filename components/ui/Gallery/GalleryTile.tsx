import React from "react";
import Image from "next/image";
import PlaceholderImage from "@/public/original-e6f547fe1fba8636ec3500af590b14ef.jpg";
import { ImageProps } from "next/image";
import { User } from "@prisma/client";

interface GalleryPostProps {
  title: string;
  link: string;
  image: ImageProps;
  user: User;
}

export const GalleryTile = () => {
  return <div>GalleryTile</div>;
};
