import DashboardPage from "./pages/DashboardPage";
import { getPortfolioData } from "@/sanity/lib/portfolio";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const portfolioData = await getPortfolioData();

  return (
    <>
      <DashboardPage
        portfolioData={portfolioData}
        initialDesktopMode={mode === "desktop"}
      />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
