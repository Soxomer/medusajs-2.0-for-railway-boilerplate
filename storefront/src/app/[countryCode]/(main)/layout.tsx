import Logo from "@components/Logo"
import { Toaster } from "@components/ui/toaster"
import Footer from "@modules/layout/templates/footer"
import Header from "@modules/layout/templates/header"
export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {/* <Nav /> */}
      <Header />
      <main className="flex flex-col flex-1 h-full w-full">
        {props.children}
      </main>
      <Toaster />
      <Footer />
    </>
  )
}
