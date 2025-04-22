import React from "react"
import { guakala, scratchyLemon, goodBrush } from "../styles/fonts"

export default function FontTest() {
  return (
    <div className="space-y-12 p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Font Test Page</h1>

      {/* Basic Font Usage */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Basic Font Examples
        </h2>

        <div>
          <h3 className="text-xl font-bold mb-2">Default Font:</h3>
          <p className="text-2xl">This is the default font</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Guakala Font:</h3>
          <p className="text-2xl font-guakala">
            This text should use Guakala font
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Scratchy Lemon Font:</h3>
          <p className="text-2xl font-scratchy-lemon">
            This text should use Scratchy Lemon font
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Good Brush Font:</h3>
          <p className="text-2xl font-good-brush">
            This text should use Good Brush font
          </p>
        </div>
      </section>

      {/* Font Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Font Sizes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Guakala Sizes</h3>
            <p className="font-guakala text-xs">text-xs: Extra Small</p>
            <p className="font-guakala text-sm">text-sm: Small</p>
            <p className="font-guakala text-base">text-base: Base Size</p>
            <p className="font-guakala text-lg">text-lg: Large</p>
            <p className="font-guakala text-xl">text-xl: Extra Large</p>
            <p className="font-guakala text-2xl">text-2xl: 2X Large</p>
            <p className="font-guakala text-3xl">text-3xl: 3X Large</p>
            <p className="font-guakala text-4xl">text-4xl: 4X Large</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Scratchy Lemon Sizes</h3>
            <p className="font-scratchy-lemon text-xs">text-xs: Extra Small</p>
            <p className="font-scratchy-lemon text-sm">text-sm: Small</p>
            <p className="font-scratchy-lemon text-base">
              text-base: Base Size
            </p>
            <p className="font-scratchy-lemon text-lg">text-lg: Large</p>
            <p className="font-scratchy-lemon text-xl">text-xl: Extra Large</p>
            <p className="font-scratchy-lemon text-2xl">text-2xl: 2X Large</p>
            <p className="font-scratchy-lemon text-3xl">text-3xl: 3X Large</p>
            <p className="font-scratchy-lemon text-4xl">text-4xl: 4X Large</p>
          </div>
        </div>
      </section>

      {/* Font Styles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Font Styles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Guakala Styles</h3>
            <p className="font-guakala text-xl">Normal Text</p>
            <p className="font-guakala text-xl italic">Italic Text</p>
            <p className="font-guakala text-xl underline">Underlined Text</p>
            <p className="font-guakala text-xl line-through">
              Strikethrough Text
            </p>
            <p className="font-guakala text-xl uppercase">UPPERCASE TEXT</p>
            <p className="font-guakala text-xl lowercase">lowercase text</p>
            <p className="font-guakala text-xl capitalize">capitalized text</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Good Brush Styles</h3>
            <p className="font-good-brush text-xl">Normal Text</p>
            <p className="font-good-brush text-xl italic">Italic Text</p>
            <p className="font-good-brush text-xl underline">Underlined Text</p>
            <p className="font-good-brush text-xl line-through">
              Strikethrough Text
            </p>
            <p className="font-good-brush text-xl uppercase">UPPERCASE TEXT</p>
            <p className="font-good-brush text-xl lowercase">lowercase text</p>
            <p className="font-good-brush text-xl capitalize">
              capitalized text
            </p>
          </div>
        </div>
      </section>

      {/* Different Ways to Apply Fonts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Different Ways to Apply Fonts
        </h2>

        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Using Tailwind Classes</h3>
            <p className="font-guakala text-xl">
              This uses the font-guakala class
            </p>
            <p className="font-scratchy-lemon text-xl">
              This uses the font-scratchy-lemon class
            </p>
            <p className="font-good-brush text-xl">
              This uses the font-good-brush class
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Using className Property</h3>
            <p className={`text-xl ${guakala.className}`}>
              This uses the font object's className property
            </p>
            <p className={`text-xl ${scratchyLemon.className}`}>
              This uses the font object's className property
            </p>
            <p className={`text-xl ${goodBrush.className}`}>
              This uses the font object's className property
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Using style Property</h3>
            <p className="text-xl" style={guakala.style}>
              This uses the font object's style property
            </p>
            <p className="text-xl" style={scratchyLemon.style}>
              This uses the font object's style property
            </p>
            <p className="text-xl" style={goodBrush.style}>
              This uses the font object's style property
            </p>
          </div>
        </div>
      </section>

      {/* Letter Spacing and Line Height */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Letter Spacing & Line Height
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Letter Spacing</h3>
            <p className="font-scratchy-lemon text-xl tracking-tighter">
              tracking-tighter
            </p>
            <p className="font-scratchy-lemon text-xl tracking-tight">
              tracking-tight
            </p>
            <p className="font-scratchy-lemon text-xl tracking-normal">
              tracking-normal
            </p>
            <p className="font-scratchy-lemon text-xl tracking-wide">
              tracking-wide
            </p>
            <p className="font-scratchy-lemon text-xl tracking-wider">
              tracking-wider
            </p>
            <p className="font-scratchy-lemon text-xl tracking-widest">
              tracking-widest
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Line Height</h3>
            <p className="font-guakala text-lg leading-none bg-gray-100 mb-2 p-1">
              leading-none: Very tight line height
            </p>
            <p className="font-guakala text-lg leading-tight bg-gray-100 mb-2 p-1">
              leading-tight: Tight line height
            </p>
            <p className="font-guakala text-lg leading-normal bg-gray-100 mb-2 p-1">
              leading-normal: Normal line height
            </p>
            <p className="font-guakala text-lg leading-relaxed bg-gray-100 mb-2 p-1">
              leading-relaxed: Relaxed line height
            </p>
            <p className="font-guakala text-lg leading-loose bg-gray-100 mb-2 p-1">
              leading-loose: Loose line height
            </p>
          </div>
        </div>
      </section>

      {/* Responsive Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Responsive Typography
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Responsive Sizing</h3>
            <p className="font-guakala text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              This text changes size at different breakpoints
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Responsive Spacing</h3>
            <p className="font-scratchy-lemon text-xl tracking-normal sm:tracking-wide md:tracking-wider lg:tracking-widest">
              This text changes letter spacing at different breakpoints
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
