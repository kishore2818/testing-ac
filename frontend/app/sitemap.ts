import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adlercontracts.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/clients",
    "/contact",
    "/services/mcc-panels",
    "/services/pcc-panels",
    "/services/apfc-panels",
    "/services/control-desk",
    "/services/bus-ducts",
  ];

  const lastModified = "2026-08-21";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}