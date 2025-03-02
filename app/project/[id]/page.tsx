"use client"

import { useEffect } from "react"
import { useProjects } from "@/components/project-provider"
import { useRouter } from "next/navigation"
import ProjectHeader from "@/components/project-header"
import { Users, Network, FileText, BookMarked } from "lucide-react"
import Link from "next/link"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { projects, setCurrentProject, currentProject } = useProjects()
  const router = useRouter()

  useEffect(() => {
    const project = projects.find((p) => p.id === params.id)
    if (!project) {
      router.push("/home")
      return
    }

    setCurrentProject(params.id)
  }, [params.id, projects, router, setCurrentProject])

  if (!currentProject) {
    return <div className="min-h-screen flex items-center justify-center">Loading project...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProjectHeader />

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{currentProject.title}</h1>
          <p className="text-gray-600 mt-1">{currentProject.summary}</p>
        </div>

        {/* Project Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Manuscript Editor */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Manuscript</h2>
            <div className="border border-gray-200 rounded-lg p-4 min-h-[400px]">
              <textarea
                className="w-full h-full min-h-[360px] resize-none border-0 focus:ring-0 focus:outline-none"
                placeholder="Start writing your manuscript here..."
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Characters */}
            <Link href={`/project/${currentProject.id}/characters`} className="block">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <Users className="h-12 w-12 text-navy mb-4" />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Characters</h3>
                  <p className="text-sm text-gray-600">Manage your story's characters</p>
                </div>
              </div>
            </Link>

            {/* Character Relations */}
            <Link href={`/project/${currentProject.id}/relations`} className="block">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <Network className="h-12 w-12 text-navy mb-4" />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Relations</h3>
                  <p className="text-sm text-gray-600">Track character relationships</p>
                </div>
              </div>
            </Link>

            {/* Plot */}
            <Link href={`/project/${currentProject.id}/plot`} className="block">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <FileText className="h-12 w-12 text-navy mb-4" />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Plot</h3>
                  <p className="text-sm text-gray-600">Outline your story structure</p>
                </div>
              </div>
            </Link>

            {/* Research */}
            <Link href={`/project/${currentProject.id}/research`} className="block">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <BookMarked className="h-12 w-12 text-navy mb-4" />
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Research</h3>
                  <p className="text-sm text-gray-600">Store important notes and references</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

