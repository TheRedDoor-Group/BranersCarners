import Link from "next/link";
import { Instagram, Tiktok } from "iconoir-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const tFooter = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__branding">
          <Image
            className="footer__logo"
            src="/brand/logo-horizontal-transparent.svg"
            width={200}
            height={200}
            alt="Logo Braners Carners"
          />
        </div>

        <div className="footer__info">
          <a
            href="mailto:atendimento@branerscarners.com.br"
            className="footer__mail"
          >
            atendimento@branerscarners.com.br
          </a>
          <div className="footer__socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <Tiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <p>&copy; {currentYear} BRANERS CARNERS</p>
          <div className="footer__legal-links">
            <Link href="/cookies">{tFooter("cookies")}</Link>
            <Link href="/termos">{tFooter("terms")}</Link>
            <Link href="/privacy">{tFooter("privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
