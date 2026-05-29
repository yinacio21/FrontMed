import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediSys — Gestão Clínica Inteligente",
  description: "Prontuário eletrônico, gestão de pacientes e histórico clínico com segurança e praticidade para médicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 flex flex-col`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
