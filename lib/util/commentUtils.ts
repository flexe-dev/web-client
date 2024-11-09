import { CommentNode, SortCriteria } from "../interfaces/commentTypes";
import { UserDisplay } from "../interfaces/userTypes";

export const GenerateCommentObject = (
  postID: string,
  account: UserDisplay,
  content: string,
  parentId?: string
): CommentNode => {
  return {
    children: [],
    user: account,
    comment: {
      id: "",
      postId: postID,
      userId: account.user.id,
      content: content,
      parentId: parentId,
      dateCreated: new Date(),
      likes: 0,
      dislikes: 0,
    },
  };
};

export const TraverseCommentTree = () => {};

export const getTotalChildren = (comment: CommentNode): number => {
  return getTotalChildrenAux(comment) - 1;
};

export const getTotalChildrenAux = (comment: CommentNode): number => {
  return comment.children.reduce(
    (acc, child) => acc + getTotalChildrenAux(child),
    1
  );
};

export const getCommentPerformance = (comment: CommentNode): number => {
  return comment.comment.likes - comment.comment.dislikes;
};

export const CommentSortAlgorithm: Record<
  SortCriteria,
  (nodeA: CommentNode, nodeB: CommentNode) => number
> = {
  NEWEST: (nodeA, nodeB) => {
    return (
      new Date(nodeB.comment.dateCreated).getTime() -
      new Date(nodeA.comment.dateCreated).getTime()
    );
  },
  OLDEST: (nodeA, nodeB) => {
    return (
      new Date(nodeA.comment.dateCreated).getTime() -
      new Date(nodeB.comment.dateCreated).getTime()
    );
  },
  TOP: (nodeA, nodeB) => {
    return getCommentPerformance(nodeB) - getCommentPerformance(nodeA);
  },
};
