import Link from "next/link"
export default function Header() {
  return (
    <header className="pb-4 pt-5 px-4 border-b bg-eg-bg border-eg-purple">
      <div className="max-w-6xl mx-auto">
        <Link href="/">
          <h1 className="text-3xl md:text-4xl font-archistico font-bold text-center">
            <span className="text-eg-purple">ETCHY</span>
            <span className="text-eg-purple">GHOUL</span>
          </h1>
        </Link>
      </div>
    </header>
  )
}
