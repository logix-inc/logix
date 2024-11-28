import Rss from "rss";

import {siteConfig} from "@/config/site";

export async function GET() {
  const feed = new Rss({
    title: siteConfig.name,
    description: siteConfig.description,
    feed_url: `${siteConfig.siteUrl}/feed.xml`,
    site_url: siteConfig.siteUrl,
    webMaster: `${siteConfig.author} <${siteConfig.email}>`,
    managingEditor: `${siteConfig.author} <${siteConfig.email}>`,
    language: "en-US",
  });

  feed.item({
    title: "Home",
    description: "Home Page",
    url: "https://logix.gobeyound.com",
    guid: `/`,
    date: "11/7/2024",
    author: `${siteConfig.name} <${siteConfig.email}>`,
    categories: [],
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
