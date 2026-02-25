import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
// Lenis Scroll
import LenisScrollProvider from "../../components/core/lenis-provider";
// Main Style
import "../../styles/main.scss";
// SEO
import "../../lib/seo";
// Components
import Navbar from "../../components/layout/navbar/page";
import Footer from "../../components/layout/footer/page";

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
      <body>
        <NextIntlClientProvider messages={messages}>
          <LenisScrollProvider>
            <Navbar />
            {children}
            <Footer />
          </LenisScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
