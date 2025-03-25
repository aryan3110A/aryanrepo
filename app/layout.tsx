// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";
//import { Testimonials } from "@/components/testimonials";
import { PartnersSection } from "@/components/partners-section";
import ContactSection from "@/components/ContactSection";

import { db } from "../lib/firebaseConfig"; // Correct path for `app/`
import SupportPage from "@/components/support-page";
import Index from "@/components/Index";
import SubscriptionToggle from "@/components/subscription-toggle";
import Navbar from "@/components/navbar";
import Page from "@/components/navbar";
import HomePage from "@/components/HomePage";
import ArtStation from "@/components/art-station";
import TextGenerationTemplate from "@/components/template";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WildMind - AI Creative Studio",
  description:
    "Turn imagination into high-quality, creative visuals with advanced AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        {/* <ContactSection /> */}

        {/* <SubscriptionToggle /> */}
        {/* <Testimonials />
        <PartnersSection />
        */}
        {/* <SupportPage /> */}
        {/* <Footer /> */}

        {/* <Page /> */}
        {/* <HomePage />  */}
        <ArtStation />
        <TextGenerationTemplate />
      </body>
    </html>
  );
}
