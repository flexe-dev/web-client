import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
const manrope = Manrope({ subsets: ["latin"], weight: "600" });
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/components/context/SessionProvider";
import { getServerSession } from "next-auth";
import { baseAuthOptions } from "@/lib/authOptions";
import { OnboardModal } from "@/components/auth/OnboardModal";
import { Navbar } from "@/components/navbar";
import { AccountProvider } from "@/components/context/AccountProvider";
import { ChildNodeProps } from "@/lib/interface";
import DndContext from "@/components/context/DndProvider";
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
          </AccountProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
