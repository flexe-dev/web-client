import User from "@/lib/model/User";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  try {
    const user = await User.findOne({ email });
    return Response.json(user);
  } catch (e) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
}
