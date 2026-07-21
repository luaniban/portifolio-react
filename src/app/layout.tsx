import type { Metadata } from "next";
import { LanguageProvider } from "../components/LanguageProvider";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Luan Ibanhez | Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack. Construo produtos web completos com Laravel, Livewire, React e Next.js, do banco de dados ao deploy.",
  openGraph: {
    title: "Luan Ibanhez | Desenvolvedor Full Stack",
    description:
      "Produtos web completos com Laravel, Livewire, React e Next.js, do banco de dados ao deploy.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
        <script
          // Aplica o tema salvo (ou a preferência do sistema) antes do primeiro
          // paint, evitando flash da cor errada; também marca html.js para as
          // animações de entrada, que só ficam ocultas quando há JS ativo.
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t);var l=localStorage.getItem('language');if(l==='en'){document.documentElement.setAttribute('data-language','en');document.documentElement.lang='en'}}catch(e){}try{if('scrollRestoration' in history){history.scrollRestoration='manual'}window.scrollTo(0,0)}catch(e){}document.documentElement.classList.add('js')",
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
