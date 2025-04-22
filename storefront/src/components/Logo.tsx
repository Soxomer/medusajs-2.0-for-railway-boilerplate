"use client"
import Image from "next/image"
import React, { useMemo, useState, useEffect } from "react"
import { guakala, scratchyLemon } from "../styles/fonts"
import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
  showImage?: boolean
}

export default function Logo({ size = "medium", showImage = true }: LogoProps) {
  // Define sizing config based on size prop
  const config = useMemo(() => {
    const sizes = {
      small: {
        text: "text-2xl sm:text-3xl",
        imageSize: 40,
        imageClass: "w-8 h-8 sm:w-10 sm:h-10",
        gap: "gap-0.5",
      },
      medium: {
        text: "text-3xl sm:text-4xl",
        imageSize: 60,
        imageClass: "w-12 h-12 sm:w-14 sm:h-14",
        gap: "gap-1",
      },
      large: {
        text: "text-4xl sm:text-5xl",
        imageSize: 80,
        imageClass: "w-16 h-16 sm:w-20 sm:h-20",
        gap: "gap-1.5",
      },
    }
    return sizes[size]
  }, [size])

  // Pre-render logo text for performance
  const logoText = useMemo(() => {
    const word = "EtchyGhoul"
    const specialLetters = new Set(["c", "y", "o"])

    return word.split("").map((letter, index) => {
      const isSpecialLetter = specialLetters.has(letter.toLowerCase())
      const fontClass = isSpecialLetter ? "font-guakala" : "font-scratchy-lemon"

      // Determine font style based on which font is used
      const fontStyle = isSpecialLetter ? guakala.style : scratchyLemon.style

      // Calculate approximate width to reserve space
      // const letterWidth = letter === "i" || letter === "l" ? 0.5 : 1

      return (
        <span
          key={index}
          className={`${config.text} ${fontClass} inline-block`}
          // Apply both className and style to ensure the font is applied
          data-letter={letter}
        >
          {letter}
        </span>
      )
    })
  }, [config.text])

  return (
    <Link
      href="/"
      aria-label="EtchyGhoul - Go to homepage"
      className="inline-flex items-end hover:opacity-90 transition-opacity relative"
      onClick={(e) => {
        if (window.location.pathname === "/") {
          e.preventDefault()
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      }}
    >
      <div
        className={`flex items-end ${config.gap} relative min-h-[${config.imageSize}px]`}
        role="img"
        aria-hidden="true"
      >
        {showImage && (
          <div className={`relative ${config.imageClass} flex-shrink-0`}>
            <Image
              src="/images/favicon.png"
              alt=""
              fill
              sizes={`${config.imageSize}px`}
              className="object-contain"
              priority
            />
          </div>
        )}
        {logoText}
      </div>
    </Link>
  )
}
