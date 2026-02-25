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
});

const lateef = Lateef({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
  preload: true,
});

const loveYa = Love_Ya_Like_A_Sister({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  preload: true,
});

const moonDance = Moon_Dance({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  preload: true,
});

export { lato, lateef, loveYa, moonDance };
