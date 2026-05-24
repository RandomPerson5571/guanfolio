import DashboardPage from "./pages/DashboardPage";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <>
      <DashboardPage />;
      <Analytics />
      <SpeedInsights />
    </>
  );
}
