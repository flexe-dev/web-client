import { prisma } from "@/lib/prismadb";
export async function PUT(request: Request) {
  const { userId, avatarURL, name } = await request.json();
  try {
    await prisma.userProfile.update({
      where: {
        userId: userId,
      },
      data: {
        image: avatarURL,
        name: name,
      },
    });
    return Response.json(
      { message: "Profile Successfully Updated" },
      { status: 200 }
    );
  } catch (e) {
    return Response.json({ message: "Profile not found" }, { status: 404 });
  }
}
