"use client"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Mail, PinIcon as Pinterest } from "lucide-react"

import Waves from "@components/backgrounds/Waves/Waves"
import { useState } from "react"
import { cn } from "@lib/utils"

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center px-2 py-4 md:px-4 sm:py-8 m-auto bg-eg-bg">
      <div className="max-w-7xl w-full">
        {/* Central Heading - Visible only on small screens at the top */}
        <h2 className="block xl:hidden text-2xl font-serif md:text-3xl lg:text-4xl text-center mb-8 mt-4 ">
          Where Art Thrives Through Community
        </h2>

        {/* Columns Container */}
        <div
          className="[&_h3]:not-last:mb-2 [&_h3]:not-last:md:mb-4 mx-4 sm:mx-6 md:mx-12 mb-4 sm:mb-6 md:mb-12 flex flex-col justify-between
           gap-12 lg:flex-row [&_h3]:text-center [&_h3]:text-xl  md:[&_h3]:text-2xl lg:[&_h3]:text-3xl [&_h3]:font-normal [&_h3]:italic"
        >
          {/* Left Column*/}
          <div className="group/anim flex flex-col justify-center items-center m-auto gap-6 w-full ">
            <Link
              href="/collector"
              className="group peer order-2 flex justify-center items-center w-full h-full max-w-4/5 max-h-fit"
            >
              <button className="relative flex justify-center items-center w-full h-full transition-all duration-300 ">
                <svg
                  className="w-full h-full
                    group-hover:scale-105 [&_*]:group-hover:cursor-pointer
                    transition-all duration-300
                    group-active:scale-95 select-none"
                  width="432"
                  height="135"
                  viewBox="0 0 432 135"
                  fill="var(--color-eg-bg-light)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1099 92.2705L3.51253 26.8969C2.18025 13.6952 12.75 2.32715 26.0137 2.69644L407.14 13.3079C420.35 13.6756 430.257 25.5235 428.281 38.5896L416.99 113.231C415.295 124.441 405.357 132.527 394.036 131.907L30.7965 112.029C19.9758 111.436 11.198 103.053 10.1099 92.2705Z"
                    stroke="var(--color-eg-bg-dark)"
                    stroke-width="5"
                    className="transition-all duration-300"
                  />
                </svg>

                {/* <svg
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
                </svg> */}
                <span
                  className="
                  font-bold text-center font-archistico
                  text-lg sm:text-xl md:text-2xl text-eg-purple
                  skew-x-2 skew-y-2
                  //text-stroke-white
                  group-active:scale-95 group-hover:cursor-pointer 
                  select-none 
                  transition-all duration-300
                  max-w-11/12 absolute
                  "
                >
                  For Art Collectors & Curators
                </span>
              </button>
            </Link>

            <div className="order-1 group p-6 sm:p-8 md:p-12 relative border-8 border-white ">
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
                  className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>

              <div
                className="z-20 h-min w-full
                bg-eg-bg/80 backdrop-blur-xs
                font-serif 
                transition-all duration-300
                perspective-distant
                [clip-path:polygon(0_3%,100%_0%,100%_100%,0%_97%)]
                md:px-12
                sm:px-8
                px-4
                py-12
                "
              >
                <div className="-skew-x-1 -skew-y-1 transition-all duration-300 w-full min-w-fit">
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

          {/* Central Heading - Visible only on large screens between columns */}
          <h2 className="hidden text-nowrap xl:inline-block text-2xl font-serif md:text-3xl text-center translate-y-32">
            Where Art Thrives
            <br />
            Through
            <br />
            Community
          </h2>

          {/* Right Column */}
          <div className="group/anim flex flex-col justify-center items-center m-auto gap-6 w-full">
            <Link
              href="/artist"
              className="group peer order-2 flex justify-center items-center w-full h-full max-w-4/5 max-h-fit"
            >
              <button className="relative flex justify-center items-center w-full h-full transition-all duration-300 ">
                <svg
                  className="w-full h-full
                    group-hover:scale-105 [&_*]:group-hover:cursor-pointer
                    transition-all duration-300
                    group-active:scale-95 select-none"
                  width="432"
                  height="135"
                  viewBox="0 0 432 135"
                  fill="var(--color-eg-bg-light)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1099 92.2705L3.51253 26.8969C2.18025 13.6952 12.75 2.32715 26.0137 2.69644L407.14 13.3079C420.35 13.6756 430.257 25.5235 428.281 38.5896L416.99 113.231C415.295 124.441 405.357 132.527 394.036 131.907L30.7965 112.029C19.9758 111.436 11.198 103.053 10.1099 92.2705Z"
                    stroke="var(--color-eg-bg-dark)"
                    stroke-width="5"
                    className="transition-all duration-300"
                  />
                </svg>
                <span
                  className="
                  font-bold text-center font-archistico
                  text-2xl text-eg-purple
                  skew-x-2 skew-y-2
                //text-stroke-white
                  group-active:scale-95 group-hover:cursor-pointer 
                  select-none 
                  transition-all duration-300
                  max-w-11/12 absolute
                  "
                >
                  For Artists & Creators
                </span>
              </button>
            </Link>

            <div className="order-1 group p-6 sm:p-8 md:p-12 relative border-8 border-white">
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
                className="w-full z-20 h-min
                bg-eg-bg/80 backdrop-blur-xs
                font-serif
                transition-all duration-300
                [clip-path:polygon(0_3%,100%_0%,100%_100%,0%_97%)]
                perspective-distant
                md:p-12
                sm:p-8
                p-4
                py-12
                "
              >
                <div className="-skew-x-1 -skew-y-1 transition-all duration-300 w-full min-w-fit">
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
