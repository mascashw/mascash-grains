
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MASCASH | Trusted Grain Buyers in Zimbabwe",
  description:
    "MASCASH buys quality maize, soya beans, wheat and other grains. Contact our team for buying prices, grain quality requirements and delivery information.",
  keywords: [
    "MASCASH",
    "grain buyers Zimbabwe",
    "maize buying prices",
    "soya beans",
    "grain marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
