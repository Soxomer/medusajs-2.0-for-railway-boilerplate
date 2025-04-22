import Link from "next/link"

import { Button } from "@components/ui/button"
import Image from "next/image"

export default function SellerPage() {
  return (
    <div className="flex flex-col m-auto font-serif w-full h-full">
      <main className="flex-1 m-auto">
        <section className="p-2 flex flex-col items-center justify-center space-y-12 py-12 text-center md:py-16 w-full">
          <div className="space-y-6 max-w-7xl ">
            <div className="flex justify-between ">
              <Image
                src="/images/lp/lightning.png"
                alt="lightning icon"
                width={100}
                height={100}
                className="w-10 h-10 md:w-15 md:h-15 scale-y-[-1]"
              />
              <h1 className="relative font-archistico text-4xl md:text-6xl leading-tight">
                CALLING ALL TALENTED ARTISTS
              </h1>
              <Image
                src="/images/lp/lightning.png"
                alt="lightning icon"
                width={100}
                height={100}
                className="w-10 h-10 md:w-15 md:h-15 scale-x-[-1] scale-y-[-1]"
              />
            </div>

            <p className="mx-auto max-w-10/12 md:max-w-9/12 text-xl md:text-2xl lg:text-3xl italic leading-relaxed text-pretty">
              We're your personal hype squad, assisting you in promoting
              yourself while you keep an impressive
              <div className="inline-flex items-center justify-center relative top-4 mx-8 my-0.5 ">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="45px"
                  height="45px"
                  viewBox="0 0 1280.000000 1280.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className="box-content absolute -top-11"
                >
                  <metadata>
                    Created by potrace 1.15, written by Peter Selinger 2001-2017
                  </metadata>
                  <g
                    transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                    fill="none"
                    stroke="none"
                    className="fill-eg-green"
                  >
                    <path
                      d="M5614 12635 c-305 -56 -594 -324 -865 -803 -33 -59 -64 -110 -68
-114 -4 -4 -71 21 -149 57 -313 143 -552 205 -787 206 -255 1 -441 -74 -597
-239 -191 -203 -322 -573 -363 -1022 l-7 -75 -216 3 c-319 5 -515 -20 -721
-94 -133 -47 -222 -104 -322 -203 -98 -99 -152 -192 -194 -335 -73 -253 -44
-611 84 -1023 l19 -62 -52 -17 c-102 -33 -299 -115 -404 -168 -343 -172 -535
-367 -624 -632 -20 -60 -23 -88 -23 -219 1 -127 4 -163 25 -235 62 -224 192
-457 397 -715 l84 -106 -180 -177 c-180 -178 -293 -316 -367 -447 -51 -93
-101 -219 -119 -304 -19 -92 -19 -257 0 -341 23 -96 104 -253 180 -348 127
-158 362 -340 627 -487 59 -33 108 -65 108 -70 0 -6 -16 -44 -36 -85 -307
-637 -311 -1122 -12 -1421 60 -61 170 -140 255 -182 190 -97 490 -173 793
-203 l66 -6 -1 -256 c0 -164 5 -289 13 -347 77 -518 292 -784 705 -869 117
-24 362 -22 523 4 120 20 314 67 426 103 l47 15 27 -72 c227 -606 445 -886
779 -1002 73 -26 93 -28 225 -29 167 0 234 13 394 76 166 65 338 169 535 323
56 45 111 87 121 94 15 11 27 2 101 -75 311 -327 505 -468 762 -555 116 -39
287 -49 405 -24 299 63 574 323 846 798 37 65 71 118 76 118 4 0 51 -20 103
-45 216 -99 390 -159 587 -201 119 -26 367 -26 465 0 327 85 542 348 659 807
18 74 39 168 45 209 10 62 38 248 43 285 1 7 91 10 257 11 303 0 437 17 635
80 224 72 395 208 489 392 54 104 73 165 92 292 36 236 8 474 -105 883 l-19
68 27 11 c15 5 72 27 127 48 200 75 373 161 516 256 106 70 277 242 327 330
146 253 141 539 -13 863 -82 171 -163 296 -323 501 -32 41 -56 82 -55 91 2 8
62 70 133 138 503 475 653 910 449 1302 -121 233 -337 427 -719 649 -69 39
-126 73 -128 75 -2 2 23 61 56 132 81 175 127 302 169 463 44 173 56 393 29
529 -33 161 -99 282 -218 397 -195 190 -480 299 -948 364 -79 11 -147 20 -150
20 -3 0 -5 123 -5 273 0 287 -6 343 -51 527 -161 650 -700 842 -1593 569 -36
-11 -67 -16 -71 -12 -4 5 -25 62 -49 128 -55 158 -195 441 -267 541 -119 166
-224 266 -354 337 -355 194 -791 82 -1324 -341 l-99 -78 -191 191 c-241 241
-397 354 -593 429 -158 61 -303 78 -449 51z"
                    />
                  </g>
                </svg>
                <span className="absolute -top-8.5 text-eg-bg text-lg font-good-brush">
                  90%
                </span>
              </div>
              of your sales!
              <br /> We only take a small 10% commission—consider it our "cheer
              fee!"
            </p>
          </div>

          <Link href="/artist/waitlist">
            <Button className="bg-[#c084fc] hover:bg-[#c084fc]/90 text-lg py-6 px-10 rounded-full">
              JOIN THE PRIORITY ARTIST LIST
            </Button>
          </Link>

          <p className="mx-auto max-w-[700px] text-lg italic">
            Ready to strut your stuff? Hop on our priority list and watch buyers
            swoon over your artwork like it's the last slice of pizza!
          </p>

          <div className="w-full max-w-5xl mt-8">
            <h2 className="text-3xl md:text-4xl font-archistico mb-8">
              PARTICIPATE IN CHALLENGES
            </h2>

            <Image
              src="/images/lp/art-images.jpg"
              alt="artist"
              width={1000}
              height={1000}
              className="w-full h-auto pointer-events-none select-none user-select-none"
              draggable="false"
            />

            <h3 className="text-2xl md:text-3xl font-archistico mt-8 mb-12">
              WIN A SPOT IN THE ARTIST SPOTLIGHT AND GAIN ACCESS TO EXCLUSIVE
              MARKETING CHANNELS!!
            </h3>

            <div className="flex justify-center">
              <Link href="/artist/waitlist">
                <Button className="bg-[#c084fc] hover:bg-[#c084fc]/90 text-lg py-6 px-10 rounded-full">
                  JOIN THE PRIORITY ARTIST LIST
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
