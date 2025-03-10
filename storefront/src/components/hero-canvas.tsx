"use client"
import { motion } from "framer-motion"

interface HeroCanvasProps {
  prefersReducedMotion: boolean
}

export default function HeroCanvas({ prefersReducedMotion }: HeroCanvasProps) {
  if (prefersReducedMotion) {
    return null
  }

  // Create an array of particles with different properties
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    color: getRandomColor(),
  }))

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-40"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: particle.delay,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/80 animate-pulse" />
    </div>
  )
}

// Function to get a random brand color
function getRandomColor() {
  const colors = [
    "#2D767F", // Teal
    "#FF6B6B", // Coral
    "#FFD93D", // Mustard
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

