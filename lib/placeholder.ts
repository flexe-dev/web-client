import { ImageProps } from "next/image";
import Placeholder1 from "@/public/Default2.jpg";
import Placeholder2 from "@/public/Default3.jpg";
import Placeholder3 from "@/public/Default4.jpg";
import Placeholder7 from "@/public/Default8.jpg";
import Placeholder8 from "@/public/Default9.png";

export const images: ImageProps[] = [
  Placeholder1,
  Placeholder2,
  Placeholder3,
  Placeholder7,
  Placeholder8,
].map((image) => ({ src: image, alt: "Placeholder" }));
