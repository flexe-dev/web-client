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

export async function getVideoThumbnail(
  file: File,
  timeStamp: number = 0.0
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    // load the file to a video player
    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("src", URL.createObjectURL(file));
    videoPlayer.load();
    videoPlayer.addEventListener("error", (ex) => {
      reject(ex);
    });
    // load metadata of the video to get video duration and dimensions
    videoPlayer.addEventListener("loadedmetadata", () => {
      // seek to user defined timestamp (in seconds) if possible
      if (videoPlayer.duration < timeStamp) {
        reject("video is too short.");
        return;
      }
      // delay seeking or else 'seeked' event won't fire on Safari
      setTimeout(() => {
        videoPlayer.currentTime = timeStamp;
      }, 200);
      // extract video thumbnail once seeking is complete
      videoPlayer.addEventListener("seeked", () => {
        // define a canvas to have the same dimension as the video
        const canvas = document.createElement("canvas");
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        // draw the video frame to canvas
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        // return the canvas image as a blob
        const url = ctx.canvas.toDataURL("image/jpeg", 0.8);
        resolve(url);
      });
    });
  });
}

export const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const defaultPicture =
  "https://kkyhjzebnjjkhuncbfgo.supabase.co/storage/v1/object/public/user-profile/defaultpicture.jpg?t=2024-03-30T08%3A31%3A58.211Z";
