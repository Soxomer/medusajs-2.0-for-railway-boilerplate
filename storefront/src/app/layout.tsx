import { Metadata, Viewport } from "next"
import "styles/globals.css"
import Script from "next/script"
import { getBaseURL } from "@lib/util/env"
import { PostHogProvider } from "./provider"
import { ThemeProvider } from "@components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "EtchyGhoul | Where Art Meets Community",
    template: "%s | EtchyGhoul", // For child pages (e.g., "Challenges | EtchyGhoul")
  },
  description:
    "Join creative challenges, connect with art lovers, and grow as an artist. Turn struggles into masterpieces with our community-driven platform.",
  keywords: [
    "art challenges",
    "artist community",
    "sell art online",
    "creative growth",
    "art marketplace",
    "emerging artists",
  ],
  authors: [{ name: "EtchyGhoul Team", url: getBaseURL() }],
  creator: "EtchyGhoul",
  publisher: "EtchyGhoul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getBaseURL(),
    siteName: "EtchyGhoul",
    title: "Where Art Thrives Through Challenges & Community",
    description:
      "Create bold work, connect with fans, and grow faster—all while tackling fun, collaborative art challenges.",
    // images: [
    //   {
    //     url: "/og-artist-journey.jpg", // Custom OpenGraph image showing artist progression
    //     width: 1200,
    //     height: 630,
    //     alt: "Artist's journey from blank canvas to thriving creator on EtchyGhoul",
    //   },
    // ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Your Art Journey Starts Here | EtchyGhoul",
  //   description:
  //     "Join challenges, build your audience, and earn from your art. No more lonely studios!",
  //   images: ["/og-artist-journey.jpg"], // Same as OG but cropped for Twitter
  //   creator: "@EtchyGhoul",
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "HXAkacvl3alqeIpOrjnx_nlnbXK5myU2j7LzASpTYPA", // Replace with actual
  },
  // For app-like feel (Progressive Web App)
  // manifest: "/site.webmanifest",
  // icons: {
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  //   other: [
  //     { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2D767F" },
  //   ],
  // },
}

export const viewport: Viewport = {
  themeColor: "#2D767F", // Your brand teal
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <Script
          defer
          data-domain="etchyghoul.com"
          src="https://plausible-analytics-ce-production-bbb2.up.railway.app/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-setup" strategy="afterInteractive">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </head>
      <body>
        <main className="relative">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <PostHogProvider>{props.children}</PostHogProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
