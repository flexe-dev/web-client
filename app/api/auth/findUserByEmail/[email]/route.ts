import prisma from "@/lib/prismadb";
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
    });
    return Response.json(user);
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
