import { UserProfile } from "@prisma/client";
import { User } from "next-auth";

interface EmailUser {
  email: string;
  password: string;
}

const CreateEmailUser = async (credentials: EmailUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/createUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.ok;
};

const FindUserByEmail = async (email: string): Promise<User | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/findUserByEmail/${email}`,
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
  const user: User = await response.json();
  return user;
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

const CheckUserPassword = async (userID: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/checkPassword`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, password }),
    }
  );
  return response.ok;
};

const UniqueUsernameCheck = async (username: string): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/findUserByUsername/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user: User | null = await response.json();
  return !!user;
};

const CompleteUserOnboard = async (
  userID: string,
  username: string,
  name: string,
  imageURL: string
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/onboardUser`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, username, name, imageURL }),
    }
  );
  return response.ok;
};

const UpdateUserDetails = async (
  userID: string,
  username: string,
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
        username,
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
  CreateEmailUser,
  FindUserByEmail,
  FindProfileByUserId,
  UniqueUsernameCheck,
  CompleteUserOnboard,
  CheckUserPassword,
  UpdateUserDetails,
};
