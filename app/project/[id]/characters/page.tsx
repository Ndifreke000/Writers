"use client"

import { useEffect, useState } from "react"
import { useProjects, type Character } from "@/components/project-provider"
import { useRouter } from "next/navigation"
import ProjectHeader from "@/components/project-header"
import ProjectSidebar from "@/components/project-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Pencil, User } from "lucide-react"
import Image from "next/image"

export default function CharactersPage({ params }: { params: { id: string } }) {
  const { projects, setCurrentProject, currentProject, characters, addCharacter, updateCharacter, deleteCharacter } =
    useProjects()
  const router = useRouter()

  const [editingCharacterId, setEditingCharacterId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [traits, setTraits] = useState("")

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

  const projectCharacters = characters.filter((char) => char.projectId === currentProject.id)

  const handleAddCharacter = () => {
    if (!name.trim()) return

    addCharacter({
      projectId: currentProject.id,
      name,
      description,
      traits: traits
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      imageUrl: "/placeholder.svg?height=200&width=200",
    })

    resetForm()
  }

  const handleUpdateCharacter = (id: string) => {
    if (!name.trim()) return

    updateCharacter(id, {
      name,
      description,
      traits: traits
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    })

    resetForm()
  }

  const startEditing = (character: Character) => {
    setEditingCharacterId(character.id)
    setName(character.name)
    setDescription(character.description)
    setTraits(character.traits.join(", "))
  }

  const resetForm = () => {
    setEditingCharacterId(null)
    setName("")
    setDescription("")
    setTraits("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProjectHeader />

      <div className="flex-1 flex">
        <ProjectSidebar projectId={currentProject.id} />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Characters</h1>
            <p className="text-gray-600">Create and manage your story's characters</p>
          </div>

          {/* Character Form */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingCharacterId ? "Edit Character" : "Add New Character"}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="characterName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="characterName"
                  placeholder="Character name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="characterDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  id="characterDescription"
                  placeholder="Describe your character..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="characterTraits" className="block text-sm font-medium text-gray-700 mb-1">
                  Traits (comma separated)
                </label>
                <Input
                  id="characterTraits"
                  placeholder="brave, intelligent, stubborn"
                  value={traits}
                  onChange={(e) => setTraits(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3">
                {editingCharacterId && (
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
                <Button
                  className="bg-navy hover:bg-navy-light"
                  onClick={editingCharacterId ? () => handleUpdateCharacter(editingCharacterId) : handleAddCharacter}
                  disabled={!name.trim()}
                >
                  {editingCharacterId ? "Update Character" : "Add Character"}
                </Button>
              </div>
            </div>
          </div>

          {/* Characters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectCharacters.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <User className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No characters yet</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Add your first character using the form above to start building your story's cast.
                </p>
              </div>
            ) : (
              projectCharacters.map((character) => (
                <div
                  key={character.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 flex">
                    <div className="w-1/3 mr-4">
                      <div className="aspect-square relative bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={character.imageUrl || "/placeholder.svg?height=200&width=200"}
                          alt={character.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{character.name}</h3>
                      <p className="text-sm text-gray-700 line-clamp-3 mb-2">{character.description}</p>
                      {character.traits.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {character.traits.map((trait, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-3 flex justify-end space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => startEditing(character)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => deleteCharacter(character.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

