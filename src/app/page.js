import Link from "next/link"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-50">
      <Navbar/>
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-8">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-800">Explore a Biodiversidade do Planeta</h1>
          <p className="mb-8 text-lg text-green-700">
            Descubra e aprenda com o nosso catálogo de espécies. Faça login ou registre-se para acessar o
            mostruário completo.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors">
                Registrar
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

