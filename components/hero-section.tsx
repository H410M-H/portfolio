"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MessageCircle, Instagram } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

const roles = ["Full Stack Developer", "Product Engineer", "TypeScript Specialist", "Creative Technologist"]

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="container text-center">
        <h1 className="mb-4 min-h-[1.2em] text-4xl font-bold md:text-6xl" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Building modern web applications with cutting-edge technologies
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => onNavigate("projects")}>View Projects</Button>
          <Button variant="outline" onClick={() => onNavigate("contact")}>
            Contact Me
          </Button>
          <Button variant="secondary" asChild>
            <a href="/Hassaan-Azam-CV.pdf" download="Hassaan-Azam-CV.pdf">
              Download CV
            </a>
          </Button>
        </div>
        <div className="flex justify-center mt-8 space-x-6">
          <Link href="https://github.com/H410M-H" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/hassaan-chouhan-53646a32a" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://wa.me/923016233609" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">WhatsApp</span>
            </Button>
          </Link>
          <Link href="https://instagram.com/hassaaan.74" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
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
