"use server";

import ErrorPage from "@/components/Error";
import { UserNetworkConnections } from "@/components/ui/Network/UserNetworkConnections";
import { GetUserNetwork } from "@/controllers/UserController";
import { baseAuthOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

interface Props {
  params: {
    username: string;
  };
}

const page = async ({ params }: Props) => {
  const session = await getServerSession(baseAuthOptions);
  const { username } = params;
  
  const network = await GetUserNetwork(username, session?.user?.id);

  if (!network) return <ErrorPage />;

  return (
    <Suspense fallback={<>loading</>}>
      <UserNetworkConnections network={network} />
    </Suspense>
  );
};

export default page;
