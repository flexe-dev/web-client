import { prisma } from "@/lib/prismadb";
import { User, UserProfile } from "@prisma/client";
const CreateUserProfile = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}profile/createProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    }
  );
  const res = await response.json();
  const profile: UserProfile = res.profile;

  return profile;
};

const FindProfileByUserId = async (
  userId: string
): Promise<UserProfile | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}profile/findProfileByUserId/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 404) {
    return null;
  }
  const userProfile: UserProfile = await response.json();
  return userProfile;
};

const UploadProfileReadMe = async (
  buffer: Buffer,
  userID: string
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}profile/uploadReadMeBuffer`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ buffer, userID }),
    }
  );
  return response.ok;
};

const UpdateUserDetails = async (
  userID: string,
  image: string,
  name: string,
  job: string,
  company: string,
  pronouns: string,
  location: string,
  bio: string
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}profile/updateUserDetails`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        image,
        name,
        job,
        company,
        pronouns,
        location,
      }),
    }
  );
  return response.ok;
};

export {
  FindProfileByUserId,
  UpdateUserDetails,
  CreateUserProfile,
  UploadProfileReadMe,
};
