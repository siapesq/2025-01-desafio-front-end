import { Fish } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Fish className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">pesquIA</span>
        </div>
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}