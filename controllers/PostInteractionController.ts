import {
  PostInteraction,
  PostInteractionType,
  PostType,
} from "@/lib/interface";

export const LikePost = async (
  interaction: PostInteraction
): Promise<boolean> => {
  const { postId, userId, postType } = interaction;
  return await handlePostInteraction(postId, userId, postType, `LIKE`);
};

export const UnlikePost = async (
  interaction: PostInteraction
): Promise<boolean> => {
  const { postId, userId, postType } = interaction;
  return await handlePostInteraction(postId, userId, postType, `UNLIKE`);
};

export const SavePost = async (
  interaction: PostInteraction
): Promise<boolean> => {
  const { postId, userId, postType } = interaction;
  return await handlePostInteraction(postId, userId, postType, `SAVE`);
};

export const UnsavePost = async (
  interaction: PostInteraction
): Promise<boolean> => {
  const { postId, userId, postType } = interaction;
  return await handlePostInteraction(postId, userId, postType, `UNSAVE`);
};

export const ViewPost = async (
  interaction: PostInteraction
): Promise<boolean> => {
  const { postId, userId, postType } = interaction;
  return await handlePostInteraction(postId, userId, postType, `VIEW`);
};

// export const sharePost = async (
//   interaction: PostInteraction
// ): Promise<boolean> => {
//   const { postId, userId, postType } = interaction;
//   return await handlePostInteraction(postId, userId, postType, `SHARE`);
// };

const handlePostInteraction = async (
  postID: String,
  userID: string,
  postType: PostType,
  interaction: PostInteractionType
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_POST_SERVICE_URL
      }post/${postType.toLowerCase()}/${interaction.toLowerCase()}/${postID}/${userID}`,
      {
        method: `POST`,
      }
    );
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};
