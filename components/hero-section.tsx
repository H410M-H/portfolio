"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="container text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Full Stack Developer</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Building modern web applications with cutting-edge technologies
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => onNavigate("projects")}>View Projects</Button>
          <Button variant="outline" onClick={() => onNavigate("contact")}>
            Contact Me
          </Button>
        </div>
        <div className="flex justify-center mt-8 space-x-6">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="mailto:hassaanazam7@gmail.com">
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

