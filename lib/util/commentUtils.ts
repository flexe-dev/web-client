import {
  Comment,
  CommentDetails,
  CommentIdentifier,
  CommentNode,
  CommentPath,
  CommentReaction,
  CommentStatus,
  LinkedComment,
  ReactionType,
  SortCriteria,
} from "../interfaces/commentTypes";
import { CreationRelationship } from "../interfaces/interactionTypes";
import { UserDetails } from "../interfaces/userTypes";

export const CreateCommentObject = (
  content: string,
  user: UserDetails,
  postId: string
): CommentDetails => {
  return {
    // Local Id to preserve uniqueness in the event of a failed upload
    id: Math.random().toString(36).substring(7),
    postId: postId,
    userId: user.userId,
    content,
    likeCount: 0,
    dislikeCount: 0,
    status: "PUBLIC",
  };
};

export const ConvertCommentDetails = (
  comment: CommentDetails,
  user: UserDetails,
  commentStatus: CommentStatus
): CreationRelationship<CommentNode> => {
  return {
    root: {
      ...comment,
      status: commentStatus,
      user: {
        root: user,
        timestamp: new Date(),
      },
      children: [],
    },
    createdAt: new Date(),
  };
};

export const GenerateLinkedComment = (
  comment: Comment,
  parent?: LinkedComment
): LinkedComment => {
  return {
    ...comment,
    path: parent
      ? {
          ...parent.path,
          next: {
            node: GenerateCommentIdentifier(comment),
          },
        }
      : { node: GenerateCommentIdentifier(comment) },
    previous: parent ? GenerateCommentIdentifier(parent) : null,
    isRoot: parent === null,
  };
};

export const GenerateCommentIdentifier = (
  comment: Comment
): CommentIdentifier => {
  return {
    id: comment.root.id,
    status: comment.root.status,
  };
};

export const updateCommentStatus = <T extends Comment>(
  node: T,
  status: CommentStatus
): T => {
  return {
    ...node,
    root: {
      ...node.root,
      status,
    },
  };
};

export const CreateReactionObject = (
  comment: CommentDetails,
  reaction: ReactionType,
  user: UserDetails
): CommentReaction => {
  return {
    reactionType: reaction,
    key: {
      postId: comment.postId,
      userId: user.userId,
      commentId: comment.id,
    },
  };
};

/**
  "Removes" a comment by clearing any associated metadata or content
  and setting its status to "DELETED", allowing comment structure
  to be preserved in the tree to maintain comment history.

  @param {T extends Comment} node: The comment to remove
*/
export const RemoveComment = <T extends Comment>(node: T): T => {
  return {
    ...node,
    root: {
      ...node.root,
      status: "DELETED",
      user: null,
      userId: null,
      content: "This comment has been removed",
    },
  };
};

/**
 * Returns the calculated metric for a comment based on the
 * difference between the like and dislike counts
 *
 * @param comment: The comment to calculate the metric for
 */
export const CalculateCommentMetric = (comment: Comment): number => {
  return comment.root.likeCount - comment.root.dislikeCount;
};

export const CommentSortAlgorithm: Record<
  SortCriteria,
  (a: Comment, b: Comment) => number
> = {
  NEWEST: (a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  },
  OLDEST: (a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  },
  TOP: (a, b) => {
    return CalculateCommentMetric(b) - CalculateCommentMetric(a);
  },
};

/**
    This will traverse a comment tree to a target node and update the node
    with a given callback, else will return the current node

    @param {LinkedComment} target: The target node to update with its path from its respective root
    @param {Comment} current: The current node being traversed
    @param {CommentPath} path: The path to the target node from its root
    @param {Function} fn: The callback to update the node with 
  */
export const traverseCommentTree = (
  target: LinkedComment,
  current: Comment,
  path: CommentPath,
  fn: (comment: Comment) => Comment
): Comment => {
  //funny
  if (!path.next) {
    if (current.root.id === target.root.id) {
      return fn(current);
    } else {
      console.error("Oh god something went horribly wrong with traversal");
      return current;
    }
  }

  const nextIndex = current.root.children.findIndex(
    (n) => n.root.id === path.next!.node.id
  );

  if (nextIndex === -1) return current;

  return {
    ...current,
    root: {
      ...current.root,
      children: [
        ...current.root.children.slice(0, nextIndex),
        traverseCommentTree(
          target,
          current.root.children[nextIndex],
          path.next,
          fn
        ),
        ...current.root.children.slice(nextIndex + 1),
      ],
    },
  };
};

export const GetCommentDepthLevel = (comment: LinkedComment) => {
  return GetCommentDepthLevelAux(comment.path, 0);
};

export const GetCommentDepthLevelAux = (
  path: CommentPath,
  level: number
): number => {
  if (!path.next) return level;
  return GetCommentDepthLevelAux(path.next, level + 1);
};

export const getTotalChildren = (comment: Comment): number => {
  return getTotalChildrenAux(comment) - 1;
};

export const getTotalChildrenAux = (comment: Comment): number => {
  return comment.root.children.reduce(
    (acc, child) => acc + getTotalChildrenAux(child),
    1
  );
};
