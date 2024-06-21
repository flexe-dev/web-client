import { UserProfile } from "@/lib/interface";
import { User } from "@prisma/client";

const CreateUserProfile = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/profile/create`,
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
  console.log(response);
  const userProfile = await response.json();

  return userProfile;
};

const UpdateUserDetails = async (
  userProfile: UserProfile,
  user: User
): Promise<boolean> => {
  console.log(userProfile, user);
  console.log(JSON.stringify({ userProfile, user }));
  console.log("hello");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}user/profile/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userProfile,
        user,
      }),
    }
  );
  console.log(response);
  return response.ok;
};

export { CreateUserProfile, FindProfileByUserId, UpdateUserDetails };
