import { prisma } from "@/lib/prismadb";
export async function PUT(request: Request) {
  const { userID, username, name, imageURL } = await request.json();
  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        username: username,
        name: name,
        onboarded: true,
        image: imageURL,
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
