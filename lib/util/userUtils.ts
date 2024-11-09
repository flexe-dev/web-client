import {
  Authentication,
  UserDetails,
  UserDisplay,
} from "../interfaces/userTypes";

export const defaultPicture =
  "https://kkyhjzebnjjkhuncbfgo.supabase.co/storage/v1/object/public/user-profile/defaultpicture.jpg?t=2024-03-30T08%3A31%3A58.211Z";

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
