import type { Metadata } from "next"
import Link from "next/link"
import { Fish, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"


export const metadata: Metadata = {
  title: "pesquIA - ERP para Gestão de Produtos de Pescaria",
  description: "Sistema inteligente de gestão para empresas do setor de pesca",
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/40 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Gestão inteligente para o setor de <span className="text-primary">pesca</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  O pesquIA é um sistema ERP completo que utiliza inteligência artificial para otimizar a gestão de
                  produtos de pescaria, aumentando a eficiência e reduzindo custos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/auth/login">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Começar agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline">
                      Ver demonstração
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-gradient-to-br from-primary to-accent p-1">
                  <div className="absolute inset-0 m-[3px] rounded-lg bg-background flex items-center justify-center">
                    <div className="text-center">
                      <Fish className="h-16 w-16 mx-auto text-primary mb-4" />
                      <h3 className="text-2xl font-bold">Dashboard pesquIA</h3>
                      <p className="text-muted-foreground">Visualize a imagem do sistema</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section id="contato" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pronto para <span className="text-primary">revolucionar</span> seu negócio?
              </h2>
              <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Entre em contato conosco hoje mesmo e descubra como o pesquIA pode transformar a gestão da sua empresa
                de pesca.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
