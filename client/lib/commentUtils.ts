import { Comment } from "./interface";

export const GenerateCommentObject = (
  postID: string,
  userId: string,
  content: string,
  parentId?: string
): Comment => {
  return {
    id: "",
    postId: postID,
    userId: userId,
    content: content,
    parentId: parentId,
    dateCreated: new Date(),
    likes: 0,
    dislikes: 0,
  };
};

export const TraverseCommentTree = () => {};
