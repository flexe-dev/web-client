import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import Resizer from "react-image-file-resizer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function HashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

type Format = "JPEG" | "PNG";

export async function resizeImage(
  file: File,
  height: number,
  width: number,
  format: Format = "JPEG"
): Promise<string> {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width, // new image max width
      height, // new image max height
      format, // default type
      100, // new image quality
      0, // rotation degree
      (uri) => {
        resolve(uri as string); //returning a string uri of the resized image
      },
      "base64" // output type -> string
    );
  });
}

export const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const defaultPicture =
  "https://kkyhjzebnjjkhuncbfgo.supabase.co/storage/v1/object/public/user-profile/defaultpicture.jpg?t=2024-03-30T08%3A31%3A58.211Z";
