import {
  InteractionRelationship,
  NetworkStatus,
  UserConnection,
  UserDetails,
  UserDisplay,
} from "../interface";

export const getNetworkStatus = (
  targetID: string,
  following: InteractionRelationship<UserDetails>[],
  followers: InteractionRelationship<UserDetails>[]
): NetworkStatus => {
  const isFollowing = following.some(
    (following) => following.root.userId === targetID
  );
  const isFollowed = followers.some(
    (follower) => follower.root.userId === targetID
  );

  if (isFollowing && isFollowed) return "friends";
  if (isFollowing) return "following";
  if (isFollowed) return "followed";
  return "none";
};

export const getUserFriends = <T extends InteractionRelationship<UserDetails>>(
  following: T[],
  followers: T[]
) => {
  const set = new Set<string>(following.map((f) => f.root.userId));
  return followers.filter((f) => set.has(f.root.userId));
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

export const getMutualConnections = (
  userFollowing: InteractionRelationship<UserDetails>[],
  targetFollowers: UserConnection[]
): UserConnection[] => {
  if (userFollowing?.length === 0) return [];

  const followingSet = new Set(
    userFollowing.map((following) => following.root.userId)
  );
  return targetFollowers.filter((follower) =>
    followingSet.has(follower.root.userId)
  );
};
