import "./globals.css";
import "../css/clash-display.css";
import "../css/satoshi.css";
import "../css/animation.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
