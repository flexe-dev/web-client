import { OnboardModal } from "@/components/auth/OnboardModal";
import { AccountProvider } from "@/components/context/AccountProvider";
import DndContext from "@/components/context/DndProvider";
import SessionProvider from "@/components/context/SessionProvider";
import { UserInteractionsProvider } from "@/components/context/UserInteractionsProvider";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { baseAuthOptions } from "@/lib/authOptions";
import { ChildNodeProps } from "@/lib/interface";
import { cn } from "@/lib/utils";
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
          <AccountProvider>
            <UserInteractionsProvider>
              <DndContext>
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
              </DndContext>
            </UserInteractionsProvider>
          </AccountProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
