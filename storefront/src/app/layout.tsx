import { Metadata } from "next"
import "styles/globals.css"
import Script from "next/script"
import { getBaseURL } from "@lib/util/env"
import { PostHogProvider } from "./provider"
import { ThemeProvider } from "@components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
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
