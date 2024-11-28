import {Metadata, Viewport} from "next";

import {siteConfig} from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `Auth - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Logix", "Logix Inc", "Digital Solutions"],
  manifest: "/manifest.json",
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
};

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="relative flex flex-col min-h-screen" id="auth-container">
      <main>{children}</main>
    </div>
  );
}
