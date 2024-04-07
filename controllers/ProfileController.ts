import { UserProfile } from "@prisma/client";

const CreateUserProfile = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/createProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    }
  );
  return response.ok;
};

const FindProfileByUserId = async (
  userId: string
): Promise<UserProfile | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/findProfileByUserId/${userId}`,
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

const CompleteProfileOnboard = async (
  userId: string,
  avatarURL: string,
  name: string
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/onboardProfile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, avatarURL, name }),
    }
  );
  return response.ok;
};

const UpdateUserDetails = async (
  userID: string,
  name: string,
  imageURL: string,
  job: string,
  company: string,
  pronouns: string,
  location: string
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/updateUserDetails`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        name,
        imageURL,
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
  CompleteProfileOnboard,
  CreateUserProfile,
};
