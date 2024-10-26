import { FeedDisplayReference, FeedPost } from "@/lib/interface";

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

    //if not 2xx status code, return
    if (!response.ok) {
      console.error("Failed to fetch user feed");
      return;
    }

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};

export const GetFeedPosts = async (
  references: FeedDisplayReference[],
  token?: string
): Promise<FeedPost[] | undefined> => {
  if (!references) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}post/feed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(references),
      }
    );

    //if not 2xx status code, return
    if (!response.ok) return;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return;
  }
};
