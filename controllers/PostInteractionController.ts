import { PostInteraction, PostInteractionType } from "@/lib/interface";

export const LikePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId } = interaction;
  return await handlePostInteraction(postId, `LIKE`, token);
};

export const UnlikePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId } = interaction;
  return await handlePostInteraction(postId, `UNLIKE`, token);
};

export const RepostPost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId } = interaction;
  return await handlePostInteraction(postId, `REPOST`, token);
};

export const RemoveRepost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId } = interaction;
  return await handlePostInteraction(postId, `UNREPOST`, token);
};

export const SavePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId } = interaction;
  return await handlePostInteraction(postId, `SAVE`, token);
};

export const UnsavePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId } = interaction;
  return await handlePostInteraction(postId, `UNSAVE`, token);
};

export const ViewPost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId } = interaction;
  return await handlePostInteraction(postId, `VIEW`, token);
};

const actionRouteMap: Record<PostInteractionType, string> = {
  LIKE: `like`,
  UNLIKE: `remove/like`,
  SAVE: `favourite`,
  UNSAVE: `remove/favourite`,
  REPOST: `repost`,
  UNREPOST: `remove/repost`,
  VIEW: `view`,
  SHARE: `share`,
};

const handlePostInteraction = async (
  postID: String,
  interaction: PostInteractionType,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}interaction/${actionRouteMap[interaction]}/${postID}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};
