import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

import styles from "./rootStyle.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Welcome to Friends of the Community",
  description: "We bring people together to bring harmony in our communities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.className}>
      <head />
      <body>
        <header>
          <h1>
            <Link className={styles.homeLink} href={"/"}>
            FRIENDS OF THE COMMUNITY
            </Link>
          </h1>
          <h3>
            <Link className={styles.menuBarLinks} href="/AboutUs">
            About Us
            </Link>
          </h3>
          <h3>
            <Link className={styles.menuBarLinks} href="/conference">
            Conference
            </Link>
          </h3>
          <h3>
            <Link className={styles.menuBarLinks} href="/ContactUs">
            Contact Us
            </Link>
          </h3>
        </header>
        {children}
      </body>
    </html>
  );
}
