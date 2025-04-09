import Link from "next/link"

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 md:px-8 border-b border-green-100 bg-white shadow-sm flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <h1 className="text-xl font-bold text-green-800">BioDiversa</h1>
      </Link>
      <nav className="flex gap-6">
        <Link href="/" className="text-green-700 hover:text-green-500 transition-colors font-medium">
          Home
        </Link>
        <Link href="/about" className="text-green-700 hover:text-green-500 transition-colors font-medium">
          Sobre
        </Link>
        <Link href="/login" className="text-green-700 hover:text-green-500 transition-colors font-medium">
          Login
        </Link>
        <Link href="/register" className="text-green-700 hover:text-green-500 transition-colors font-medium">
          Registrar
        </Link>
      </nav>
    </header>
  )
}

