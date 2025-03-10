"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface MobileMenuProps {
  items: { label: string; href: string }[]
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-[#2D767F] focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to prevent seeing content behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMenu}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-y-0 right-0 w-full max-w-s h-[100vh] z-50 bg-white shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b bg-white">
                <div className="flex items-center gap-2 font-bold text-2xl text-[#FF6B6B]">
                  <span className="text-[#2D767F]">art</span>Challenge
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-[#2D767F] focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-6 bg-white flex-1 overflow-y-auto">
                {items.map((item, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium block py-2 hover:text-[#FF6B6B] transition-colors"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="pt-4">
                  <button className="w-full bg-[#2D767F] hover:bg-[#2D767F]/90 text-white py-3 rounded-md font-medium">
                    Log In
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}