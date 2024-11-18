//Comment Logic

import {
  Comment,
  CommentDetails,
  CommentNode,
  CommentTree,
  ReactionType,
} from "@/lib/interfaces/commentTypes";
import { CreationRelationship } from "@/lib/interfaces/interactionTypes";

export const GetPostComments = async (
  postID: string,
  token?: string
): Promise<CommentTree | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/p/get/post/${postID}`,
      {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );

    if (response.status !== 200) {
      return;
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const AddComment = async (
  comment: CommentDetails,
  token?: string
): Promise<CreationRelationship<CommentNode> | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/add`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    if (response.status !== 200) {
      return;
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const DeleteComment = async (
  comment: CommentDetails,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/remove`,
      {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    if (response.status !== 200) {
      return false;
    }

    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const ReplyToComment = async (
  comment: CommentDetails,
  parentId: string,
  isParentRoot: boolean,
  token?: string
): Promise<CreationRelationship<CommentNode> | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/reply/${parentId}/?root=${isParentRoot}`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    if (response.status !== 200) {
      return;
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const EditComment = async (
  comment: CommentDetails,
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

export const AddCommentReaction = async (
  comment: CommentDetails,
  reaction: ReactionType,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/react/${reaction}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    if (response.status !== 200) {
      return false;
    }

    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const RemoveCommentReaction = async (
  comment: CommentDetails,
  token?: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}comment/remove/react`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    if (response.status !== 200) {
      return false;
    }

    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const ReportComment = async (comment: CommentDetails) => {
  console.log("die");
};
