import {
  Lato,
  Lateef,
  Love_Ya_Like_A_Sister,
  Moon_Dance,
} from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  preload: true,
  variable: "--font-lato",
});

const lateef = Lateef({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
  preload: true,
  variable: "--font-lateef",
});

const loveYa = Love_Ya_Like_A_Sister({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-love-ya",
});

const moonDance = Moon_Dance({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  preload: true,
  variable: "--font-moon-dance",
});

export { lato, lateef, loveYa, moonDance };
