import { ObjectId } from "mongodb";
export async function GET(_: Request) {
  return new Response(JSON.stringify({ id: new ObjectId().toHexString() }), {
    status: 200,
  });
}
