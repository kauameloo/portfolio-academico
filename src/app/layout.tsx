import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/Theme-Provider/theme-provider"
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { ModeToggle } from "@/components/Mode-toggle/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfólio Acadêmico FIAP",
  description: "Portfólio de avaliações acadêmicas dos alunos da FIAP",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <Link className="flex items-center justify-center mr-6" href="/">
                  <BookOpen className="h-6 w-6 mr-2" />
                  <span className="font-bold hidden sm:inline-block">Portfólio Acadêmico FIAP</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <Link className="transition-colors hover:text-foreground/80 text-foreground/60" href="/">Home</Link>
                </nav>
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2024 Portfólio Acadêmico FIAP. Todos os direitos reservados.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}