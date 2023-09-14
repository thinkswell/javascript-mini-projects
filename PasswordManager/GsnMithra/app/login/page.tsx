"use client"

import { Raleway } from "next/font/google";
import { useState } from "react";
import stylesPage from "../styles/page.module.css";
import stylesLog from "../styles/login.module.css";
import stylesSign from "../styles/signup.module.css";
import Link from "next/link";
import { UserLogin } from "@/server/serverActions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const rale = Raleway({
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password.length == 0) {
      alert("Password field cannot be empty!");
      return;
    }

    const validity = await UserLogin (username, password)
    if (validity === undefined)
      return;
    if (!validity.existUser) {
      alert("User does not exist!");
      return;
    }
    if (!validity.validPassword) {
      alert("Incorrect password!");
      return;
    }
    else {
      Cookies.set("authenticated", "true");
      if (validity.userID != undefined)
        Cookies.set("userID", validity.userID.toString ());
      router.push("/dashboard");
    }
  }

  return (
    <main className={stylesPage.main}>
      <div className={stylesLog.container}>
        <div className={stylesPage.headingText}>
          <h1 className={rale.className}>Password Manager</h1>
        </div>

        <div className={stylesSign.operations}>
          <form className={stylesSign.form}>
            <input
              type="text"
              placeholder="Username"
              className={`${stylesSign.input} ${rale.className}`}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`${stylesSign.input} ${rale.className}`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <div className={stylesSign.navigate}>
          <Link href="/">
            <button className={stylesSign.button}>Back</button>
          </Link>
          <Link href="/">
            <button className={stylesSign.button} onClick={handleSubmit}>Submit</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
