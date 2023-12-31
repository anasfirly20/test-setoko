import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";

// Components
import Navbar from "@/components/Navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Github Repository Explorer",
  description: "Github Repository Explorer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} px-longer`}>
        <link rel="icon" href="/github-mark-white.svg" sizes="any" />
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
