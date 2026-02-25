"use client";

import { useState } from "react"; //
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "../../../i18n/routing";
import { links } from "../../../lib/data";
import { useParams } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const tNav = useTranslations("Header.Navigation");
  const tHeader = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const params = useParams();
  const locale = params.locale;

  const toggleLanguage = () => {
    const nextLocale = locale === "pt" ? "en" : "pt";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header
      className={`navbar ${isHome ? "navbar__home" : "navbar__internal"} ${isOpen ? "navbar--open" : ""}`}
    >
      <div className="navbar__container">
        <button
          className="navbar__mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span className={isOpen ? "icon-close" : "icon-menu"}>
            {isOpen ? "✕" : "☰"}
          </span>
        </button>

        <nav
          className={`navbar__left ${isOpen ? "navbar__left--visible" : ""}`}
        >
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="navbar__link"
              onClick={() => setIsOpen(false)}
            >
              {tNav(link.key as any)}
            </Link>
          ))}
        </nav>

        <div className="navbar__right">
          <button
            onClick={toggleLanguage}
            className="navbar__lang"
            aria-label={tHeader("change")}
            title={`${tHeader("change")} ${locale === "pt" ? "Inglês" : "Portuguese"}`}
          >
            <span>{locale === "pt" ? "EN" : "PT"}</span>
          </button>
          <Link href="#reservar" className="navbar__btn-reservar">
            {tHeader("reserve")}
          </Link>
        </div>
      </div>
    </header>
  );
}
