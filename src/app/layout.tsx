import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Power-up Lunch — Famiflora",
  description:
    "Inscris-toi au Power-up Lunch de Famiflora — un buffet healthy pour faire le plein d'énergie. Schrijf je in voor de Power-up Lunch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={rubik.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
