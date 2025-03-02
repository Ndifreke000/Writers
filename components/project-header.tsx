"use client"

import { useAuth } from "@/components/auth-provider"
import { useProjects } from "@/components/project-provider"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Lightbulb, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProjectHeader() {
  const { user, logout } = useAuth()
  const { currentProject } = useProjects()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/home" className="flex items-center">
            <BookOpen className="h-6 w-6 text-navy mr-2" />
            <span className="text-xl font-bold text-navy">Writer's Workshop</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-gray-700 font-medium hover:text-navy transition-colors">
              <Home className="h-4 w-4 inline-block mr-1" />
              Home
            </Link>
            <Link href="/ideas" className="text-gray-700 font-medium hover:text-navy transition-colors">
              <Lightbulb className="h-4 w-4 inline-block mr-1" />
              Ideas
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden md:inline-block">{currentProject?.title}</span>
          <Button variant="ghost" size="icon" onClick={logout} title="Log out">
            <LogOut className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/home"
              className="text-gray-700 font-medium hover:text-navy transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4 inline-block mr-2" />
              Home
            </Link>
            <Link
              href="/ideas"
              className="text-gray-700 font-medium hover:text-navy transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Lightbulb className="h-4 w-4 inline-block mr-2" />
              Ideas
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

