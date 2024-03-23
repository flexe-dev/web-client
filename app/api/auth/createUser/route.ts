import User from "@/lib/model/User";
import { ObjectId, UUID } from "mongodb";
import { HashPassword } from "@/lib/utils";
export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await User.create({
    name: "New User",
    username: new UUID().toString(),
    email: email,
    password: HashPassword(password),
  });
  return Response.json(user, { status: 201 });
}
