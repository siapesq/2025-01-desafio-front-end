export default function Footer() {
    return (
      <footer className="w-full py-6 px-6 border-t border-green-100 bg-green-50 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-green-700">
            © {new Date().getFullYear()} BioDiversa - Catálogo de Espécies. Todos os direitos reservados.
          </p>
          <p className="text-xs text-green-600 mt-2">Dedicado à preservação e documentação da biodiversidade global.</p>
        </div>
      </footer>
    )
  }
  
  