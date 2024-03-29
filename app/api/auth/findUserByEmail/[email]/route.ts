import prisma from "@/lib/prismadb";
import { prismaExclude } from "@/lib/prisma/utils";
export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: prismaExclude("User", ["password"]),
    });
    return Response.json(user);
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
