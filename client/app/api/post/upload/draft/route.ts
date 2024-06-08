import { prisma } from "@/lib/prismadb";
import { UserPost, PostDocument } from "@prisma/client";
import { UserPost as ClientPost, PostUserMedia } from "@/lib/interface";
import { ObjectId } from "mongodb";
import { supabase } from "@/lib/supabase";
interface Props {
  post: ClientPost;
  userID: string;
}

export async function PUT(request: Request) {
  const { post, userID }: Props = await request.json();
  console.log(post);
  //Upload All New Media Files To Supabase
  const folderID = post.data.id ?? new ObjectId().toHexString();
  //Upload Each Image If not already uploaded and then alter the content object to reflect new URL and Uploaded Status
  const uploadedDocument = await Promise.all(
    post.document.map(async (block) => {
      if (block.value instanceof Array) {
        block.value.map(async (media: PostUserMedia) => {
          return await uploadContentToSupabase(media, folderID);
        });
      } else if (!(block.value instanceof String)) {
        const uploadedMedia = await uploadContentToSupabase(
          block.value as PostUserMedia,
          folderID
        );
        return { ...block, value: uploadedMedia };
      }
      return block;
    })
  );

  const document: PostDocument[] = uploadedDocument.map(
    (block): PostDocument => {
      return {
        id: block.id,
        style: { value: JSON.stringify(block.style) },
        options: { value: JSON.stringify(block.options) },
        value: { value: JSON.stringify(block.value) },
        component: block.content.name,
      };
    }
  );

  const postToUpload: UserPost = {
    id: post.data.id ?? new ObjectId().toHexString(),
    userId: userID,
    title: post.data.title,
    tags: post.data.tags,
    postStatus: post.data.postStatus,
    technologies: post.data.tech,
    createdAt: new Date(),
    commentCount: 0,
    likeCount: 0,
    viewCount: 0,
    document: document,
  };
  await prisma.userPost.upsert({
    where: { id: postToUpload.id },
    update: postToUpload,
    create: postToUpload,
  });
  return new Response("OK", { status: 200 });
}

const uploadContentToSupabase = async (
  media: PostUserMedia,
  folder: string
): Promise<PostUserMedia> => {
  if (media.content.uploaded) return media;
  const { error } = await supabase.storage
    .from("postContent")
    .upload(`${folder}/${media.content.id}`, media.file!, {
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
      location: `${folder}/${media.content.id}`,
      uploaded: true,
    },
  };
};
