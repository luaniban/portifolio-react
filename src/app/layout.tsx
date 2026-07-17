import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luan Ibanhez — Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack. Construo produtos web completos com Laravel, Livewire, React e Next.js — do banco de dados ao deploy.",
  openGraph: {
    title: "Luan Ibanhez — Desenvolvedor Full Stack",
    description:
      "Produtos web completos com Laravel, Livewire, React e Next.js — do banco de dados ao deploy.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
        <script
          // Marca que há JS ativo antes do primeiro paint: o estado escondido
          // das animações de entrada só se aplica em html.js (sem JS, tudo visível).
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        {children}
      </body>
    </html>
  );
}
