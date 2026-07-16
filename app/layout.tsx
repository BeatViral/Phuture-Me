import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: "Phuture Me™ · Sow Clever. Reap Well.",
    description:
      "Explore your choices, see your Aging Curve and meet your possible Phuture Me—without being told what to choose.",
    openGraph: {
      title: "Phuture Me™ · Sow Clever. Reap Well.",
      description: "Meet the life growing behind your decision.",
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Phuture Me" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Phuture Me™ · Sow Clever. Reap Well.",
      description: "Meet the life growing behind your decision.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
