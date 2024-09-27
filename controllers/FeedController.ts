import { FeedDisplayReference } from "@/lib/interface";

export const GetUserFeed = async (
  token: string
): Promise<FeedDisplayReference[] | undefined> => {
  if (!token) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}feed/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 404) return;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};
