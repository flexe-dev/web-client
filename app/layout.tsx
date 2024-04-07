import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/components/context/SessionProvider";
import { getServerSession } from "next-auth";
import { baseAuthOptions } from "@/lib/authOptions";
import { OnboardModal } from "@/components/auth/OnboardModal";
import { Navbar } from "@/components/navbar";
import { AccountProvider } from "@/components/context/AccountProvider";
import { Footer } from "@/components/ui/Footer";
import { FindProfileByUserId } from "@/controllers/AuthController";
export const metadata: Metadata = {
  title: "designs.dev",
  description:
    "Find design and code inspiration easy and fast through our gallery of curated projects and portfolios",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(baseAuthOptions);
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased overflow-x-hidden ",
          jetBrainsMono.className
        )}
      >
        <SessionProvider session={session}>
          <AccountProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main>{children}</main>
              <Toaster />
              <OnboardModal />
              <Footer />
            </ThemeProvider>
          </AccountProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
