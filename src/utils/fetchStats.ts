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
    // Use URL constructor + searchParams for robust cache-busting
    const url = new URL(gistUrl);
    url.searchParams.set('t', Date.now().toString());
    
    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(5000),
    });
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
