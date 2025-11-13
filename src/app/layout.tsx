import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import Providers from "./providers";
import { stackHeadline } from "../app/_fonts/fonts";

export const metadata: Metadata = {
  title: "Social",
  description: "Social media app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${stackHeadline.variable}`}
    >
      <body>
        <Providers>
          <main className="min-h-screen w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
