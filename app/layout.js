import { Londrina_Solid, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import "./globals.css";

const display = Londrina_Solid({
  subsets: ["latin"],
  weight: ["300", "400", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://arcpenguins.xyz"),
  title: "Arc Penguins — 5,000 penguins on Arc",
  description:
    "ARC PENGUINS is a collection of 5,000 chunky, hand-crafted penguins living on the Arc chain.",
  openGraph: {
    title: "Arc Penguins — 5,000 penguins on Arc",
    description:
      "A collection of 5,000 chunky, hand-crafted penguins living on the Arc chain.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@arcpenguins",
  },
};

export const viewport = {
  themeColor: "#1e140e",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
