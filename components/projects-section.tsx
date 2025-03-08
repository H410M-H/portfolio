import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import { motion } from "framer-motion"
import { Stars } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <Canvas>
          <Stars radius={100} depth={50} count={500} factor={4} />
        </Canvas>
      </div>

      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ProjectCard
              title="School Web App"
              description="Modern school website with real-time updates and parent portal"
              technologies={["Next.js 15", "TypeScript", "Prisma", "trpc"]}
              imageUrl="https://res.cloudinary.com/dvvbxrs55/image/upload/v1741430719/download_nsirue.png"
              githubUrl="https://github.com/H410M-H/msns-home"
              liveUrl="https://home-msns.vercel.app/"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ProjectCard
              title="Learning Management System"
              description="Scalable and secure LMS with admin dashboard, student portal, and teacher tools"
              technologies={["React", "Node.js", "GCP", "PostgreSQL"]}
              imageUrl="https://res.cloudinary.com/dvvbxrs55/image/upload/v1741438631/Screenshot_2025_03_08-1_f1qerz.jpg"
              githubUrl="https://github.com/H410M-H/msns-build-2.0"
              liveUrl="https://home-msns.vercel.app/"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ProjectCard
              title="Product Hunting Tool"
              description="GPT-4 powered content daraz hunt studio with sales forecasting"
              technologies={["Next.js", "Python", "LLMs", "Redis"]}
              imageUrl="https://res.cloudinary.com/dvvbxrs55/image/upload/v1741446881/Project_Documentation_qaxvbh.jpg"
              githubUrl=""
              liveUrl=""
            />
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white px-8 py-6 rounded-xl"
          >
            Explore Full Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  )
}