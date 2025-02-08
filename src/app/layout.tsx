import "./globals.css";
import { WebSocketProvider } from "@/contexts/WebSocketProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <WebSocketProvider>
            <div className="justifyCenter fullScreen">{children}</div>
          </WebSocketProvider>
      </body>
    </html>
  );
}
