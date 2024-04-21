import { PostComments, UserPost } from "@prisma/client";

const createNewPost = async (post: UserPost) => {};
const deletePost = async (postID: string) => {};
const updatePost = async (post: UserPost) => {};

const fetchPost = async (postID: string) => {};
const fetchManyPosts = async (postIDs: string[]) => {};

const fetchUserPosts = async (userID: string): Promise<UserPost[]> => {
  return [];
};
const fetchPostComments = async (postID: string) => {};
const createPostComment = async (comment: PostComments) => {};
const deletePostComment = async (commentID: string) => {};
const updatePostComment = async (comment: PostComments) => {};

export {
  createNewPost,
  deletePost,
  updatePost,
  fetchPost,
  fetchManyPosts,
  fetchUserPosts,
  fetchPostComments,
  createPostComment,
  deletePostComment,
  updatePostComment,
};
