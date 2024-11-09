//Comment Logic


export const GetPostComments = async (
  postID: string
): Promise<CommentNode[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/p/get/post/${postID}`,
      {
        method: `GET`,
        cache: "no-cache",
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
  type: PostType,
  token?: string
): Promise<Comment | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/add/${type}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  type: PostType,
  token?: string
): Promise<number | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/delete/comment/${type}`,
      {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  postID: string,
  opposite: boolean,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/like/${commentID}/${postID}/${opposite}`,
      {
        method: `POST`,
        headers: {
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

export const RemoveCommentReaction = async (
  commentId: string,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/reaction/remove/${commentId}`,
      {
        method: `DELETE`,
        headers: {
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

export const GetPostReactions = async (
  postID: string,
  token?: string
): Promise<Map<string, CommentReactType> | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/reaction/${postID}`,
      {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const DislikeComment = async (
  commentID: string,
  postID: string,
  opposite: boolean,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/dislike/${commentID}/${postID}/${opposite}`,
      {
        method: `POST`,
        headers: {
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

export const EditComment = async (
  comment: Comment,
  token?: string
): Promise<Comment | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/edit`,
      {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
