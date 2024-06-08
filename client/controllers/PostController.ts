import { UserPost } from "@/lib/interface";

export const savePostAsDraft = async (
  post: Omit<UserPost, "external">,
  userID: string
): Promise<boolean> => {
  const postToUpload: UserPost = {
    data: post.data,
    document: post.document,
    external: {
      likes: 0,
      comments: 0,
      views: 0,
    },
  };
  //Either Upload New Post Document to the database, or save to an existing document
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}post/upload/draft`,
      {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postToUpload, userID }),
      }
    );
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const publishPost = async (post: UserPost) => {
  if (!post.data.id) {
    //Create new Database Object
  } else {
    //Update existing Database Object
  }
};

export const archiveDocument = async (postID: string) => {};
