import { MetadataRoute } from "next";
import { blockchainProjects, uiProjects, generalProjects } from "@/data/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ptrsdev.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/portfolio",
    "/library",
    "/library/riset-blockchain",
    "/library/riset-blockchain/analisis-blockchain-sui",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic portfolio routes
  const allProjects = [...blockchainProjects, ...uiProjects, ...generalProjects];
  const dynamicPortfolioRoutes = allProjects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicPortfolioRoutes];
}
