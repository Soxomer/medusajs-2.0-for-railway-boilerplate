"use client"

import { motion } from "framer-motion"

interface FloatingElementsProps {
  count?: number
  colors?: string[]
}

export default function FloatingElements({
  count = 15,
  colors = ["#2D767F", "#FF6B6B", "#FFD93D"],
}: FloatingElementsProps) {
  // Create elements with different properties
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.07 + 0.03,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full blur-xl"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
            backgroundColor: element.color,
            opacity: element.opacity,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: element.delay,
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
    </div>
  )
}

