import {
  ProfileExternalLinks,
  UserAccount,
  UserDisplay,
  UserNode,
  UserProfile,
} from "@/lib/interface";

const FindProfileByUserId = async (
  userId: string
): Promise<UserProfile | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}user/profile/find/${userId}`,
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
    `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}user/account/find/${userId}`,
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
      `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}user/account/find/username/${username}`,
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

const FindUserNode = async (userId: string): Promise<UserNode | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INTERACTIONS_SERVICE_URL}node/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

const OnboardUser = async (user: UserDisplay): Promise<UserDisplay> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}user/onboard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  return response.json();
};

const updateUser = async (user: UserDisplay): Promise<UserDisplay> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}user/update`,
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

const deleteUser = async (user: UserAccount): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}user/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  return response.ok;
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
  FindAccountByUserId,
  FindAccountByUsername,
  FindProfileByUserId,
  FindUserNode,
  OnboardUser,
  updateUser,
};
