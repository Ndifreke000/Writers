"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export type Project = {
  id: string
  title: string
  summary: string
  coverImage: string
  chapters: number
  createdAt: string
  updatedAt: string
}

export type Character = {
  id: string
  projectId: string
  name: string
  description: string
  traits: string[]
  imageUrl: string
}

export type Relationship = {
  id: string
  projectId: string
  character1Id: string
  character2Id: string
  relationshipType: string
  description: string
}

export type PlotPoint = {
  id: string
  projectId: string
  title: string
  description: string
  chapter: number
  order: number
}

export type ResearchItem = {
  id: string
  projectId: string
  title: string
  content: string
  tags: string[]
}

export type Idea = {
  id: string
  title: string
  description: string
  createdAt: string
}

type ProjectContextType = {
  projects: Project[]
  currentProject: Project | null
  characters: Character[]
  relationships: Relationship[]
  plotPoints: PlotPoint[]
  researchItems: ResearchItem[]
  ideas: Idea[]
  createProject: (title: string, summary: string, coverImage?: string) => Project
  updateProject: (id: string, data: Partial<Project>) => void
  deleteProject: (id: string) => void
  setCurrentProject: (id: string | null) => void
  addCharacter: (character: Omit<Character, "id">) => Character
  updateCharacter: (id: string, data: Partial<Character>) => void
  deleteCharacter: (id: string) => void
  addRelationship: (relationship: Omit<Relationship, "id">) => Relationship
  updateRelationship: (id: string, data: Partial<Relationship>) => void
  deleteRelationship: (id: string) => void
  addPlotPoint: (plotPoint: Omit<PlotPoint, "id">) => PlotPoint
  updatePlotPoint: (id: string, data: Partial<PlotPoint>) => void
  deletePlotPoint: (id: string) => void
  addResearchItem: (researchItem: Omit<ResearchItem, "id">) => ResearchItem
  updateResearchItem: (id: string, data: Partial<ResearchItem>) => void
  deleteResearchItem: (id: string) => void
  addIdea: (title: string, description: string) => Idea
  updateIdea: (id: string, data: Partial<Idea>) => void
  deleteIdea: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProjectState] = useState<Project | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [plotPoints, setPlotPoints] = useState<PlotPoint[]>([])
  const [researchItems, setResearchItems] = useState<ResearchItem[]>([])
  const [ideas, setIdeas] = useState<Idea[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects")
    const storedCharacters = localStorage.getItem("characters")
    const storedRelationships = localStorage.getItem("relationships")
    const storedPlotPoints = localStorage.getItem("plotPoints")
    const storedResearchItems = localStorage.getItem("researchItems")
    const storedIdeas = localStorage.getItem("ideas")
    const storedCurrentProject = localStorage.getItem("currentProject")

    if (storedProjects) setProjects(JSON.parse(storedProjects))
    if (storedCharacters) setCharacters(JSON.parse(storedCharacters))
    if (storedRelationships) setRelationships(JSON.parse(storedRelationships))
    if (storedPlotPoints) setPlotPoints(JSON.parse(storedPlotPoints))
    if (storedResearchItems) setResearchItems(JSON.parse(storedResearchItems))
    if (storedIdeas) setIdeas(JSON.parse(storedIdeas))
    if (storedCurrentProject) setCurrentProjectState(JSON.parse(storedCurrentProject))
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters))
  }, [characters])

  useEffect(() => {
    localStorage.setItem("relationships", JSON.stringify(relationships))
  }, [relationships])

  useEffect(() => {
    localStorage.setItem("plotPoints", JSON.stringify(plotPoints))
  }, [plotPoints])

  useEffect(() => {
    localStorage.setItem("researchItems", JSON.stringify(researchItems))
  }, [researchItems])

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas))
  }, [ideas])

  useEffect(() => {
    if (currentProject) {
      localStorage.setItem("currentProject", JSON.stringify(currentProject))
    } else {
      localStorage.removeItem("currentProject")
    }
  }, [currentProject])

  const createProject = (title: string, summary: string, coverImage = "/placeholder.svg?height=300&width=200") => {
    const now = new Date().toISOString()
    const newProject: Project = {
      id: "project_" + Math.random().toString(36).substr(2, 9),
      title,
      summary,
      coverImage,
      chapters: 0,
      createdAt: now,
      updatedAt: now,
    }

    setProjects((prev) => [...prev, newProject])
    return newProject
  }

  const updateProject = (id: string, data: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...data, updatedAt: new Date().toISOString() } : project,
      ),
    )

    if (currentProject?.id === id) {
      setCurrentProjectState((prev) => (prev ? { ...prev, ...data, updatedAt: new Date().toISOString() } : null))
    }
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))

    if (currentProject?.id === id) {
      setCurrentProjectState(null)
    }

    // Also delete all related data
    setCharacters((prev) => prev.filter((char) => char.projectId !== id))
    setRelationships((prev) => prev.filter((rel) => rel.projectId !== id))
    setPlotPoints((prev) => prev.filter((plot) => plot.projectId !== id))
    setResearchItems((prev) => prev.filter((item) => item.projectId !== id))
  }

  const setCurrentProject = (id: string | null) => {
    if (id === null) {
      setCurrentProjectState(null)
      return
    }

    const project = projects.find((p) => p.id === id) || null
    setCurrentProjectState(project)
  }

  const addCharacter = (character: Omit<Character, "id">) => {
    const newCharacter: Character = {
      ...character,
      id: "char_" + Math.random().toString(36).substr(2, 9),
    }

    setCharacters((prev) => [...prev, newCharacter])
    return newCharacter
  }

  const updateCharacter = (id: string, data: Partial<Character>) => {
    setCharacters((prev) => prev.map((character) => (character.id === id ? { ...character, ...data } : character)))
  }

  const deleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((character) => character.id !== id))
    // Also delete relationships involving this character
    setRelationships((prev) => prev.filter((rel) => rel.character1Id !== id && rel.character2Id !== id))
  }

  const addRelationship = (relationship: Omit<Relationship, "id">) => {
    const newRelationship: Relationship = {
      ...relationship,
      id: "rel_" + Math.random().toString(36).substr(2, 9),
    }

    setRelationships((prev) => [...prev, newRelationship])
    return newRelationship
  }

  const updateRelationship = (id: string, data: Partial<Relationship>) => {
    setRelationships((prev) =>
      prev.map((relationship) => (relationship.id === id ? { ...relationship, ...data } : relationship)),
    )
  }

  const deleteRelationship = (id: string) => {
    setRelationships((prev) => prev.filter((relationship) => relationship.id !== id))
  }

  const addPlotPoint = (plotPoint: Omit<PlotPoint, "id">) => {
    const newPlotPoint: PlotPoint = {
      ...plotPoint,
      id: "plot_" + Math.random().toString(36).substr(2, 9),
    }

    setPlotPoints((prev) => [...prev, newPlotPoint])
    return newPlotPoint
  }

  const updatePlotPoint = (id: string, data: Partial<PlotPoint>) => {
    setPlotPoints((prev) => prev.map((plotPoint) => (plotPoint.id === id ? { ...plotPoint, ...data } : plotPoint)))
  }

  const deletePlotPoint = (id: string) => {
    setPlotPoints((prev) => prev.filter((plotPoint) => plotPoint.id !== id))
  }

  const addResearchItem = (researchItem: Omit<ResearchItem, "id">) => {
    const newResearchItem: ResearchItem = {
      ...researchItem,
      id: "research_" + Math.random().toString(36).substr(2, 9),
    }

    setResearchItems((prev) => [...prev, newResearchItem])
    return newResearchItem
  }

  const updateResearchItem = (id: string, data: Partial<ResearchItem>) => {
    setResearchItems((prev) =>
      prev.map((researchItem) => (researchItem.id === id ? { ...researchItem, ...data } : researchItem)),
    )
  }

  const deleteResearchItem = (id: string) => {
    setResearchItems((prev) => prev.filter((researchItem) => researchItem.id !== id))
  }

  const addIdea = (title: string, description: string) => {
    const newIdea: Idea = {
      id: "idea_" + Math.random().toString(36).substr(2, 9),
      title,
      description,
      createdAt: new Date().toISOString(),
    }

    setIdeas((prev) => [...prev, newIdea])
    return newIdea
  }

  const updateIdea = (id: string, data: Partial<Idea>) => {
    setIdeas((prev) => prev.map((idea) => (idea.id === id ? { ...idea, ...data } : idea)))
  }

  const deleteIdea = (id: string) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id))
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        characters,
        relationships,
        plotPoints,
        researchItems,
        ideas,
        createProject,
        updateProject,
        deleteProject,
        setCurrentProject,
        addCharacter,
        updateCharacter,
        deleteCharacter,
        addRelationship,
        updateRelationship,
        deleteRelationship,
        addPlotPoint,
        updatePlotPoint,
        deletePlotPoint,
        addResearchItem,
        updateResearchItem,
        deleteResearchItem,
        addIdea,
        updateIdea,
        deleteIdea,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}

