import { UserPost } from "@/lib/interface";

export async function POST(request: Request) {
  const post: UserPost = await request.json();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}post/upload`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }
    );
    const uploadedPost = await response.json();
    return Response.json(uploadedPost);
  } catch (e) {
    console.error(e);
    return Response.json({ message: "Error Uploading Post" }, { status: 400 });
  }
}
