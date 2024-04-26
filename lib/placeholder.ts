import { ImageProps } from "next/image";
import Placeholder1 from "@/public/Default2.jpg";
import Placeholder2 from "@/public/Default3.jpg";
import Placeholder3 from "@/public/Default4.jpg";
import Placeholder4 from "@/public/Default5.jpg";
import Placeholder5 from "@/public/Default6.png";
import Placeholder6 from "@/public/Default7.jpg";
import Placeholder7 from "@/public/Default8.jpg";
import Placeholder8 from "@/public/Default9.png";

export const images: ImageProps[] = [
  Placeholder1,
  Placeholder2,
  Placeholder3,
  Placeholder4,
  Placeholder5,
  Placeholder6,
  Placeholder7,
  Placeholder8,
].map((image) => ({ src: image, alt: "Placeholder" }));
