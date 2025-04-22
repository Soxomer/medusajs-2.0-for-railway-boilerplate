import Link from "next/link"
import Image from "next/image"

export default async function Footer() {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-[#333333] bg-eg-bg">
      <div className="max-w-6xl mx-auto border-b border-eg-fg">
        <div className="flex flex-col items-center">
          <p className="text-gray-400 text-sm mb-4 text-center italic font-serif">
            A marketplace designed for artists, by an artist
          </p>
          <div className="flex space-x-6 mb-4">
            <Link
              href="https://www.pinterest.com/etchyghoul/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#a5b526] transition-colors"
            >
              <Image
                src="/assets/Pinterest.svg"
                alt="Pinterest"
                width={20}
                height={20}
              />
              <span className="sr-only">Pinterest</span>
            </Link>
            <Link
              href="https://www.instagram.com/EtchyGhoul"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#a5b526] transition-colors"
            >
              <Image
                src="/assets/Instagram_icon.png"
                alt="Instagram"
                width={20}
                height={20}
              />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://bsky.app/profile/etchyghoul.bsky.social"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#a5b526] transition-colors"
            >
              <Image
                src="/assets/Bluesky_Logo.svg"
                alt="Bluesky"
                width={20}
                height={20}
              />
              <span className="sr-only">Bluesky</span>
            </Link>
            {/* <Link
              href="https://www.linkedin.com/company/etchyghoul/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#a5b526] transition-colors"
            >
              <Image
                src="/assets/LinkedIn_icon.svg"
                alt="LinkedIn"
                width={20}
                height={20}
              />
              <span className="sr-only">LinkedIn</span>
            </Link> */}
            <Link
              href="mailto:etchyghoul@gmail.com"
              className="text-gray-400 hover:text-[#a5b526] transition-colors"
            >
              <Image
                src="/assets/email.png"
                alt="Email"
                width={20}
                height={20}
              />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <p className="text-center mb-4 text-gray-600 text-xs">
            © 2025 by ETCHYGHOUL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    // <footer className="border-t border-ui-border-base w-full">
    //   <div className="content-container flex flex-col w-full">
    //     <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
    //       <div>
    //         <LocalizedClientLink
    //           href="/"
    //           className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
    //         >
    //           Medusa Store
    //         </LocalizedClientLink>
    //       </div>
    //       <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
    //         {product_categories && product_categories?.length > 0 && (
    //           <div className="flex flex-col gap-y-2">
    //             <span className="txt-small-plus txt-ui-fg-base">
    //               Categories
    //             </span>
    //             <ul
    //               className="grid grid-cols-1 gap-2"
    //               data-testid="footer-categories"
    //             >
    //               {product_categories?.slice(0, 6).map((c) => {
    //                 if (c.parent_category) {
    //                   return
    //                 }

    //                 const children =
    //                   c.category_children?.map((child) => ({
    //                     name: child.name,
    //                     handle: child.handle,
    //                     id: child.id,
    //                   })) || null

    //                 return (
    //                   <li
    //                     className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
    //                     key={c.id}
    //                   >
    //                     <LocalizedClientLink
    //                       className={clx(
    //                         "hover:text-ui-fg-base",
    //                         children && "txt-small-plus"
    //                       )}
    //                       href={`/categories/${c.handle}`}
    //                       data-testid="category-link"
    //                     >
    //                       {c.name}
    //                     </LocalizedClientLink>
    //                     {children && (
    //                       <ul className="grid grid-cols-1 ml-3 gap-2">
    //                         {children &&
    //                           children.map((child) => (
    //                             <li key={child.id}>
    //                               <LocalizedClientLink
    //                                 className="hover:text-ui-fg-base"
    //                                 href={`/categories/${child.handle}`}
    //                                 data-testid="category-link"
    //                               >
    //                                 {child.name}
    //                               </LocalizedClientLink>
    //                             </li>
    //                           ))}
    //                       </ul>
    //                     )}
    //                   </li>
    //                 )
    //               })}
    //             </ul>
    //           </div>
    //         )}
    //         {collections && collections.length > 0 && (
    //           <div className="flex flex-col gap-y-2">
    //             <span className="txt-small-plus txt-ui-fg-base">
    //               Collections
    //             </span>
    //             <ul
    //               className={clx(
    //                 "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
    //                 {
    //                   "grid-cols-2": (collections?.length || 0) > 3,
    //                 }
    //               )}
    //             >
    //               {collections?.slice(0, 6).map((c) => (
    //                 <li key={c.id}>
    //                   <LocalizedClientLink
    //                     className="hover:text-ui-fg-base"
    //                     href={`/collections/${c.handle}`}
    //                   >
    //                     {c.title}
    //                   </LocalizedClientLink>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         )}
    //         <div className="flex flex-col gap-y-2">
    //           <span className="txt-small-plus txt-ui-fg-base">Medusa</span>
    //           <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
    //             <li>
    //               <a
    //                 href="https://github.com/medusajs"
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="hover:text-ui-fg-base"
    //               >
    //                 GitHub
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="https://docs.medusajs.com"
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="hover:text-ui-fg-base"
    //               >
    //                 Documentation
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="https://github.com/medusajs/nextjs-starter-medusa"
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="hover:text-ui-fg-base"
    //               >
    //                 Source code
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
    //       <Text className="txt-compact-small">
    //         © {new Date().getFullYear()} Medusa Store. All rights reserved.
    //       </Text>
    //       <MedusaCTA />
    //     </div>
    //   </div>
    // </footer>
  )
}
