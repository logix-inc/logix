export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "",
  description: "",
  ogImage: "",
  author: "",
  email: "",
  siteUrl: "",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "",
    siteName: "",
    description: "",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
    image: "",
    creator: "",
  },
  links: {
    github: "#",
    twitter: "#",
    docs: "#",
    discord: "#",
    sponsor: "#",
  },
};
