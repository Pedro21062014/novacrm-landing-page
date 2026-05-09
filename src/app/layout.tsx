import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NovaCRM — O CRM que vende por voce",
  description:
    "Crie sua loja online, gerencie pedidos e use Inteligencia Artificial para atender seus clientes no WhatsApp. Tudo em um so lugar.",
  keywords: [
    "CRM",
    "NovaCRM",
    "loja online",
    "WhatsApp",
    "IA",
    "gestao de pedidos",
    "funil de vendas",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "NovaCRM — O CRM que vende por voce",
    description:
      "Crie sua loja online, gerencie pedidos e use IA no WhatsApp. Tudo em um so lugar.",
    url: "https://crm-dy6.pages.dev",
    siteName: "NovaCRM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/* Inline script to detect theme before paint - prevents flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('novacrm-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            })();
          `,
        }}
      />
      <body
        className={`${bricolage.variable} ${manrope.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
