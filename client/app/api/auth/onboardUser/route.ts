import { prisma } from "@/lib/prismadb";
export async function PUT(request: Request) {
  const { userID, username, name, image } = await request.json();
  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        username: username,
        onboarded: true,
        name: name,
        image: image,
      },
    });
    return Response.json(
      { message: "User Successfully Updated" },
      { status: 200 }
    );
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
