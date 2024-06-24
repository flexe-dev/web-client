import { prisma } from "@/lib/prismadb";
export async function PUT(request: Request) {
  const { userId, textPost } = await request.json();
  try {
    await prisma.textPosts.create({
      data: {
        userId: userId,
        postText: textPost,
      },
    });

    return Response.json(
      { message: "TextPost Successfully uploaded" },
      { status: 200 }
    );
  } catch (e) {
    return Response.json({ message: "Textpost not uploaded" }, { status: 404 });
  }
}
