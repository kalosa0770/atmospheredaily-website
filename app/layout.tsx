import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "Atmosphere Daily",
  description: "A daily newsletter about the market trends, spiritual insights, and social issues.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="bg-white text-slate-900 antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
