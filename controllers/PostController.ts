import { Document, PostUserMedia } from "@/lib/interfaces/documentTypes";
import { MediaPost, PostType, TextPost } from "@/lib/interfaces/postTypes";
import { UserPosts } from "@/lib/interfaces/userTypes";
import { supabase } from "@/lib/supabase";
import {
  convertImageSourceToFile,
  defaultPostMetrics,
  getVideoThumbnail,
  resizeImage,
} from "@/lib/util/postUtils";
import { generateMongoID, nullIfEmpty } from "@/lib/util/utils";

/*
  Post Uploading/Manipulation
*/

export const saveTextPost = async (
  textPost: TextPost,
  token?: string
): Promise<TextPost | undefined> => {
  const textPostID = textPost.id ?? (await generateMongoID());
  if (!textPostID) return;

  const postToUpload: TextPost = {
    ...textPost,
    id: textPostID,
    textContent: {
      ...textPost.textContent,
      postId: textPostID,
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}text/upload`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postToUpload),
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const saveMediaPost = async (
  post: MediaPost,
  token?: string
): Promise<MediaPost | undefined> => {
  const postID = post.id ?? (await generateMongoID());
  if (!postID) return;

  const uploadedDocument = await generateNewContentFromUpload(
    post.document.document,
    postID,
    post.auxData.userID
  );
  const thumbnail =
    nullIfEmpty(post.document.thumbnail) ??
    (await handlePostThumbnail(uploadedDocument, postID, post.auxData.userID));

  const postToUpload: MediaPost = {
    id: postID,
    postType: "MEDIA",
    auxData: {
      ...post.auxData,
    },
    document: {
      ...post.document,
      document: uploadedDocument,
      thumbnail,
    },
    metrics: defaultPostMetrics,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}media/upload`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postToUpload),
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const DeletePost = async (
  postID: string,
  postType: PostType,
  token?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_GATEWAY_URL
      }${postType.toLowerCase()}/delete/${postID}`,
      {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const archiveDocument = async (postID: string) => {};

/*
  Post Retrieval
*/

export const GetUserPosts = async (
  userId: string
): Promise<UserPosts | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}post/p/user/${userId}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    return response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const getTextPostById = async (
  postID: string
): Promise<TextPost | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}text/p/find/${postID}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (response.status === 404) {
      return;
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

export const getMediaPostById = async (
  postID: string
): Promise<MediaPost | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}media/p/find/${postID}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (response.status === 404) {
      return;
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return;
  }
};

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
      location: `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_RETRIEVAL_URL}post-content/${userID}/${folder}/${media.content.id}`,
      uploaded: true,
    },
  };
};

const handlePostThumbnail = async (
  document: Document,
  postID: string,
  userID: string
): Promise<string> => {
  const thumbnail = await generateThumbnailSource(document);
  const uploadedFile = await convertImageSourceToFile(
    thumbnail,
    "thumbnail.jpg"
  );
  if (!uploadedFile) return process.env.NEXT_PUBLIC_FALLBACK_PHOTO; //Fallback Photo
  return await uploadThumbnailToSupabase(uploadedFile, postID, userID);
};

const generateThumbnailSource = async (document: Document): Promise<string> => {
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
      (await resizeImage(media[0].content.location, 900, 900)) ??
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
        (await resizeImage(location, 900, 900)) ??
        process.env.NEXT_PUBLIC_FALLBACK_PHOTO
      );
    }
  }
};

const uploadThumbnailToSupabase = async (
  thumbnail: File,
  postID: string,
  userID: string
): Promise<string> => {
  const { error } = await supabase.storage
    .from("post-content")
    .upload(`/${userID}/${postID}/thumbnail.jpg`, thumbnail, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) {
    console.error(error);
    return process.env.NEXT_PUBLIC_FALLBACK_PHOTO; //Fallback Photo
  }
  return `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_RETRIEVAL_URL}post-content/${userID}/${postID}/thumbnail.jpg`;
};
