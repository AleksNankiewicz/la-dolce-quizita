import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-circular-progressbar/dist/styles.css";

import { AppProvider } from "@/components/Appcontext";

import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import { cn } from "@/lib/utils";

import MainSidebar from "@/components/layouts/MainSidebar";
import Navbar from "@/components/layouts/navbar/Navbar";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizyMania",
  description:
    "QuizyMania to platforma, która zapewnia entuzjastom quizów możliwość eksplorowania różnorodnych tematów i testowania swojej wiedzy w przyjaznej i interaktywnej atmosferze.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const userSlug = session?.user.slug;
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <AppProvider>
          <Navbar userSlug={userSlug} isGame={fullUrl.includes("game")} />
          <MainSidebar userSlug={userSlug} isGame={fullUrl.includes("game")} />
          <MaxWidthWrapper isGame={fullUrl.includes("game")}>
            <div className="mt-[80px] min-h-[90vh] bg-background px-0">
              {children}
            </div>
            <Toaster />
          </MaxWidthWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
