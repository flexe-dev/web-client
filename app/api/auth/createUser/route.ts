import User from "@/lib/model/User";
import { ObjectId, UUID } from "mongodb";
import { HashPassword } from "@/lib/utils";
import Account from "@/lib/model/Account";
export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const user = await User.create({
      _id: new ObjectId(),
      name: "New User",
      username: new UUID().toString(),
      email: email,
      password: await HashPassword(password),
    });
    await Account.create({
      _id: new ObjectId(),
      userId: user._id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: user._id.toString(),
    });

    return Response.json({ message: "User has been successfully created" });
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "Error Creating User and Account" },
      { status: 400 }
    );
  }
}
