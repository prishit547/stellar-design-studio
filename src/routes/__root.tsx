import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl">404</h1>
        <p className="mt-4 text-ink-soft">This page is out of focus.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-ink text-ivory px-6 py-3 text-sm">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went wrong.</h1>
        <p className="mt-3 text-sm text-ink-soft">Please try again in a moment.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex rounded-full bg-ink text-ivory px-6 py-3 text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

const SITE_URL = "https://socalfamilyeye.com";

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Socal Family Eye Care",
  "url": SITE_URL,
  "logo": `${SITE_URL}/eye.png`,
  "image": `${SITE_URL}/eye.png`,
  "description": "Boutique ophthalmology and optometry in Long Beach, CA. Pediatric, adult, and surgical eye care delivered with clinical excellence.",
  "telephone": "+15629882020",
  "email": "info@socalfamilyeye.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3650 Atlantic Ave",
    "addressLocality": "Long Beach",
    "addressRegion": "CA",
    "postalCode": "90807",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.8198,
    "longitude": -118.1814,
  },
  "openingHours": ["Mo-Fr 08:00-17:00", "Sa 09:00-13:00"],
  "priceRange": "$$",
  "medicalSpecialty": ["Ophthalmology", "Optometry"],
  "sameAs": [],
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Socal Family Eye Care — Premium Vision Care in Long Beach" },
      { name: "description", content: "Boutique ophthalmology and optometry in Long Beach, CA. Pediatric, adult, and surgical eye care delivered with clinical excellence." },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#f9fafb" },
      { property: "og:site_name", content: "Socal Family Eye Care" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/eye.png` },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { property: "og:image:alt", content: "Socal Family Eye Care logo" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@socalfamilyeye" },
      { name: "twitter:image", content: `${SITE_URL}/eye.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/eye.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      { type: "application/ld+json", children: jsonLd },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Nav />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
