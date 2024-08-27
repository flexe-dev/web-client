import {
  PostInteraction,
  PostInteractionType,
  PostType,
} from "@/lib/interface";

export const LikePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId, postType } = interaction;
  return await handlePostInteraction(postId, postType, `LIKE`, token);
};

export const UnlikePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId, postType } = interaction;
  return await handlePostInteraction(postId, postType, `UNLIKE`, token);
};

export const SavePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId, postType } = interaction;
  return await handlePostInteraction(postId, postType, `SAVE`, token);
};

export const UnsavePost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId, postType } = interaction;
  return await handlePostInteraction(postId, postType, `UNSAVE`, token);
};

export const ViewPost = async (
  interaction: PostInteraction,
  token?: string
): Promise<boolean> => {
  const { postId, postType } = interaction;
  return await handlePostInteraction(postId, postType, `VIEW`, token);
};

// export const sharePost = async (
//   interaction: PostInteraction
// ): Promise<boolean> => {
//   const { postId, postType } = interaction;
//   return await handlePostInteraction(postId, postType, `SHARE`);
// };

const handlePostInteraction = async (
  postID: String,
  postType: PostType,
  interaction: PostInteractionType,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_GATEWAY_URL
      }${postType.toLowerCase()}/${interaction.toLowerCase()}/${postID}`,
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
