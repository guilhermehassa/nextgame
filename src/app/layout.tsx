import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"; 

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.scss";
import { Provider } from "@/context/Context";
import BootstrapClient from "@/app/bootstrap-client";

const montSerrat = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextGame - Seu próximo jogo",
  description: "Encontre seu próximo jogo favorito com NextGame!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="d-flex flex-column min-vh-100">
        <Provider>
          <BootstrapClient />
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
