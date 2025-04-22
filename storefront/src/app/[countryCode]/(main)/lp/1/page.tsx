"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import { Card, CardContent } from "@components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { ArrowRight, Clock, Heart, MessageCircle, Trophy } from "lucide-react"
import MobileMenu from "@components/mobile-menu"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import { sdk } from "@lib/config"

type WaitlistFormData = {
  email: string
  user_type: "artist" | "collector" | "both"
  link: string
}

export default function Home() {
  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  // Add state for active tab
  const [activeTab, setActiveTab] = useState("artists")

  // Add scroll function
  const scrollToElement = (
    elementId: string,
    callback?: () => void,
    arg: ScrollIntoViewOptions = { block: "start" }
  ) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        ...arg,
      })
      if (callback) callback()
    }
  }

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = prefersReducedMotion
      ? "auto"
      : "smooth"

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [prefersReducedMotion])

  // Navigation items
  const navItems = [
    {
      label: "How It Works",
      href: "#how-it-works",
      callback: () => scrollToElement("how-it-works"),
    },
    {
      label: "For Artists",
      href: "#for-artists",
      callback: () => {
        scrollToElement("for-artists", () => setActiveTab("artists"))
      },
    },
    {
      label: "For Collectors",
      href: "#for-collectors",
      callback: () => {
        scrollToElement("for-collectors", () => setActiveTab("collectors"))
      },
    },
    { label: "Community", href: "#community" },
  ]

  // Refs for scroll animations
  const howItWorksRef = useRef(null)
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 })

  const challengeRef = useRef(null)
  const challengeInView = useInView(challengeRef, { once: true, amount: 0.2 })

  const tabsRef = useRef(null)
  const tabsInView = useInView(tabsRef, { once: true, amount: 0.2 })

  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const communityRef = useRef(null)
  const communityInView = useInView(communityRef, { once: true, amount: 0.2 })

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -8,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<WaitlistFormData>()

  const user_type = watch("user_type")
  const isArtist = user_type === "artist" || user_type === "both"
  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setIsSubmitting(true)
      await sdk.client.fetch<WaitlistFormData>("/store/launch-list", {
        method: "POST",
        mode: "cors",
        body: data,
      })

      toast.success("Successfully joined the waitlist!")
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.")
      console.error("Waitlist submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="top" className="flex min-h-screen flex-col items-center w-full h-full bg-[#fafafa] text-black">
      <Toaster position="top-center" />
      <header className="px-4 md:px-6 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <motion.div
          className="flex h-16 items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-2 font-bold text-xl sm:text-2xl text-[#FF6B6B]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => {
              scrollToElement("top")
            }}
          >
            <span className="text-[#2D767F]">Etchy</span>Ghoul
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i, ease: "easeOut" }}
              >
                <Link
                  onClick={() => {
                    if (item.callback) {
                      item.callback()
                    }
                  }}
                  href={item.href}
                  className="text-sm font-medium hover:text-[#FF6B6B] transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu */}
          <MobileMenu items={navItems} />

          {/* Login Button - Desktop Only */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#2D767F] hover:bg-[#2D767F]/90">
                Log In
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>
      <main className="flex-1">
        {/* Hero Section with Animated Background */}
        <section className="relative overflow-hidden py-8 sm:py-16 md:py-20 bg-gradient-to-b from-[#F5F5F5] to-white">
          <div className="px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-block rounded-lg bg-[#FFD93D]/20 px-3 py-1 text-sm mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Launching Soon
                </motion.div>
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-heading text-[#2D767F]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Where Art Thrives Through Challenges & Community
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-[600px] font-body"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Create bold work, connect with fans, and grow faster—all while
                  tackling fun, collaborative challenges.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Link href="#join-waitlist">
                      <Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold tracking-wider px-4 sm:px-8 py-6 text-base w-full sm:w-auto">
                        Join the Movement – Get Early Access
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative mt-8 lg:mt-0 lg:ml-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="relative rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.01] duration-500"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-1">
                    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] bg-[#2D767F]/10 overflow-hidden">
                      <Image
                        src="/images/girl-painting-canvas.jpg"
                        alt="Artist creating artwork"
                        width={300}
                        height={400}
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                        <span className="text-white text-xs sm:text-sm font-medium">
                          Artist creating for "Abstract Nature" challenge
                        </span>
                      </div>
                    </div>
                    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] bg-[#FF6B6B]/10 overflow-hidden">
                      <Image
                        src="/images/girl-watching-big-canvas.jpg"
                        alt="Community engaging with art"
                        width={300}
                        height={400}
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                        <span className="text-white text-xs sm:text-sm font-medium">
                          Community voting and collecting artwork
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-4 right-4 bg-[#FFD93D] text-[#2D767F] font-bold rounded-full p-2 shadow-lg"
                    animate={{
                      y: [-1, -5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <motion.section
          id="how-it-works"
          className="py-16 sm:py-20 bg-white"
          ref={howItWorksRef}
          initial="hidden"
          animate={howItWorksInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className=" px-4 md:px-6">
            <motion.div
              className="text-center mb-10 sm:mb-12"
              variants={fadeIn}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter font-heading text-[#2D767F] mb-4">
                Artists Grow, Collectors Engage, Everyone Wins
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-[800px] mx-auto font-body">
                Our platform creates a virtuous cycle where creativity is
                rewarded and authentic connections are formed.
              </p>
            </motion.div>
            <motion.div
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12"
              variants={staggerChildren}
            >
              {[
                {
                  emoji: "🎯",
                  title: "Challenge Launch",
                  desc: "Weekly themed challenges spark creativity (e.g., 'Portraits in Neon').",
                  color: "#FF6B6B",
                },
                {
                  emoji: "💬",
                  title: "Create & Connect",
                  desc: "Share your process, get live feedback, and build a loyal audience.",
                  color: "#2D767F",
                },
                {
                  emoji: "🏆",
                  title: "Sell & Celebrate",
                  desc: "Top-voted pieces get featured + buyers receive exclusive artist insights.",
                  color: "#FFD93D",
                },
              ].map((item, i) => (
                <motion.div key={i} variants={cardVariants} whileHover="hover">
                  <Card className="bg-white border-2 border-[#F5F5F5] shadow-sm transition-all duration-300 h-full">
                    <CardContent className="pt-6">
                      <div className="text-center mb-4">
                        <motion.div
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl mb-4"
                          style={{
                            backgroundColor: `${item.color}10`,
                            color: item.color,
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          {item.emoji}
                        </motion.div>
                        <h3 className="text-lg sm:text-xl font-bold font-heading mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-body">
                          {item.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Live Challenge Teaser */}
        <motion.section
          className="py-16 sm:py-20 bg-[#F5F5F5]"
          ref={challengeRef}
          initial="hidden"
          animate={challengeInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className=" px-4 md:px-6">
            <motion.div
              className="text-center mb-10 sm:mb-12"
              variants={fadeIn}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter font-heading text-[#2D767F] mb-4">
                Jump Into This Month's Challenge: 'Abstract Nature'
              </h2>
              {/* <motion.div
                className="flex items-center justify-center gap-2 text-[#FF6B6B] mb-6 sm:mb-8"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base font-medium">
                  Submissions close in 5 days, 12 hours!
                </span>
              </motion.div> */}
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
              variants={staggerChildren}
            >
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="group relative rounded-xl overflow-hidden shadow-md bg-white cursor-pointer"
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
                    <Image
                      src={`/images/abstract-nature-${item}.jpg`}
                      alt={`Challenge submission ${item}`}
                      width={400}
                      height={300}
                      className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-sm font-medium mb-1">
                        Click to see the artist's story
                      </p>
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="flex items-center gap-1 text-white"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-xs sm:text-sm">
                            {120 + item * 45}
                          </span>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-1 text-white"
                          whileHover={{ scale: 1.1 }}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs sm:text-sm">
                            {18 + item * 7}
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base sm:text-lg font-heading">{`"Recycled Dreams" by Artist ${item}`}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-body">
                      Created from discarded plastic bottles and found objects
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="flex justify-center mt-8 sm:mt-10"
              variants={fadeIn}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#2D767F] hover:bg-[#2D767F]/90">
                  View All Submissions
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* For Artists vs. Collectors */}
        <div id="for-artists" />
        <div id="for-collectors" />
        <motion.section
          className="py-16 sm:py-20 bg-white"
          ref={tabsRef}
          initial="hidden"
          animate={tabsInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className=" px-4 md:px-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <motion.div
                className="flex justify-center mb-8"
                variants={fadeIn}
              >
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger
                    value="artists"
                    className="text-base sm:text-lg font-medium data-[state=active]:bg-[#FF6B6B] data-[state=active]:text-white"
                  >
                    For Artists
                  </TabsTrigger>
                  <TabsTrigger
                    value="collectors"
                    className="text-base sm:text-lg font-medium data-[state=active]:bg-[#2D767F] data-[state=active]:text-white"
                  >
                    For Collectors
                  </TabsTrigger>
                </TabsList>
              </motion.div>
              <AnimatePresence>
                <TabsContent value="artists" className="mt-0">
                  <motion.div
                    className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      className="mx-auto max-w-[400px] w-full "
                    >
                      <Image
                        src="/images/artist-smiling-1.jpg"
                        alt="Artist working on a challenge"
                        width={500}
                        height={500}
                        className="rounded-xl shadow-lg w-full aspect-square"
                      />
                    </motion.div>
                    <div className="space-y-4 sm:space-y-6">
                      <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter font-heading text-[#FF6B6B]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        Level Up Your Craft & Career
                      </motion.h2>
                      <motion.ul
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                      >
                        {[
                          {
                            title: "Turn challenges into portfolio highlights",
                            desc: "Each challenge pushes your boundaries and results in showcase-worthy work.",
                          },
                          {
                            title: "Sell directly + keep 85% of earnings",
                            desc: "No hidden fees, just transparent pricing that values your work.",
                          },
                          {
                            title:
                              "Join live Q&A sessions with challenge judges",
                            desc: "Learn directly from established artists and industry experts.",
                          },
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3"
                            variants={cardVariants}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              className="rounded-full bg-[#FF6B6B]/10 p-1 mt-1"
                              whileHover={{ rotate: 10 }}
                            >
                              <ArrowRight className="h-4 w-4 text-[#FF6B6B]" />
                            </motion.div>
                            <div>
                              <h3 className="font-bold text-base sm:text-lg font-heading">
                                {item.title}
                              </h3>
                              <p className="text-sm sm:text-base text-muted-foreground font-body">
                                {item.desc}
                              </p>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 mt-4">
                          Join as an Artist
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="collectors" className="mt-0">
                  <motion.div
                    className="grid md:grid-cols-2 gap-4 sm:gap-10 items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="order-2 md:order-1">
                      <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter font-heading text-[#2D767F]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        Own Art With Meaning
                      </motion.h2>
                      <motion.ul
                        className="space-y-4 mt-4 sm:mt-6"
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                      >
                        {[
                          {
                            title: "Vote for your favorites & shape challenges",
                            desc: "Influence the creative direction and discover emerging talent.",
                          },
                          {
                            title:
                              "Unlock 'Artist Diaries' with every purchase",
                            desc: "Get exclusive insights into the creative process behind your new piece.",
                          },
                          {
                            title:
                              "Collect limited-edition challenge winner NFTs",
                            desc: "Own digital certificates of authenticity for physical and digital art.",
                          },
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3"
                            variants={cardVariants}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              className="rounded-full bg-[#2D767F]/10 p-1 mt-1"
                              whileHover={{ rotate: 10 }}
                            >
                              <ArrowRight className="h-4 w-4 text-[#2D767F]" />
                            </motion.div>
                            <div>
                              <h3 className="font-bold text-base sm:text-lg font-heading">
                                {item.title}
                              </h3>
                              <p className="text-sm sm:text-base text-muted-foreground font-body">
                                {item.desc}
                              </p>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="bg-[#2D767F] hover:bg-[#2D767F]/90 mt-4">
                          Join as a Collector
                        </Button>
                      </motion.div>
                    </div>
                    <motion.div
                      className="order-1 md:order-2 mx-auto max-w-[400px] w-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Image
                        src="/images/granny-looking.jpg"
                        alt="Collector viewing art"
                        width={500}
                        height={400}
                        className="rounded-xl shadow-lg w-full aspect-square"
                      />
                    </motion.div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </motion.section>

        {/* Waitlist CTA */}
        <motion.section
          id="join-waitlist"
          className="py-16 sm:py-20 bg-[#2D767F] text-white relative overflow-hidden"
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 100 + 10,
                  height: Math.random() * 100 + 10,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: Math.random() * 10,
                }}
              />
            ))}
          </div>

          <div className=" px-4 md:px-6 relative z-10">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              variants={fadeIn}
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter font-heading mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Be Part of the First Creative Wave
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Join our waitlist to get early access and exclusive benefits
                when we launch.
              </motion.p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto space-y-4"
              >
                <div>
                  <Input
                    type="email"
                    placeholder="Your creative email..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "user_type",
                        value as WaitlistFormData["user_type"]
                      )
                    }
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="I am a..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artist">Artist</SelectItem>
                      <SelectItem value="collector">Collector</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.user_type && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.user_type.message}
                    </p>
                  )}
                </div>

                {isArtist && (
                  <div>
                    <Input
                      type="url"
                      placeholder="A link to your best work"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      {...register("link", {
                        required: isArtist
                          ? "Portfolio link is required"
                          : false,
                        pattern: {
                          value: /^(http|https):\/\/[^ "]+$/,
                          message: "Please enter a valid URL",
                        },
                      })}
                    />
                    {errors.link && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.link.message}
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#2D767F] font-semibold tracking-wider w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Reserve My Spot"}
                </Button>
              </form>

              <motion.div
                className="mt-6 grid gap-2 text-xs sm:text-sm opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>
                  <span className="font-semibold">Artists:</span> Early access =
                  Free entry to 3 challenges + profile badge.
                </p>
                <p>
                  <span className="font-semibold">Collectors:</span> Exclusive
                  voting power in launch challenges.
                </p>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2D767F] to-transparent"></div>
        </motion.section>

        {/* Community Proof */}
        <motion.section
          id="community"
          className="py-16 sm:py-20 bg-white"
          ref={communityRef}
          initial="hidden"
          animate={communityInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className=" px-4 md:px-6 bg-transparent">
            <motion.div
              className="text-center mb-10 sm:mb-12 bg-tansparent"
              variants={fadeIn}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter font-heading text-[#2D767F] mb-4">
                Meet Our Community
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-[800px] mx-auto font-body">
                Trusted by the best artists and collectors. We help creatives of
                all levels grow.
              </p>
            </motion.div>
            <motion.div
              className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto bg-transparent"
              variants={staggerChildren}
            >
              {[
                {
                  name: "Mia, Painter",
                  quote:
                    "The challenges pushed me to try new styles—I sold 4 pieces in one month!",
                  image: "/images/avatars/artist-smiling-2.jpg",
                },
                {
                  name: "David, Collector",
                  quote: "I love knowing the stories behind the art I collect.",
                  image: "/images/avatars/collector.jpg",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="bg-transparent"
                  whileHover="hover"
                >
                  <Card className="border-none shadow-sm bg-transparent w-full h-full">
                    <CardContent className="pt-6 bg-transparent">
                      <div className="flex flex-col gap-4 bg-transparent">
                        <div className="flex items-center gap-4 bg-transparent">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="bg-transparent"
                          >
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name.split(",")[0]}
                              width={60}
                              height={60}
                              className="rounded-full aspect-square! object-fill object-center"
                            />
                          </motion.div>
                          <div>
                            <h3 className="font-bold font-heading">
                              {testimonial.name}
                            </h3>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 * i }}
                                >
                                  ★
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="italic text-sm sm:text-base text-muted-foreground font-body">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="mt-10 sm:mt-12" variants={fadeIn}>
              <h3 className="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6 font-heading">
                Recent Challenge Submissions
              </h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2"
                variants={staggerChildren}
              >
                {[
                  {
                    image: "/images/artworks/artwork-1.jpg",
                    artist: "John Doe",
                    challenge: "#LookDeeper",
                  },
                  {
                    image: "/images/artworks/artwork-2.jpg",
                    artist: "Jane Smith",
                    challenge: "#AbstractExpression",
                  },
                  {
                    image: "/images/artworks/artwork-3.jpg",
                    artist: "Alice Johnson",
                    challenge: "#LookDeeper | #AbstractExpression",
                  },
                  {
                    image: "/images/artworks/artwork-4.jpg",
                    artist: "Bob Brown",
                    challenge: "#LookDeeper",
                  },
                  {
                    image: "/images/artworks/artwork-5.jpg",
                    artist: "Charlie Davis",
                    challenge: "#LookDeeper",
                  },
                  {
                    image: "/images/artworks/artwork-6.jpg",
                    artist: "Diana White",
                    challenge: "#WorkHardPlayHarder",
                  },
                ].map((artwork, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Image
                      src={artwork.image}
                      alt={`Gallery image ${i + 1}`}
                      width={200}
                      height={200}
                      className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-xs font-medium">
                        {artwork.artist}
                      </p>
                      <p className="text-white/80 text-xs">
                        {artwork.challenge}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <motion.footer
        className="bg-[#2D767F] text-white py-10 sm:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className=" px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-2 font-bold text-xl sm:text-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-white">art</span>
                <span className="text-[#FFD93D]">Challenge</span>
              </motion.div>
              <p className="text-xs sm:text-sm opacity-80 font-body">
                More than a marketplace—a movement.
              </p>
              <div className="flex gap-4">
                {["facebook", "instagram", "twitter", "linkedin"].map(
                  (social, i) => (
                    <motion.div
                      key={social}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link
                        href="#"
                        className="text-white hover:text-[#FFD93D]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                        >
                          {social === "facebook" && (
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          )}
                          {social === "instagram" && (
                            <>
                              <rect
                                x="2"
                                y="2"
                                width="20"
                                height="20"
                                rx="5"
                                ry="5"
                              ></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line
                                x1="17.5"
                                y1="6.5"
                                x2="17.51"
                                y2="6.5"
                              ></line>
                            </>
                          )}
                          {social === "twitter" && (
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          )}
                          {social === "linkedin" && (
                            <>
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </>
                          )}
                        </svg>
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </div>
            {[
              {
                title: "Upcoming Challenges",
                items: [
                  "Urban Landscapes",
                  "Emotional Portraits",
                  "Digital Dreamscapes",
                ],
              },
              {
                title: "Resources",
                items: [
                  "Blog: How Challenges Make Better Artists",
                  "Artist Success Stories",
                  "Collector's Guide",
                ],
              },
              {
                title: "Community",
                items: [
                  "Discord Community",
                  "TikTok: Time-lapse Art Videos",
                  "Instagram: #artChallenge",
                ],
              },
            ].map((column, i) => (
              <div
                key={i}
                className={i === 2 ? "sm:col-span-2 md:col-span-1" : ""}
              >
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 font-heading">
                  {column.title}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm opacity-80 font-body">
                  {column.items.map((item, j) => (
                    <motion.li
                      key={j}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link href="#" className="hover:text-[#FFD93D]">
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <motion.div
            className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-xs sm:text-sm opacity-70 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p>
              © {new Date().getFullYear()} artChallenge. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map(
                (item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href="#" className="hover:text-[#FFD93D]">
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
