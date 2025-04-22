import { Suspense } from "react"
import Image from "next/image"
import WaitListForm from "./WaitListForm"

export default function JoinPage() {
  return (
    <main className="bg-eg-bg text-black container m-auto py-7">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 mx-auto">
        {/* Form Section */}
        <section className="bg-white text-eg-bg p-8">
          <div className="w-full max-w-md mx-auto">
            <Suspense fallback={<div>Loading form...</div>}>
              <WaitListForm />
            </Suspense>
          </div>
        </section>

        {/* Right Column with Styled Text and Illustration */}
        <section className="bg-white p-8 flex flex-col items-center justify-center md:[clip-path:polygon(0_4%,100%_0%,100%_100%,0_96%)]">
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-archistico font-bold text-4xl mb-8 text-center ">
              Thanks for wanting to join our exclusive art party!
            </h2>
            <div className="my-12 flex justify-center">
              <Image
                src="/assets/hands.png"
                alt="Illustrated hands"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            <p className="italic font-serif text-lg">
              We can't wait to check out your work! No need to stress about your
              art skills—we're here to celebrate your creativity! We're super
              excited to see the amazing magic you've got in store!
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
