export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Logix Inc.",
  description: "Where Digital Meets Simplicity",
  ogImage: "https://logi-x.org/twitter-cards/logix.jpeg",
  author: "Ahmed Sulaimani",
  email: "admin@logi-x.org",
  siteUrl: "https://logi-x.org",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://logi-x.org",
    siteName: "Logix",
    description: "Transform Your Business with Seamless Digital Solutions",
    images: [
      {
        url: "https://logi-x.org/twitter-cards/logix.jpeg",
        width: 1200,
        height: 630,
        alt: "Logix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logix - Transform Your Business with Seamless Digital Solutions",
    description:
      "Unlock the full potential of your business with tailored digital solutions designed to optimize sales, manage operations, and deliver results.",
    image: "https://logi-x.org/twitter-cards/logix.jpeg",
    creator: "@ex_wy_zd",
  },
  links: {
    github: "https://github.com/logi-x/core",
    twitter: "https://x.com/ex_wy_zd",
    docs: "https://logi-x.org",
    discord: "https://discord.gg/AYjBWTC7bS",
    sponsor: "#",
  },
};
