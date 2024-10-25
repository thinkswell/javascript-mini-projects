import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Grammr",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpg" />
      </head>
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
