import { ObjectId, UUID } from "mongodb";
import { HashPassword } from "@/lib/utils";
import prisma from "@/lib/prismadb";
export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: "New User",
        password: await HashPassword(password),
        username: new UUID().toString(),
        onboarded: false,
        emailVerified: null,
      },
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: user.id.toString(),
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
