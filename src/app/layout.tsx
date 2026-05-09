import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
