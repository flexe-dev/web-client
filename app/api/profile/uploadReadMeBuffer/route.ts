import { prisma } from "@/lib/prismadb";

export async function PUT(request: Request) {
  const { buffer, userID } = await request.json();
  try {
    await prisma.userProfile.update({
      where: {
        userId: userID,
      },
      data: {
        readMe: buffer,
      },
    });
    return Response.json({
      message: "ReadMe uploaded successfully",
    });
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "Error uploading ReadMe" },
      { status: 400 }
    );
  }
}
