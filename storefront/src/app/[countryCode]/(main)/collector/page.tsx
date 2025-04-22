import { Button } from "@components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function CollectorPage() {
  return (
    <div className="font-serif flex flex-col gap-2 flex-1 w-full p-4 mt-10 ">
      <div className="space-y-16 mx-auto max-w-4xl flex flex-col items-center text-center">
        <div className="flex gap-2 justify-between">
          <Image
            src="/images/lp/lightning.png"
            alt="lightning icon"
            width={100}
            height={100}
            className="w-10 h-10 md:w-15 md:h-15 scale-y-[-1]"
          />
          <h1 className="font-archistico text-2xl md:text-4xl leading-tight max-w-lg">
            WELCOME ART BUYERS, COLLECTORS AND AFICIONADOS
          </h1>
          
          <Image
            src="/images/lp/lightning.png"
            alt="lightning icon"
            width={100}
            height={100}
            className="w-10 h-10 md:w-15 md:h-15"
          />
        </div>
        <p className="max-w-xl text-lg md:text-xl lg:text-2xl italic">
          Imagine being able to step into an art gallery from your couch,
          without having to dedicate your afternoon to visiting physical
          exhibitions. This is the experience we will dedicate ourselves to. We
          want you to have access to new trends in art and emerging artists
          before anyone else
          <br />
          This is the experience we want to bring to you!
        </p>
        <Link href="/collector/waitlist">
          <button className="bg-[#c084fc] hover:bg-blue-200 text-lg py-6 px-10 md:px-16 md:py-8 md:text-xl rounded-full transition-colors duration-300">
            I WANT PRIORITY ACCESS
          </button>
        </Link>

        <p className="max-w-xl text-lg md:text-xl lg:text-2xl italic">
          Hop on our priority list and get access to exclusive art drops and
          curated pieces
        </p>
      </div>
    </div>
  )
}
