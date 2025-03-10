// app/providers.tsx
"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from "posthog-js/react"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      //   api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "always", // or 'always' to create profiles for anonymous users as well
      capture_pageview: true, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true,
      loaded: (posthog) => {
        console.log("PostHog loaded", posthog)
         const distinct_id = posthog.get_distinct_id()
         posthog.capture("User Tracking Status", {
           distinct_id: distinct_id,
           $set: {
             is_tracking_enabled:
               localStorage.getItem("PH_tracking_enabled") === "false"
                 ? false
                 : true,
           },
         })
      },
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {/* <SuspendedPostHogPageView /> */}
      {children}
    </PHProvider>
  )
}


// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      {/* <PostHogPageView /> */}
    </Suspense>
  )
}

