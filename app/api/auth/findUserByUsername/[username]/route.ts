import prisma from "@/lib/prismadb";
export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return Response.json(user);
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
