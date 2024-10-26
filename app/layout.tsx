import { OnboardModal } from "@/components/auth/OnboardModal";

import DndContext from "@/components/context/PostCreation/DndProvider";
import { AccountPostProvider } from "@/components/context/User/AccountPostProvider";
import { AccountUserProvider } from "@/components/context/User/AccountUserProvider";
import { LoginModalProvider } from "@/components/context/User/LoginModalProvider";
import SessionProvider from "@/components/context/User/SessionProvider";
import { UserFeedProvider } from "@/components/context/User/UserFeedProvider";
import { UserInteractionsProvider } from "@/components/context/UserInteraction/UserInteractionsProvider";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/Shared/sonner";
import { baseAuthOptions } from "@/lib/auth/authOptions";
import { ChildNodeProps } from "@/lib/interface";
import { cn } from "@/lib/util/utils";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Manrope } from "next/font/google";
import "./globals.css";
const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"] });
export const metadata: Metadata = {
  title: "FLEXE.dev",
  description:
    "Network and build connections with other link-minded developers. Share your projects, find inspiration and connect.",
};

export default async function RootLayout({
  children,
}: Readonly<ChildNodeProps>) {
  const session = await getServerSession(baseAuthOptions);
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className="overflow-x-hidden"
    >
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          manrope.className
        )}
      >
        <SessionProvider session={session}>
          <UserInteractionsProvider>
            <UserFeedProvider>
              <AccountUserProvider>
                <AccountPostProvider>
                  <DndContext>
                    <LoginModalProvider>
                      <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                      >
                        <Navbar />
                        <main className="w-[100dvw]">{children}</main>
                        <Toaster />
                        <OnboardModal />
                      </ThemeProvider>
                    </LoginModalProvider>
                  </DndContext>
                </AccountPostProvider>
              </AccountUserProvider>
            </UserFeedProvider>
          </UserInteractionsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
