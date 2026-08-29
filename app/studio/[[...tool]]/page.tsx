import { NextStudio, metadata, viewport } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport };

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui", maxWidth: 720, margin: "80px auto", padding: 24 }}>
        <h1>Connect Guanfolio to Sanity</h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and
          <code> NEXT_PUBLIC_SANITY_DATASET</code> to <code>.env.local</code>,
          then restart the development server.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
