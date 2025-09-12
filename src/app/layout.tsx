import "./globals.css";
import { SsgoiProvider } from "./_providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <SsgoiProvider>{children}</SsgoiProvider>
      </body>
    </html>
  );
}
