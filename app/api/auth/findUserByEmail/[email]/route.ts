import User from "@/lib/model/User";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  const user = await User.findOne({ email }).select("-password");
  return Response.json(user);
}
