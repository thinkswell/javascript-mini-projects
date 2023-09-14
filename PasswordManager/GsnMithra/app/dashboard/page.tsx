"use client"

import { Raleway } from "next/font/google"
import stylesDash from "../styles/dashboard.module.css"
import stylesSign from "../styles/signup.module.css"

import Cookies from "js-cookie";
import Link from "next/link"
import { useEffect, useState } from "react";
import { AddUserCredentials, FetchUserCredentials } from "@/server/serverActions";

const rale = Raleway({
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export interface Credential {
  website: string,
  username: string,
  password: string
}

export default function Terminal () {
  const [authenticated, setAuthenticated] = useState (false);
  const [loading, setLoading] = useState (true);

  const [website, setWebsite] = useState ("");
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");

  const [credentials, setCredentials] = useState <Credential[]> ([]);

  const addCredentials = () => {
    if (website.length == 0 || username.length == 0 || password.length == 0) 
      return;
    setWebsite ("");
    setUsername ("");
    setPassword ("");

    AddUserCredentials (parseInt (Cookies.get ("userID")!), website, username, password);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchCredentials () {
    const cred = await FetchUserCredentials (parseInt (Cookies.get ("userID")!));
    let creds: Credential[] = [];
    cred?.forEach (cred => {
      creds.push ({
        website: cred.name,
        username: cred.username,
        password: cred.password
      })
    })
    
    setCredentials (creds);
  }

  useEffect (() => {
    const checkAuth = async () => {
      setAuthenticated (Cookies.get("authenticated") == "true");
      setLoading (false);
    }

    checkAuth ();
    fetchCredentials ();
  }, [fetchCredentials]);

  return (
    <main className={stylesDash.main}>
      {!loading && <div className={authenticated ? stylesDash.container : stylesDash.authentication}>
        <div className={stylesDash.headingText}>
          <h1 className={rale.className}>Password Manager</h1>
        </div>
        {authenticated && <div className={stylesDash.content}>
          <div className={stylesDash.passwordEntry}>
            <div>
              <form className={stylesDash.form}>
                <input 
                  type="text" 
                  value={website}
                  placeholder="Website" 
                  className={stylesDash.inputField}
                  onChange={(e) => setWebsite (e.target.value)}
                />
                <input 
                  type="text" 
                  value={username}
                  placeholder="Username / Email" 
                  className={stylesDash.inputField}
                  onChange={(e) => setUsername (e.target.value)}
                />
                <input 
                  type="text" 
                  value={password}
                  placeholder="Password" 
                  className={stylesDash.inputField}
                  onChange={(e) => setPassword (e.target.value)}
                />
              </form>
            </div>
            <div className={stylesDash.addButton} onClick={addCredentials}>
              <h1 className={stylesDash.plus}>+</h1>
            </div>
          </div>
          <div className={stylesDash.credentials}>
            {credentials.map ((cred, index) => (
              <div className={stylesDash.creds} key={index}>
                <div className={stylesDash.cred}>
                  <h3 className={rale.className}>{cred.website}</h3>
                </div>
                <div className={stylesDash.cred}>
                  <h3 className={rale.className}>{cred.username}</h3>
                </div>
                <div className={stylesDash.cred}>
                  <h3 className={rale.className}>{cred.password}</h3>
                </div>
                <div className={stylesDash.addButton} onClick={fetchCredentials}>
                  <h1 className={stylesDash.crossButton}>+</h1>
                </div>
              </div>
            ))}
          </div>
        </div>}
        {!authenticated && <div className={stylesDash.unauth}>
          <span className={rale.className} id="textAuth">You are not authenticated. Please log in.</span>
          <Link href="/login">
            <button className={stylesSign.button}>Log In</button>
          </Link>
        </div>}
      </div>}
      {loading && <div className={stylesDash.loading}></div>}
    </main>
  )
}