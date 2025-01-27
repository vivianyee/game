import { NextAuthProvider } from "@/contexts/nextauthprovider";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className="justifyCenter fullScreen">{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
