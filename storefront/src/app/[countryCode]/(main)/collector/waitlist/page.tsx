import { sdk } from "@lib/config"
import Image from "next/image"
import WaitlistForm from "./WaitlistForm"

export default function WaitlistPage() {
  return (
    <div className="flex min-h-full my-auto flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-12 md:space-y-30 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-serif">
                Receive info on <br />
                launch date and exclusive <br />
                artwork drops
              </h2>
              <p className="text-lg text-pretty">
                Join the waitlist to get access to handpicked artworks before
                anyone else
              </p>
              <WaitlistForm />
            </div>

            <Image
              src="/images/lp/abstract-nature-1.png"
              alt="Waitlist"
              width={500}
              height={500}
              className="object-cover h-full object-right-bottom "
            />
          </div>
        </div>
      </main>
    </div>
  )
}
