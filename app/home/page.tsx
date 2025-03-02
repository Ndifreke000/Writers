"use client"

import { useAuth } from "@/components/auth-provider"
import { useProjects } from "@/components/project-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { BookOpen, Plus, BookText, Lightbulb, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, logout } = useAuth()
  const { projects, createProject, setCurrentProject } = useProjects()
  const [newProjectTitle, setNewProjectTitle] = useState("")
  const [newProjectSummary, setNewProjectSummary] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()

  const handleCreateProject = () => {
    if (!newProjectTitle.trim()) return

    const project = createProject(newProjectTitle, newProjectSummary)
    setNewProjectTitle("")
    setNewProjectSummary("")
    setDialogOpen(false)

    // Set as current project and navigate to project workspace
    setCurrentProject(project.id)
    router.push(`/project/${project.id}`)
  }

  const handleOpenProject = (projectId: string) => {
    setCurrentProject(projectId)
    router.push(`/project/${projectId}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/home" className="flex items-center">
              <BookOpen className="h-6 w-6 text-navy mr-2" />
              <span className="text-xl font-bold text-navy">Writer's Workshop</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/home" className="text-gray-700 font-medium hover:text-navy transition-colors">
                Home
              </Link>
              <Link href="/ideas" className="text-gray-700 font-medium hover:text-navy transition-colors">
                Ideas
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden md:inline-block">Welcome, {user?.name}</span>
            <Button variant="ghost" size="icon" onClick={logout} title="Log out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
            <p className="text-gray-600 mt-1">Manage and organize your writing projects</p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-navy hover:bg-navy-light">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Project Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Enter project title"
                      value={newProjectTitle}
                      onChange={(e) => setNewProjectTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="summary" className="text-sm font-medium">
                      Project Summary
                    </label>
                    <Textarea
                      id="summary"
                      placeholder="Enter a brief summary of your project"
                      rows={4}
                      value={newProjectSummary}
                      onChange={(e) => setNewProjectSummary(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    className="bg-navy hover:bg-navy-light"
                    onClick={handleCreateProject}
                    disabled={!newProjectTitle.trim()}
                  >
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Link href="/ideas">
              <Button variant="outline">
                <Lightbulb className="h-4 w-4 mr-2" />
                Ideas
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <BookText className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 max-w-md mb-6">
                Create your first writing project to get started on your writing journey.
              </p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-navy hover:bg-navy-light">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Project
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="flex p-4 border-b border-gray-100">
                    <div className="w-1/3 mr-4">
                      <div className="aspect-[2/3] relative bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={project.coverImage || "/placeholder.svg?height=300&width=200"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {project.chapters} {project.chapters === 1 ? "chapter" : "chapters"}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-3">{project.summary}</p>
                    </div>
                  </div>
                  <div className="p-4 mt-auto">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                      </div>
                      <Button
                        size="sm"
                        className="bg-navy hover:bg-navy-light"
                        onClick={() => handleOpenProject(project.id)}
                      >
                        Open Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

