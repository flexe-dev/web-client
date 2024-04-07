import { prisma } from "@/lib/prismadb";
export async function PUT(request: Request) {
  const { userID, name, imageURL, job, company, pronouns, location } =
    await request.json();
  try {
    await prisma.userProfile.update({
      where: {
        userId: userID,
      },
      data: {
        name: name,
        image: imageURL,
        job: job,
        company: company,
        pronouns: pronouns,
        location: location,
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
