import { UserInteractionType } from "@/lib/interfaces/interactionTypes";
import {
  ProfileExternalLinks,
  UserDisplay,
  UserNetwork,
  UserNode,
  UserProfile,
} from "@/lib/interfaces/userTypes";
import { User } from "next-auth";

const FindUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}user/p/find/username/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) return;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

const FindUserDisplayByUserId = async (
  userId: string
): Promise<UserDisplay | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}user/p/display/find/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) return;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

const FindUserDisplayByUsername = async (
  username: string
): Promise<UserDisplay | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}user/p/display/find/username/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) return;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

const FindUserNode = async (
  userId: string,
  sessionToken?: string
): Promise<UserNode | undefined> => {
  if (!sessionToken) return;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}node/user`,
      {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );

    if (response.status === 404) return;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

const FindUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}user/p/find/email/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) return;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

const OnboardUser = async (
  user: UserDisplay,
  token?: string
): Promise<UserDisplay> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}user/onboard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    }
  );
  return response.json();
};

const updateUser = async (
  user: UserDisplay,
  token?: string
): Promise<UserDisplay> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}user/update`,
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

const deleteUser = async (userId: string): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}user/delete/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.ok;
};

const FollowUser = async (
  targetId: string,
  token?: string
): Promise<boolean> => {
  return UserInteractionRequest(targetId, "FOLLOW", token);
};

const UnfollowUser = async (
  targetId: string,
  token?: string
): Promise<boolean> => {
  return UserInteractionRequest(targetId, "UNFOLLOW", token);
};

const UserInteractionRequest = async (
  targetId: string,
  type: UserInteractionType,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_GATEWAY_URL
      }user/${type.toLowerCase()}/${targetId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    ``;
    return response.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const GetUserNetwork = async (
  username: string,
  userId: string | null = null
): Promise<UserNetwork | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}node/p/network/${username}?userId=${userId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    if (response.status === 404) return;

    return response.json();
  } catch (err) {
    console.error(err);
    return;
  }
};

const DefaultExternal: ProfileExternalLinks = {};

const DefaultProfile: UserProfile = {
  id: "",
  userId: "",
  followers: 0,
  following: 0,
  external: DefaultExternal,
};

export {
  DefaultExternal,
  DefaultProfile,
  FindUserByEmail,
  FindUserByUsername,
  FindUserDisplayByUserId,
  FindUserDisplayByUsername,
  FindUserNode,
  FollowUser,
  GetUserNetwork,
  OnboardUser,
  UnfollowUser,
  updateUser,
};
