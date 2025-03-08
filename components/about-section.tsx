"use client"

import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { Float, Environment, OrbitControls } from "@react-three/drei"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900 rounded-xl">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Full-size image container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-full w-full flex items-center justify-center"
          >
            {/* 3D Element as background effect */}
            <div className="absolute inset-0 -z-10">
              <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                  <mesh>
                    <torusKnotGeometry args={[1, 0.3, 256, 32]} />
                    <meshPhysicalMaterial 
                      color="#4F46E5" 
                      metalness={0.4}
                      roughness={0.2}
                      emissive="#6366F1"
                      emissiveIntensity={0.5}
                    />
                  </mesh>
                </Float>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                <Environment preset="sunset" />
              </Canvas>
            </div>

            {/* Enlarged Profile Image */}
            <motion.div 
              className="relative h-96 w-96 md:h-full md:w-full max-w-md"
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <div className="w-full h-full rounded-xl overflow-hidden border-4 border-white/30 shadow-xl shadow-purple-900/30">
                <Image
                  src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1738086745/i866ivolo6anlffgxwib.png"
                  alt="Hassaan"
                  width={200}
                  height={300}
                  className="w-auto h-auto object-fill"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 rounded-3xl space-y-6 backdrop-blur-sm bg-white/5 border border-white/10"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Hi, I am Hassaan 👋
            </h3>
            
            <p className="text-lg text-gray-200 leading-relaxed">
              I am a full-stack developer passionate about crafting modern web experiences. 
              With <span className="text-purple-300">5+ years</span> of expertise, I bridge the gap between 
              beautiful interfaces and robust backend systems.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-300">
                <span className="w-2 h-2 bg-current rounded-full" />
                <span>React & Next.js Specialist</span>
              </div>
              <div className="flex items-center gap-3 text-purple-300">
                <span className="w-2 h-2 bg-current rounded-full" />
                <span>Node.js & TypeScript Expert</span>
              </div>
              <div className="flex items-center gap-3 text-indigo-300">
                <span className="w-2 h-2 bg-current rounded-full" />
                <span>GCP & Vercel Certified</span>
              </div>
            </div>

            <Button 
              className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              size="lg"
            >
              Download Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}