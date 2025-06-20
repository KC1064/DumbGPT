import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Spotlight } from "@/components/ui/spotlight-new";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DumbGPT",
  description: "Complex things made simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon_io/favicon.ico" type="image/png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight gradientFirst="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 65%, 0.25) 0%, hsla(200, 100%, 50%, 0.15) 50%, transparent 100%)"
              gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(315, 100%, 60%, 0.25) 0%, hsla(315, 100%, 45%, 0.15) 50%, transparent 100%)"
              gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(330, 100%, 70%, 0.3) 0%, hsla(330, 100%, 55%, 0.15) 50%, transparent 100%)"
              translateY={-100}
              duration={10}
            />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
