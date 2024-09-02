"use server";

import ErrorPage from "@/components/Error";
import { UserNetworkConnections } from "@/components/ui/Network/UserNetworkConnections";
import { GetUserNetwork } from "@/controllers/UserController";
import { Suspense } from "react";

interface Props {
  params: {
    username: string;
  };
}

const page = async ({ params }: Props) => {
  const { username } = params;
  const network = await GetUserNetwork(username);

  if (!network) return <ErrorPage />;

  return (
    <Suspense fallback={<>loading</>}>
      <UserNetworkConnections network={network} />
    </Suspense>
  );
};

export default page;
