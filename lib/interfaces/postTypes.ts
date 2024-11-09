import { Document, PostContent } from "./documentTypes";
import { UserPosts } from "./userTypes";

export type PostType = "TEXT" | "MEDIA";

export interface PostAuxilliaryData {
  userID: string;
  dateCreated: Date;
  dateUpdated?: Date;
  tags: string[];
}

export interface PostMetrics {
  likeCount: number;
  commentCount: number;
  viewCount: number;
  saveCount: number;
  repostCount: number;
  shareCount: number;
}

export const postTypeMap: Record<PostType, keyof UserPosts> = {
  MEDIA: "mediaPosts",
  TEXT: "textPosts",
};

export interface Post {
  id?: string;
  auxData: PostAuxilliaryData;
  metrics: PostMetrics;
  postType: PostType;
}

export interface PostReferences {
  postId?: string;
  userId: string;
}

export interface MediaDocument extends PostReferences {
  document: Document;
  title: string;
  postStatus: PostStatus;
  thumbnail: string;
}

export interface TextContent extends PostReferences {
  content: string;
  media: PostContent[];
}

export interface MediaPost extends Post {
  document: MediaDocument;
}

export interface TextPost extends Post {
  textContent: TextContent;
}

const postStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type PostStatus = (typeof postStatuses)[number];

export interface PostNode {
  postId: string;
  userId: string;
  postDate: Date;
  type: PostType;
  tags: string[];
  tech: string[];
  keywords: string[];
}
