"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls, ScrollControls } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import GeometricBackground from "@/components/geometric-background"
import FloatingHeader from "@/components/floating-header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import FooterSection from "@/components/footer-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  }), [])

  const backgroundOpacity = useTransform(scrollYProgress, [0, 5], [1, 0.3])

  const handleNavigate = (section: string) => {
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
    setActiveSection(section)
  }

  // Scroll-based section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    // Get current refs from memoized object
    const currentRefs = Object.values(sectionRefs).map(ref => ref.current)

    currentRefs.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => {
      currentRefs.forEach(ref => {
        if (ref) observer.unobserve(ref)
      })
      observer.disconnect()
    }
  }, [sectionRefs]) // Now safe to include in dependencies

  return (
    <main className="relative min-h-screen">
      {/* 3D Background with Scroll Controls */}
      <div className="fixed inset-0 -z-10">
        <Canvas>
          <ScrollControls pages={5}>
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <GeometricBackground />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI/2}
              minPolarAngle={Math.PI/3}
            />
          </ScrollControls>
        </Canvas>
      </div>

      {/* Floating Header with Glass Effect */}
      <FloatingHeader activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Sections with Animated Transitions */}
      <motion.div 
        className="relative space-y-24 pb-24"
        style={{ opacity: backgroundOpacity }}
      >
        <motion.section
          ref={sectionRefs.home}
          id="home"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen pt-32 px-6"
        >
          <HeroSection onNavigate={handleNavigate} />
        </motion.section>

        <motion.section
          ref={sectionRefs.about}
          id="about"
          className="glass-panel max-w-6xl mx-auto p-8 rounded-3xl"
        >
          <AboutSection />
        </motion.section>

        <motion.section
          ref={sectionRefs.projects}
          id="projects"
          className="glass-panel max-w-6xl mx-auto p-8 rounded-3xl"
        >
          <ProjectsSection />
        </motion.section>

        <motion.section
          ref={sectionRefs.skills}
          id="skills"
          className="glass-panel max-w-6xl mx-auto p-8 rounded-3xl"
        >
          <SkillsSection />
        </motion.section>

        <motion.section
          ref={sectionRefs.contact}
          id="contact"
          className="glass-panel max-w-6xl mx-auto p-8 rounded-3xl"
        >
          <ContactSection />
        </motion.section>
      </motion.div>

      <FooterSection />
    </main>
  )
}