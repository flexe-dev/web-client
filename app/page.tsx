"use server";

import { UserFeed } from "@/components/ui/Feed/UserFeed";
import { HomePageLanding } from "@/components/ui/Landing/HomePageLanding";
import { baseAuthOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(baseAuthOptions);
  if (!session || !session.user) return <HomePageLanding />;

  return <UserFeed session={session} />;
};

export default Home;
