import "@/styles/globals.css";
// import "@logi-x/theme/dist/styles/logix/index.css";

import {Metadata, Viewport} from "next";
import clsx from "clsx";

import {Providers} from "./providers";

import {siteConfig} from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-proxima antialiased")}>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "light",
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
        >
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
