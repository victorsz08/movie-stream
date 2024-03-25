"use client";


import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
      <Header/>
        {children}
      <Footer/>  
        </body>
    </html>
  );
}
