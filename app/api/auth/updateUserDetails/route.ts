import { prisma } from "@/lib/prismadb";
export async function PUT(request: Request) {
  const { userID, image, name, job, company, pronouns, location } =
    await request.json();
  try {
    await prisma.userProfile.update({
      where: {
        userId: userID,
      },
      data: {
        job: job,
        company: company,
        pronouns: pronouns,
        location: location,
      },
    });

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        image: image,
        name: name,
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
