import { NetworkStatus, UserInteractionRelationship } from "./interface";

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
