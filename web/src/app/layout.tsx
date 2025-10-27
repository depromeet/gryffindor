import "./globals.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { NavigationDirectionProvider } from "@/shared/lib";
import { NativeProvider, QueryProvider, SsgoiProvider, UserStateProvider } from "./_providers";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "밥토리 | 혼밥을 더 자유롭고 편하게",
  description: "혼밥을 더 자유롭고 편하게",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ko" className="overflow-x-hidden">
      <body className={`${pretendard.variable}`} suppressHydrationWarning>
        <SessionProvider session={session}>
          <UserStateProvider>
            <QueryProvider>
              <NavigationDirectionProvider>
                <SsgoiProvider>
                  <NativeProvider>{children}</NativeProvider>
                </SsgoiProvider>
              </NavigationDirectionProvider>
            </QueryProvider>
          </UserStateProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
