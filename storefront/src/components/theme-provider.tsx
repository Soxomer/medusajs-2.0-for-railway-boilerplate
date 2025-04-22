"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by only rendering after component is mounted
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider  {...props}>
      {mounted ? children : null}
    </NextThemesProvider>
  )
}
