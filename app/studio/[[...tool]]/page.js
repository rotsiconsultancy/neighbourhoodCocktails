import { StudioClient } from "@/app/studio/StudioClient";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Content Studio | The Neighbourhood Cocktails",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32, color: "#1f4d3a", background: "#f6efe3", fontFamily: "Arial, sans-serif" }}>
        <div style={{ maxWidth: 620 }}>
          <h1>Connect Sanity to open the Content Studio</h1>
          <p style={{ marginTop: 16, lineHeight: 1.7 }}>Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to the environment, then restart the site. Full setup instructions are in SANITY_SETUP.md.</p>
        </div>
      </main>
    );
  }
  return <StudioClient />;
}
