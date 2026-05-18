import { siteConfig } from '../config/site';

export interface PortfolioStats {
  projects: string;
  experience: string;
  clients: string;
}

export async function fetchStats(): Promise<PortfolioStats> {
  const gistUrl = import.meta.env.GIST_STATS_URL;
  
  if (!gistUrl) {
    // Fallback to default config if environment variable is not set
    return siteConfig.stats as PortfolioStats;
  }

  try {
    // We add a timestamp query parameter to prevent caching during build
    const response = await fetch(`${gistUrl}?t=${Date.now()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      projects: data.projects || siteConfig.stats.projects,
      experience: data.experience || siteConfig.stats.experience,
      clients: data.clients || siteConfig.stats.clients,
    };
  } catch (error) {
    console.error("Error fetching stats from Gist, falling back to default:", error);
    return siteConfig.stats as PortfolioStats;
  }
}
