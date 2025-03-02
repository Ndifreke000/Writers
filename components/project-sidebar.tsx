"use client"

import { useProjects } from "@/components/project-provider"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Users, Network, FileText, BookMarked, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProjectSidebar({ projectId }: { projectId: string }) {
  const { currentProject, characters } = useProjects()

  const [charactersOpen, setCharactersOpen] = useState(true)
  const [relationsOpen, setRelationsOpen] = useState(false)
  const [manuscriptOpen, setManuscriptOpen] = useState(false)

  const projectCharacters = characters.filter((char) => char.projectId === projectId)

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-navy truncate" title={currentProject?.title || ""}>
          {currentProject?.title}
        </h2>
      </div>

      {/* Characters Folder */}
      <div className="mb-4">
        <button className="flex items-center w-full text-left mb-2" onClick={() => setCharactersOpen(!charactersOpen)}>
          {charactersOpen ? (
            <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
          )}
          <Users className="h-4 w-4 mr-2 text-navy" />
          <span className="font-medium">Characters</span>
        </button>

        {charactersOpen && (
          <div className="ml-6 space-y-1">
            <Link href={`/project/${projectId}/characters`}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 hover:text-navy">
                All Characters
              </Button>
            </Link>

            {projectCharacters.map((character) => (
              <Link key={character.id} href={`/project/${projectId}/characters`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-700 hover:text-navy truncate"
                >
                  {character.name}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Character Relations Folder */}
      <div className="mb-4">
        <button className="flex items-center w-full text-left mb-2" onClick={() => setRelationsOpen(!relationsOpen)}>
          {relationsOpen ? (
            <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
          )}
          <Network className="h-4 w-4 mr-2 text-navy" />
          <span className="font-medium">Character Relations</span>
        </button>

        {relationsOpen && (
          <div className="ml-6 space-y-1">
            <Link href={`/project/${projectId}/relations`}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 hover:text-navy">
                All Relations
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Manuscript Folder */}
      <div className="mb-4">
        <button className="flex items-center w-full text-left mb-2" onClick={() => setManuscriptOpen(!manuscriptOpen)}>
          {manuscriptOpen ? (
            <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
          )}
          <BookOpen className="h-4 w-4 mr-2 text-navy" />
          <span className="font-medium">Manuscript</span>
        </button>

        {manuscriptOpen && (
          <div className="ml-6 space-y-1">
            <Link href={`/project/${projectId}`}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 hover:text-navy">
                Main Manuscript
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Other Links */}
      <div className="space-y-1 mt-6">
        <Link href={`/project/${projectId}/plot`}>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2 text-navy" />
            Plot
          </Button>
        </Link>
        <Link href={`/project/${projectId}/research`}>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <BookMarked className="h-4 w-4 mr-2 text-navy" />
            Research
          </Button>
        </Link>
      </div>
    </div>
  )
}

