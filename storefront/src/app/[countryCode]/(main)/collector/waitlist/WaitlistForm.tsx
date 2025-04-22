"use client"
import { sdk } from "@lib/config"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "@components/hooks/use-toast"
import { Toaster } from "@components/ui/toaster"

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true)

    try {
      await sdk.client.fetch("/store/launch-list", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: {
          email: data.email,
          user_type: "buyer",
        },
      })
      
      toast({
        title: "Success!",
        description:
          "You've been added to our waitlist. We'll be in touch soon!",
      })
      
      reset()
    } catch (error: any) {
      if (error.message?.includes("already exists")) {
        toast({
          title: "You're already on the waitlist!",
             description: "Please check your email for a confirmation.",
             variant: "default",
           })
         } else {
           toast({
             title: "Something went wrong.",
             description: error.statusText || "Please try again later.",
             variant: "destructive",
           })
         }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Your email address"
            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c084fc]"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-md bg-[#c084fc] hover:bg-[#a855f7] text-white disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Join Waitlist"}
        </button>
      </form>
      <Toaster />
    </div>
  )
}
