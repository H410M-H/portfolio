"use client"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, Code2, Mail, BellElectric } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface FloatingHeaderProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function FloatingHeader({ activeSection, onNavigate }: FloatingHeaderProps) {
  const [, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 max-w-2xl">
      <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-100/30 to-gray-100/20 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 transition-all duration-300 hover:border-gray-300/60">
        <NavButton
          section="home"
          active={activeSection === "home"}
          onClick={onNavigate}
          icon={Home}
        />
        <NavButton
          section="projects"
          active={activeSection === "projects"}
          onClick={onNavigate}
          icon={Briefcase}
        />
                <NavButton
          section="services"
          active={activeSection === "services"}
          onClick={onNavigate}
          icon={BellElectric}
        />
        <NavButton
          section="skills"
          active={activeSection === "skills"}
          onClick={onNavigate}
          icon={Code2}
        />
        <NavButton
          section="contact"
          active={activeSection === "contact"}
          onClick={onNavigate}
          icon={Mail}
        />
      </nav>
    </header>
  )
}

interface NavButtonProps {
  section: string
  active: boolean
  onClick: (section: string) => void
  icon: React.ComponentType<{ className?: string }>
}

function NavButton({ section, active, onClick, icon: Icon }: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-12 w-12 md:h-10 md:w-auto md:px-4 rounded-xl transition-all duration-300",
        "transform hover:scale-110 hover:bg-gray-100/20 active:scale-95",
        active 
          ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg"
          : "text-gray-800 hover:text-gray-900"
      )}
      onClick={() => onClick(section)}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn(
          "h-5 w-5 transition-colors",
          active ? "text-white" : "text-gray-800"
        )} />
        <span className={cn(
          "hidden md:inline text-sm font-medium",
          active ? "text-white" : "text-gray-800"
        )}>
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </span>
      </div>
    </Button>
  )
}