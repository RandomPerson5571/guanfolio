import DashboardPage from "./pages/DashboardPage";
import { getPortfolioData } from "@/sanity/lib/portfolio";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function Home() {
  const portfolioData = await getPortfolioData();

  return (
    <>
      <DashboardPage portfolioData={portfolioData} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
