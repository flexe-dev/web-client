//Comment Logic

import {
  Comment,
  CommentNode,
  CommentReactType,
  PostType,
} from "@/lib/interface";

export const GetPostComments = async (
  postID: string
): Promise<CommentNode[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/get/post/${postID}`,
      {
        method: `GET`,
        cache: "no-store",
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const AddComment = async (
  comment: Comment,
  type: PostType
): Promise<Comment | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/add/${type}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const DeleteComment = async (
  comment: CommentNode,
  type: PostType
): Promise<number | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/delete/comment/${type}`,
      {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const LikeComment = async (
  commentID: string,
  userID: string,
  postID: string,
  opposite: boolean
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/like/${commentID}/${userID}/${postID}/${opposite}`,
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

export const RemoveCommentReaction = async (
  commentId: string,
  userId: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/reaction/remove/${commentId}/${userId}`,
      {
        method: `DELETE`,
      }
    );
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const GetPostReactions = async (
  postID: string,
  userId: string
): Promise<Map<string, CommentReactType> | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/reaction/${postID}/${userId}`
    );
    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const DislikeComment = async (
  commentID: string,
  userID: string,
  postID: string,
  opposite: boolean
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/dislike/${commentID}/${userID}/${postID}/${opposite}`,
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

export const EditComment = async (
  comment: Comment
): Promise<Comment | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}post/comment/edit`,
      {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );

    if (response.status !== 200) {
      return null;
    }

    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};
