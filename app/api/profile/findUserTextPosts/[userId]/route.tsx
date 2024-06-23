import { prisma } from "@/lib/prismadb";
import { prismaExclude } from "@/lib/prisma/utils";
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  try {
    const textPosts = await prisma.textPosts.findMany({
      where: {
        userId: userId,
      },
    });
    return Response.json(textPosts);
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
