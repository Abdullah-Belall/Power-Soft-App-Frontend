import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export { roboto };
