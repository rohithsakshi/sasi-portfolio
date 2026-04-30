import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sasidharan K. — Product & Industrial Designer",
  description: "Portfolio of Sasidharan K., Product and Industrial Designer from Virudhanagar, Tamil Nadu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
