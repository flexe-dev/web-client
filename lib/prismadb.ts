import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { Adapter, AdapterUser } from "next-auth/adapters";
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
const adapter = PrismaAdapter(prisma) as Adapter;
export { prisma, adapter };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
