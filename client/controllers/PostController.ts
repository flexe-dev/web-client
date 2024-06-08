import { UserPost } from "@/lib/interface";

export const savePostAsDraft = async (
  post: Omit<UserPost, "externalData">
): Promise<boolean> => {
  const postToUpload: UserPost = {
    id: post.id,
    auxData: post.auxData,
    document: post.document,
    externalData: {
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
    },
  };
  console.log(JSON.stringify(postToUpload));
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}post/upload`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postToUpload }),
      }
    );
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const publishPost = async (post: UserPost) => {
  if (!post.id) {
    //Create new Database Object
  } else {
    //Update existing Database Object
  }
};

export const archiveDocument = async (postID: string) => {};
