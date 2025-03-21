import { SocketIdProvider } from "@/contexts/SocketIdProvider";
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
        <SocketIdProvider>
          <WebSocketProvider>
            <div className="justifyCenter fullScreen">{children}</div>
          </WebSocketProvider>
        </SocketIdProvider>
      </body>
    </html>
  );
}
