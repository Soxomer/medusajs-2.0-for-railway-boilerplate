import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <>
      <Nav />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
