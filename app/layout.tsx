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
    <html
      lang="en"
      suppressHydrationWarning={true}
      className="overflow-x-hidden"
    >
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
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
              <main className="w-[100dvw]">{children}</main>
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
