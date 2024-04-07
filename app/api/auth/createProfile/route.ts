import { prisma } from "@/lib/prismadb";
export async function POST(request: Request) {
  const { userId } = await request.json();
  try {
    await prisma.userProfile.create({
      data: {
        userId: userId,
        name: "",
        job: "",
        company: "",
        pronouns: "",
        location: "",
      },
    });

    return Response.json({
      message: "User and User Account has been successfully created",
    });
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "Error Creating User and Account" },
      { status: 400 }
    );
  }
}
