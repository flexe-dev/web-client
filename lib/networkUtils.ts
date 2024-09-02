import {
  NetworkStatus,
  UserDisplay,
  UserInteractionRelationship,
} from "./interface";

export const getNetworkStatus = (
  targetID: string,
  following: UserInteractionRelationship[],
  followers: UserInteractionRelationship[]
): NetworkStatus => {
  const isFollowing = following.some(
    (following) => following.user.userId === targetID
  );
  const isFollowed = followers.some(
    (follower) => follower.user.userId === targetID
  );

  if (isFollowing && isFollowed) return "friends";
  if (isFollowing) return "following";
  if (isFollowed) return "followed";
  return "none";
};

export const getUserFriends = (
  following: UserInteractionRelationship[],
  followers: UserInteractionRelationship[]
) => {
  const set = new Set<string>(following.map((f) => f.user.userId));
  return followers.filter((f) => set.has(f.user.userId));
};

export const generateUserDetailNode = (user: UserDisplay) => {
  return {
    userId: user.user.id,
    name: user.user.name!,
    image: user.user.image ?? process.env.NEXT_PUBLIC_DEFAULT_USER_IMAGE!,
    username: user.user.username,
    job: user.profile?.job,
  };
};
