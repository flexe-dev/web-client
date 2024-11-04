import { defaultPostMetrics } from "@/controllers/PostController";
import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import {
  Authentication,
  Post,
  postTypeMap,
  TextContent,
  TextPost,
  UserDetails,
  UserDisplay,
  UserPosts,
} from "../interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function HashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export function nullIfEmpty(value: string) {
  return value === "" ? null : value;
}

export function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function sortPostsByDate<T extends Post>(posts: T[]): T[] {
  return posts.sort((a, b) => {
    return (
      new Date(b.auxData.dateCreated).getTime() -
      new Date(a.auxData.dateCreated).getTime()
    );
  });
}

export function getEntireURL(pathName: string) {
  return `${process.env.NEXT_PUBLIC_URL}${pathName}`;
}

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(getEntireURL(value));
}

export function renderMetric(value: number) {
  return value > 1000 ? `${(value / 1000).toFixed(1)}k` : value;
}

export const GetNameInitials = (name?: string | null) => {
  if (!name) return "";
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("");
};

export const isAuthenticated = (status: Authentication): boolean => {
  return status === "authenticated";
};

export const toUserDetails = (user: UserDisplay): UserDetails => {
  return {
    userId: user.user.id,
    username: user.user.username,
    name: user.user.name ?? "",
    image: user.user.image ?? defaultPicture,
    job: user.profile?.job,
  };
};

export const GenerateTextPost = (
  content: TextContent,
  userId: string
): TextPost => {
  return {
    id: undefined,
    auxData: {
      userID: userId,
      dateCreated: new Date(),
      tags: [],
    },
    textContent: content,
    metrics: defaultPostMetrics,
    postType: "TEXT",
  };
};

export async function resizeImage(
  url: string,
  width: number,
  height: number
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const resizedImageURL = URL.createObjectURL(blob);
        resolve(resizedImageURL);
      }, "image/jpeg");
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
}

export const onPostObjectUpdate = (
  setPosts: Dispatch<SetStateAction<UserPosts | undefined>>,
  posts?: UserPosts
) => {
  return (alteredPost: Post) => {
    if (!posts || !alteredPost) return;

    const existingPostIndex = posts[
      postTypeMap[alteredPost.postType]
    ].findIndex((post) => post.id === alteredPost.id);
    if (existingPostIndex === -1) return;

    setPosts((prev) => {
      if (!prev) return;

      return {
        ...prev,
        [postTypeMap[alteredPost.postType]]: [
          ...prev[postTypeMap[alteredPost.postType]].slice(
            0,
            existingPostIndex
          ),
          {
            ...prev[postTypeMap[alteredPost.postType]][existingPostIndex],
            ...alteredPost,
          },
          ...prev[postTypeMap[alteredPost.postType]].slice(
            existingPostIndex + 1
          ),
        ],
      };
    });
  };
};

export const generateMongoID = async (): Promise<string | undefined> => {
  /*
  Generates a new BSON ID used for preprocessing with data stored MongoDB
  Needed to be a backend call due to React Issues with Bson generation on the front end
  */
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}util/generateBson`,
      {
        method: `GET`,
      }
    );
    const res = await response.json();
    return res.id;
  } catch (e) {
    console.error(e);
  }
};

export async function getVideoThumbnail(
  content: string,
  timeStamp: number = 0.0
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    // load the file to a video player
    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("src", content);
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

export const convertImageSourceToFile = async (
  url: string,
  filename: string
) => {
  return new Promise<File | undefined>((resolve) => {
    fetch(url).then(async (res) => {
      const contentType = res.headers.get("content-type");
      if (!contentType) return;
      const blob = await res.blob();
      const file = new File([blob], filename, { type: contentType });
      resolve(file);
    });
  });
};

export const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const defaultPicture =
  "https://kkyhjzebnjjkhuncbfgo.supabase.co/storage/v1/object/public/user-profile/defaultpicture.jpg?t=2024-03-30T08%3A31%3A58.211Z";
