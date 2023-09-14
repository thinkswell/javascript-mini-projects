"use client";

import stylesPage from "./styles/page.module.css";
import { Raleway } from "next/font/google";
import Link from "next/link";

const rale = Raleway({
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Home () {
  return (
    <main className={stylesPage.main}>
      <div className={stylesPage.container}>
        <div className={stylesPage.headingText}>
          <h1 className={rale.className}>Password Manager</h1>
        </div>
        <div className={stylesPage.operations}>
          <Link href="/signup">
            <div className={stylesPage.button}>
              <span className={rale.className}>Sign Up</span>
            </div>
          </Link>
          <Link href="/login">
            <div className={stylesPage.button}>
              <span className={rale.className}>Log In</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}