"use client"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Mail, PinIcon as Pinterest } from "lucide-react"

import Waves from "@components/backgrounds/Waves/Waves"
import { useState } from "react"
import { cn } from "@lib/utils"

export default function LandingPage() {
  const [colorState, setColorState] = useState<"green" | "yellow">("green")
  const colorHex = colorState === "green" ? "#a5b526" : "#eec604"

  const handleColorChange = (color: "green" | "yellow") => () => {
    setColorState(color)
  }

  return (
    <main className="flex flex-col items-center justify-center px-4 py-8 m-auto">
      <div role="banner" className="absolute inset-0 pointer-events-none">
        <Waves
          lineColor={colorHex + "20"} // opaque line color
          backgroundColor="var(--color-eg-bg)"
          waveSpeedX={0.1}
          waveSpeedY={0.1}
          waveAmpX={40}
          waveAmpY={0.1}
          friction={0.95}
          tension={0.001}
          maxCursorMove={20}
          xGap={10}
          yGap={10}
          style={{
            zIndex: -100,
          }}
        />
      </div>
      <div className="max-w-7xl w-full">
        {/* Central Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Where Art Thrives Through Community
        </h2>

        {/* Two Columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12
           [&_h3]:text-xl [&_h3]:font-bold [&_h3]:not-last:mb-4 [&_h3]:not-last:md:mb-6 [&_h3]:text-center [&_h3]:italic
          "
        >
          {/* Left Column [button on the top for peer usage]*/}
          <div
            onMouseEnter={handleColorChange("green")}
            className="group/anim flex flex-col justify-center items-center m-auto gap-6 max-w-4/5"
          >
            <Link
              href="/collector"
              className="group peer order-2 flex justify-center items-center w-full h-full max-w-2/3 max-h-fit"
            >
              <button className="relative flex justify-center items-center w-full h-full transition-all duration-300 ">
                <svg
                  className="w-full h-full
                    //group-hover:fill-eg-fg group-hover:scale-105 [&_*]:group-hover:cursor-pointer
                    transition-all duration-300
                    group-active:scale-95 select-none"
                  width="283"
                  height="100"
                  viewBox="0 0 283 100"
                  fill="var(--color-eg-bg)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.03968 8.67387C28.0397 -0.826109 248.54 0.397879 272.54 8.67388C296.54 16.9499 259.54 97.6739 222.54 97.6739H53.5391C11.0392 97.6739 -9.96036 18.1738 9.03968 8.67387Z"
                    fill="var(--color-eg-bg)"
                    className="transition-all duration-300"
                  />
                  <path
                    d="M222.54 97.6739C259.54 97.6739 296.54 16.9499 272.54 8.67388C248.54 0.397879 28.0397 -0.826109 9.03968 8.67387C-9.96036 18.1738 11.0392 97.6739 53.5391 97.6739M222.54 97.6739C185.539 97.6739 96.039 97.6739 53.5391 97.6739M222.54 97.6739H53.5391"
                    stroke="var(--color-eg-green)"
                    className="transition-all duration-300 //group-hover:stroke-eg-bg"
                    stroke-width="2"
                  />
                </svg>
                <span
                  className="
                  text-eg-fg //group-hover:text-eg-bg font-bold text-center font-archistico text-md sm:text-xl lg:text-2xl 
                  group-active:scale-95 group-hover:cursor-pointer group-hover:scale-105  
                  transition-all duration-300
                  select-none 
                  max-w-11/12 absolute 
                  "
                >
                  For Art Collectors & Curators
                </span>
              </button>
            </Link>

            <div className="order-1 group p-6 relative">
              <span
                className={
                  "absolute z-30 top-0 left-0 w-0 h-1 transition-all duration-300 delay-[600ms] group-hover/anim:delay-[0ms]  group-hover/anim:w-full bg-eg-green"
                }
              ></span>
              <span
                className={
                  "absolute z-30 top-0 right-0 w-1 h-0 transition-all duration-300 delay-[400ms] group-hover/anim:delay-[200ms] group-hover/anim:h-full bg-eg-green"
                }
              ></span>
              <span
                className={
                  "absolute z-30 bottom-0 right-0 w-0 h-1 transition-all duration-300 delay-[200ms] group-hover/anim:delay-[400ms] group-hover/anim:w-full bg-eg-green"
                }
              ></span>
              <span
                className={
                  "absolute z-30 bottom-0 left-0 w-1 h-0 transition-all duration-300 delay-[0ms] group-hover/anim:delay-[600ms] group-hover/anim:h-full bg-eg-green"
                }
              ></span>
              <div
                aria-roledescription="Background Image"
                className="overflow-hidden absolute inset-0 perspective-distant"
              >
                <Image
                  src="/images/lp/artists-workspace.jpeg"
                  alt="Art collectors background"
                  width={600}
                  height={400}
                  quality={100}
                  priority
                  className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300 "
                />
              </div>

              <div
                className="z-20 p-6 
                bg-eg-bg/80 h-min 
                font-serif 
                skew-x-1 skew-y-1 group-hover/anim:skew-x-0 group-hover/anim:skew-y-0
                transition-all duration-300
                perspective-distant
                backdrop-blur-xs"
              >
                <div className="-skew-x-1 -skew-y-1 group-hover/anim:skew-x-0 group-hover/anim:skew-y-0 transition-all duration-300">
                  <h3>Curated collections</h3>
                  <h3>Limited edition drops</h3>
                  <h3>Quality assurance</h3>
                  <h3>Exclusive previews</h3>
                  <h3>Invite-only auctions</h3>
                  <h3>Seamless communication with artists</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            onMouseEnter={handleColorChange("yellow")}
            className="group/anim flex flex-col justify-center items-center m-auto gap-6 max-w-4/5"
          >
            <Link
              href="/artist"
              className="group peer order-2 flex justify-center items-center  w-full h-full max-w-2/3 max-h-fit"
            >
              <button className="relative flex justify-center items-center w-full h-full transition-all duration-300 ">
                <svg
                  className="w-full h-full
                    //group-hover:fill-eg-fg group-hover:scale-105 [&_*]:group-hover:cursor-pointer
                    transition-all duration-300
                    group-active:scale-95 select-none"
                  width="283"
                  height="100"
                  viewBox="0 0 283 100"
                  fill="var(--color-eg-bg)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.03968 8.67387C28.0397 -0.826109 248.54 0.397879 272.54 8.67388C296.54 16.9499 259.54 97.6739 222.54 97.6739H53.5391C11.0392 97.6739 -9.96036 18.1738 9.03968 8.67387Z"
                    fill="var(--color-eg-bg)"
                    className="transition-all duration-300"
                  />
                  <path
                    d="M222.54 97.6739C259.54 97.6739 296.54 16.9499 272.54 8.67388C248.54 0.397879 28.0397 -0.826109 9.03968 8.67387C-9.96036 18.1738 11.0392 97.6739 53.5391 97.6739M222.54 97.6739C185.539 97.6739 96.039 97.6739 53.5391 97.6739M222.54 97.6739H53.5391"
                    stroke="var(--color-eg-yellow)"
                    className="transition-all duration-300 //group-hover:stroke-eg-bg"
                    stroke-width="2"
                  />
                </svg>
                <span
                  className="
                  text-eg-fg //group-hover:text-eg-bg font-bold text-center font-archistico text-md sm:text-xl lg:text-2xl 
                  group-active:scale-95 group-hover:cursor-pointer group-hover:scale-105  
                  select-none 
                  transition-all duration-300
                  max-w-11/12 absolute 
                  "
                >
                  For Artists & Creators
                </span>
              </button>
            </Link>

            <div className="order-1 group container p-6 relative">
              <span
                className={
                  "absolute z-30 top-0 right-0 w-0 h-1 transition-all duration-300 delay-[600ms] group-hover/anim:delay-[0ms] group-hover/anim:w-full bg-eg-yellow"
                }
              ></span>
              <span
                className={
                  "absolute z-30 top-0 left-0 w-1 h-0 transition-all duration-300 delay-[400ms] group-hover/anim:delay-[200ms] group-hover/anim:h-full bg-eg-yellow"
                }
              ></span>
              <span
                className={
                  "absolute z-30 bottom-0 left-0 w-0 h-1 transition-all duration-300 delay-[200ms] group-hover/anim:delay-[400ms] group-hover/anim:w-full bg-eg-yellow"
                }
              ></span>
              <span
                className={
                  "absolute z-30 bottom-0 right-0 w-1 h-0 transition-all duration-300 delay-[0ms] group-hover/anim:delay-[600ms] group-hover/anim:h-full bg-eg-yellow"
                }
              ></span>
              <div
                aria-roledescription="Background Image"
                className="overflow-hidden absolute inset-0 perspective-distant"
              >
                <Image
                  src="/images/lp/collector.jpg"
                  alt="Art collectors background"
                  width={600}
                  height={400}
                  quality={100}
                  priority
                  className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>

              <div
                className="z-20 p-6 
                bg-eg-bg/80 h-min 
                font-serif 
                skew-x-1 skew-y-1 group-hover/anim:skew-x-0 group-hover/anim:skew-y-0
                transition-all duration-300
                perspective-distant
                backdrop-blur-xs"
              >
                <div className="-skew-x-1 -skew-y-1 group-hover/anim:skew-x-0 group-hover/anim:skew-y-0 transition-all duration-300">
                  <h3>Higher earnings</h3>
                  <h3>Curated Listings</h3>
                  <h3>Prompt challenges</h3>
                  <h3>High visibility</h3>
                  <h3>Auction participation</h3>
                  <h3>Seamless communication with collectors</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
