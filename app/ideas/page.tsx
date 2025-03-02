"use client"

import { useAuth } from "@/components/auth-provider"
import { useProjects } from "@/components/project-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Plus, Trash2, Pencil, Home, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function IdeasPage() {
  const { user, logout } = useAuth()
  const { ideas, addIdea, updateIdea, deleteIdea } = useProjects()
  const [editingIdeaId, setEditingIdeaId] = useState<string | null>(null)
  const [newIdeaTitle, setNewIdeaTitle] = useState("")
  const [newIdeaDescription, setNewIdeaDescription] = useState("")

  const handleAddIdea = () => {
    if (!newIdeaTitle.trim()) return

    addIdea(newIdeaTitle, newIdeaDescription)
    setNewIdeaTitle("")
    setNewIdeaDescription("")
  }

  const handleUpdateIdea = (id: string) => {
    if (!newIdeaTitle.trim()) return

    updateIdea(id, {
      title: newIdeaTitle,
      description: newIdeaDescription,
    })

    setNewIdeaTitle("")
    setNewIdeaDescription("")
    setEditingIdeaId(null)
  }

  const startEditing = (id: string) => {
    const idea = ideas.find((i) => i.id === id)
    if (!idea) return

    setNewIdeaTitle(idea.title)
    setNewIdeaDescription(idea.description)
    setEditingIdeaId(id)
  }

  const cancelEditing = () => {
    setNewIdeaTitle("")
    setNewIdeaDescription("")
    setEditingIdeaId(null)
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
                <Home className="h-4 w-4 inline-block mr-1" />
                Home
              </Link>
              <Link href="/ideas" className="text-navy font-medium border-b-2 border-navy pb-1">
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
            <h1 className="text-3xl font-bold text-gray-900">My Ideas</h1>
            <p className="text-gray-600 mt-1">Capture and organize your creative ideas</p>
          </div>
        </div>

        {/* Add/Edit Idea Form */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingIdeaId ? "Edit Idea" : "Add New Idea"}</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="ideaTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                id="ideaTitle"
                placeholder="Enter idea title"
                value={newIdeaTitle}
                onChange={(e) => setNewIdeaTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ideaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="ideaDescription"
                placeholder="Describe your idea..."
                rows={4}
                value={newIdeaDescription}
                onChange={(e) => setNewIdeaDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-3">
              {editingIdeaId && (
                <Button variant="outline" onClick={cancelEditing}>
                  Cancel
                </Button>
              )}
              <Button
                className="bg-navy hover:bg-navy-light"
                onClick={editingIdeaId ? () => handleUpdateIdea(editingIdeaId) : handleAddIdea}
                disabled={!newIdeaTitle.trim()}
              >
                {editingIdeaId ? "Update Idea" : "Add Idea"}
              </Button>
            </div>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Plus className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No ideas yet</h3>
              <p className="text-gray-600 max-w-md mb-6">
                Add your first idea using the form above to start capturing your creative thoughts.
              </p>
            </div>
          ) : (
            ideas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{idea.title}</h3>
                  <p className="text-gray-700 mb-4">{idea.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Created: {new Date(idea.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => startEditing(idea.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteIdea(idea.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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

