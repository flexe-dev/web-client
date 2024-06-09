import { Document, PostUserMedia, UserPost } from "@/lib/interface";
import { supabase } from "@/lib/supabase";
import { generateMongoID, getVideoThumbnail, resizeImage } from "@/lib/utils";

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
    auxData: {
      ...post.auxData,
      thumbnail:
        post.auxData.thumbnail ??
        (await generateDefaultThumbnail(uploadedDocument)),
    },
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

export const archiveDocument = async (postID: string) => {};

/* 
Helper Functions
*/

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

const generateDefaultThumbnail = async (
  document: Document
): Promise<string> => {
  //This will find the first instance of visual content and generate a sized down thumbnail for the post
  const visualTypes = ["IMAGE", "VIDEO", "CAROUSEL"];
  const content = document.find(
    (block) => block.type && visualTypes.includes(block.type)
  );
  if (!content || !content.value?.contentValue)
    return process.env.NEXT_PUBLIC_FALLBACK_PHOTO;
  const media = content.value.contentValue;
  if (media instanceof Array) {
    return (
      (await resizeImage(media[0].content.location, 300, 300)) ??
      process.env.NEXT_PUBLIC_FALLBACK_PHOTO
    );
  } else {
    const location = (media as PostUserMedia).content.location;
    if (content.type === "VIDEO") {
      return (
        (await getVideoThumbnail(location)) ??
        process.env.NEXT_PUBLIC_FALLBACK_PHOTO
      );
    } else {
      return (
        (await resizeImage(location, 300, 300)) ??
        process.env.NEXT_PUBLIC_FALLBACK_PHOTO
      );
    }
  }
};

export const publishPost = async (post: UserPost) => {
  if (!post.id) {
    //Create new Database Object
  } else {
    //Update existing Database Object
  }
};
