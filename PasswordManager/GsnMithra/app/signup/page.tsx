"use client";

import { Raleway } from "next/font/google";
import stylesSign from "../styles/signup.module.css";
import stylesPage from "../styles/page.module.css";
import Link from "next/link";
import { useState } from "react";
import { UserCreate } from "../../server/serverActions";

const rale = Raleway({
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function SignUp() {
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");
  const [confirmPassword, setConfirmPassword] = useState ("");

    const handleSubmit = () => {
        if (password !== confirmPassword) {
          return;
        } if (username.includes (' ')) {
          alert ("Username must not contiain any whitespaces!");
        }
        else {
          UserCreate (username, password);
        }
    }

  return (
    <main className={stylesPage.main}>
      <div className={stylesSign.container}>
        <div className={stylesPage.headingText}>
          <h1 className={rale.className}>Password Manager</h1>
        </div>

        <div className={stylesSign.operations}>
          <form className={stylesSign.form}>
            <input
              type="text"
              placeholder="Username"
              className={`${stylesSign.input} ${rale.className}`}
              onChange={(e) => setUsername (e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`${stylesSign.input} ${rale.className}`}
              onChange={(e) => setPassword (e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className={`${stylesSign.input} ${rale.className}`}
              onChange={(e) => setConfirmPassword (e.target.value)}
            />
          </form>
        </div>
        <div className={stylesSign.navigate}>
          <Link href="/">
            <button className={`${stylesSign.button} ${rale.className}`}>Back</button>
          </Link>
          <Link href="/">
            <button className={`${stylesSign.button} ${rale.className}`} onClick={handleSubmit}>Submit</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
