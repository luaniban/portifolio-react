import type { Metadata } from "next";
import { LanguageProvider } from "../components/LanguageProvider";
import { Bitter, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// A letra das placas de madeira da arte; usada só nos links que levam a elas.
const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["500"],
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
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable} ${bitter.variable}`} suppressHydrationWarning>
      <body>
        <script
          // Aplica o tema salvo (ou a preferência do sistema) antes do primeiro
          // paint, evitando flash da cor errada; também marca html.js para as
          // animações de entrada, que só ficam ocultas quando há JS ativo. Ao
          // recarregar, tira o #seção do endereço: a página sempre recomeça no
          // topo da montanha, e um link /#seção aberto de fora continua valendo.
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t);var l=localStorage.getItem('language');if(l==='en'){document.documentElement.setAttribute('data-language','en');document.documentElement.lang='en'}}catch(e){}try{if('scrollRestoration' in history){history.scrollRestoration='manual'}var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'&&location.hash){history.replaceState(history.state,'',location.pathname+location.search)}window.scrollTo(0,0)}catch(e){}document.documentElement.classList.add('js')",
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
