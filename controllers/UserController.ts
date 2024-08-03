import { UserAccount, UserProfile } from "@/lib/interface";
import { User } from "next-auth";

const CreateUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/profile/create/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

const FindProfileByUserId = async (
  userId: string
): Promise<UserProfile | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/profile/find/${userId}`,
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
  return response.json();
};

const FindAccountByUserId = async (
  userId: string
): Promise<UserAccount | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/account/find/${userId}`,
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
  return response.json();
};

const FindAccountByUsername = async (
  username: string
): Promise<UserAccount | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/account/find/username/${username}`,
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

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

const UpdateUserDetails = async (user: User): Promise<User> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/details/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  return response.json();
};

const UpdateUserAccount = async (
  userAccount: UserAccount
): Promise<UserAccount> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/account/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAccount),
    }
  );
  return response.json();
};

export {
  CreateUserProfile,
  FindAccountByUserId,
  FindAccountByUsername,
  FindProfileByUserId,
  UpdateUserAccount,
  UpdateUserDetails,
};
