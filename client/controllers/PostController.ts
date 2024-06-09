import { Document, PostUserMedia, UserPost } from "@/lib/interface";
import { supabase } from "@/lib/supabase";
import { generateMongoID } from "@/lib/utils";

export const savePostAsDraft = async (
  post: Omit<UserPost, "externalData">
): Promise<UserPost | undefined> => {
  const postID = post.id ?? (await generateMongoID());
  if (!postID) return;

  const uploadedDocument = await generateNewContentFromUpload(
    post.document,
    postID,
    post.auxData.userID
  );

  const postToUpload: UserPost = {
    id: postID,
    auxData: post.auxData,
    document: uploadedDocument,
    externalData: {
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
    },
  };
  // Send Data to Proxy Server
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}post/upload`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postToUpload),
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

const generateNewContentFromUpload = async (
  document: Document,
  postID: string,
  userID: string
): Promise<Document> => {
  return await Promise.all(
    document.map(async (block) => {
      if (block.value?.contentValue instanceof Array) {
        const uploadedMedia = await Promise.all(
          block.value.contentValue.map(async (media: PostUserMedia) => {
            return await uploadContentToSupabase(userID, media, postID);
          })
        );
        return {
          ...block,
          value: {
            contentValue: uploadedMedia,
          },
        };
      } else if (typeof block.value?.contentValue !== "string") {
        const uploadedMedia = await uploadContentToSupabase(
          userID,
          block.value?.contentValue as PostUserMedia,
          postID
        );
        return {
          ...block,
          value: {
            contentValue: uploadedMedia,
          },
        };
      }
      return block;
    })
  );
};

/* 
Helper Functions
*/

const uploadContentToSupabase = async (
  userID: string,
  media: PostUserMedia,
  folder: string
): Promise<PostUserMedia> => {
  if (media.content.uploaded) return media;
  const { error } = await supabase.storage
    .from("post-content")
    .upload(`/${userID}/${folder}/${media.content.id}`, media.file!, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.error(error);
    return media;
  }

  return {
    ...media,
    content: {
      ...media.content,
      location: `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_RETRIEVAL_URL}/post-content/${userID}/${folder}/${media.content.id}`,
      uploaded: true,
    },
  };
};

export const publishPost = async (post: UserPost) => {
  if (!post.id) {
    //Create new Database Object
  } else {
    //Update existing Database Object
  }
};

export const archiveDocument = async (postID: string) => {};
