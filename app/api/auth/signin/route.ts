import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  const { userID, password } = await request.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password && (await bcrypt.compare(password, user.password))) {
      return Response.json(
        { message: "User Successfully Logged In" },
        { status: 200 }
      );
    }
    return Response.json({ message: "Password incorrect" }, { status: 401 });
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
