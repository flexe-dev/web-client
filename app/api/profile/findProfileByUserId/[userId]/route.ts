import { prisma } from "@/lib/prismadb";
import { prismaExclude } from "@/lib/prisma/utils";
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        userId: userId,
      },
    });
    return Response.json(user);
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
