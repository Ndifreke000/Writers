import type React from "react"
import LandingHeader from "@/components/landing-header"
import { Button } from "@/components/ui/button"
import { BookOpen, Edit, Lightbulb, Users, Network, FileText, BookMarked } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />

      {/* Hero Section */}
      <section
        id="write"
        className="flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-navy to-navy-light text-white"
      >
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bring Your Stories to Life</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Writer's Workshop is the all-in-one platform for authors to organize, develop, and write their stories with
            powerful tools designed for creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-navy hover:bg-gray-100">
                Start Writing Now
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-navy">Powerful Tools for Writers</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Edit className="h-10 w-10 text-navy" />}
              title="Manuscript Editor"
              description="Write your story with our distraction-free editor designed specifically for authors."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-navy" />}
              title="Character Management"
              description="Create detailed character profiles and keep track of their development throughout your story."
            />
            <FeatureCard
              icon={<Network className="h-10 w-10 text-navy" />}
              title="Character Relations"
              description="Visualize and manage the complex relationships between your characters."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-navy" />}
              title="Plot Development"
              description="Outline your story structure, track plot points, and organize your narrative."
            />
            <FeatureCard
              icon={<BookMarked className="h-10 w-10 text-navy" />}
              title="Research Organization"
              description="Store and organize your research materials in one convenient location."
            />
            <FeatureCard
              icon={<Lightbulb className="h-10 w-10 text-navy" />}
              title="Idea Management"
              description="Capture and develop your creative ideas before they slip away."
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-navy">Loved by Writers Everywhere</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Writer's Workshop transformed my writing process. I've completed more in the last month than in the previous year."
              author="Sarah J. Miller"
              role="Fantasy Author"
            />
            <TestimonialCard
              quote="The character management tools alone are worth it. I can finally keep track of my complex cast of characters."
              author="David Chen"
              role="Mystery Writer"
            />
            <TestimonialCard
              quote="As someone who struggles with organization, this platform has been a game-changer for my writing career."
              author="Amara Thompson"
              role="Sci-Fi Novelist"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-navy text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Writing Journey?</h2>
          <p className="text-xl mb-10">
            Join thousands of writers who have transformed their writing process with Writer's Workshop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-navy hover:bg-gray-100">
                Sign Up Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-900 text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Writer's Workshop</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="hover:underline">
                Terms
              </Link>
              <Link href="#" className="hover:underline">
                Privacy
              </Link>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Writer's Workshop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-navy">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string
  author: string
  role: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <p className="italic text-gray-700 mb-4">"{quote}"</p>
      <div>
        <p className="font-bold text-navy">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  )
}

