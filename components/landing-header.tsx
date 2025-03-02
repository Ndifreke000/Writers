"use client"

import { BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-navy text-white py-4"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <BookOpen className={`h-6 w-6 mr-2 ${isScrolled ? "text-navy" : "text-white"}`} />
          <span className={`text-xl font-bold ${isScrolled ? "text-navy" : "text-white"}`}>Writer's Workshop</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#write" className={`font-medium hover:underline ${isScrolled ? "text-gray-700" : "text-white"}`}>
            Write
          </a>
          <a href="#features" className={`font-medium hover:underline ${isScrolled ? "text-gray-700" : "text-white"}`}>
            Features
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              className={isScrolled ? "border-navy text-navy hover:bg-navy hover:text-white" : ""}
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant={isScrolled ? "default" : "secondary"}
              className={isScrolled ? "bg-navy text-white hover:bg-navy-light" : "bg-white text-navy hover:bg-gray-100"}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

