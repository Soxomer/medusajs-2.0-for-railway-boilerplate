"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { toast } from "@components/hooks/use-toast"
import { sdk } from "@lib/config"

export default function WaitListForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    portfolio_link: z
      .string()
      .url({ message: "Please enter a valid URL" })
      .optional()
      .or(z.literal("")),
    website_link: z
      .string()
      .url({ message: "Please enter a valid URL" })
      .optional()
      .or(z.literal("")),
    other_marketplaces: z.string().optional(),
    features: z
      .string()
      .min(10, {
        message: "Please provide at least 10 characters of feedback",
      })
      .optional()
      .or(z.literal("")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      portfolio_link: "",
      website_link: "",
      other_marketplaces: "",
      features: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      await sdk.client.fetch("/store/launch-list", {
        method: "POST",
        mode: "cors",
        body: {
          ...values,
          user_type: "seller",
          full_form: values,
        },
      })

      toast({
        title: "Success!",
        description:
          "You've been added to our waitlist. We'll be in touch soon!",
      })

      setTimeout(() => {
        router.push("/")
      }, 2000)
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

  const inputClass =
    "bg-eg-purple/50 text-black rounded-md p-3 w-full placeholder:text-eg-purple border-b-2 border-eg-purple"

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-medium">
                  Full name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-medium">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className={inputClass}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolio_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-medium">
                  Portfolio Link <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.myportfolio.com"
                    {...field}
                    className={inputClass}
                    type="url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-medium">
                  Website
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.mysite.com"
                    {...field}
                    className={inputClass}
                    type="url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="other_marketplaces"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-medium">
                  Which other marketplaces do you sell on?{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List the platforms and services you use to sell your artwork (NA for none)"
                    className={`${inputClass} min-h-[80px] resize-none`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black font-medium">
                  What features would you like to see on this platform?{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I want ...."
                    className={`${inputClass} min-h-[100px] resize-none`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-eg-purple hover:bg-eg-purple/90 text-white font-bold py-3 px-6 mt-4 rounded-md tracking-wider font-archistico"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
