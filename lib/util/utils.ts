import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function getEntireURL(pathName: string) {
  return `${process.env.NEXT_PUBLIC_URL}${pathName}`;
}

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(getEntireURL(value));
}

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

export const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ObjectGenerationFromKeys = <T, K extends keyof T>(
  keys: readonly K[],
  values: T[K]
): T => {
  return keys.reduce((acc, key) => {
    acc[key] = values;
    return acc;
  }, {} as T);
};

export const ObjectGenerationFromKeysWithCallback = <T, K extends keyof T>(
  keys: readonly K[],
  fn: (key: K) => T[K]
): T => {
  return keys.reduce((acc, key) => {
    acc[key] = fn(key);
    return acc;
  }, {} as T);
};
