"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/lp/3")
  }, [router])

  return null
}
