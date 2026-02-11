import type { Metadata } from "next";
import LenisScrollProvider from "./providers/lenis-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Braners Carners",
  description: "A melhor churrascaria de SP",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // if the locale is not valid, return 404
  if (!["pt", "en"].includes(locale)) {
    notFound();
  }

  // Fetches the messages on the server
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <LenisScrollProvider>{children}</LenisScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
