"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { motion } from "framer-motion"

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("frontend")

  const skillsData = {
    frontend: [
      { name: "React", level: 90, color: "#3498db" },
      { name: "TypeScript", level: 85, color: "#2980b9" },
      { name: "Next.js", level: 80, color: "#8e44ad" },
      { name: "HTML/CSS", level: 95, color: "#27ae60" },
      { name: "Tailwind CSS", level: 85, color: "#16a085" },
      { name: "Three.js", level: 70, color: "#2c3e50" },
    ],
    backend: [
      { name: "Node.js", level: 85, color: "#e67e22" },
      { name: "Express", level: 80, color: "#d35400" },
      { name: "PostgreSQL", level: 75, color: "#3498db" },
      { name: "MongoDB", level: 80, color: "#4CAF50" },
      { name: "GraphQL", level: 70, color: "#e84393" },
      { name: "REST API", level: 90, color: "#0984e3" },
    ],
    other: [
      { name: "Git/GitHub", level: 90, color: "#f1c40f" },
      { name: "Docker", level: 75, color: "#3498db" },
      { name: "AWS", level: 70, color: "#FF9900" },
      { name: "CI/CD", level: 80, color: "#6c5ce7" },
      { name: "Testing", level: 75, color: "#e74c3c" },
      { name: "Agile/Scrum", level: 85, color: "#2ecc71" },
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <section id="skills" className="py-20 bg-background/80 backdrop-blur-md">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="glass-panel p-2 rounded-2xl backdrop-blur-lg border border-white/10">
              {["frontend", "backend", "other", "visualization"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="px-6 py-2 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {["frontend", "backend", "other"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid lg:grid-cols-2 gap-6"
              >
                {skillsData[tab as keyof typeof skillsData].map((skill) => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <Card className="glass-panel hover:bg-white/5 transition-colors border-white/10 rounded-2xl">
                      <CardContent className="pt-6">
                        <div className="flex justify-between mb-3">
                          <span className="font-medium text-lg">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-3 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}88 100%)`
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}

          <TabsContent value="visualization">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-[500px] w-full glass-panel rounded-3xl overflow-hidden border-white/10"
            >
              <Canvas camera={{ position: [0, 0, 8] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <OrbitControls 
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                  maxPolarAngle={Math.PI/2}
                  minPolarAngle={Math.PI/3}
                />

                {skillsData.frontend.map((skill, i) => (
                  <group
                    key={skill.name}
                    position={[
                      Math.cos((i / skillsData.frontend.length) * Math.PI * 2) * 4,
                      Math.sin((i / skillsData.frontend.length) * Math.PI * 2) * 4,
                      0,
                    ]}
                  >
                    <mesh>
                      <sphereGeometry args={[(skill.level / 100) * 0.8 + 0.2, 32]} />
                      <meshPhysicalMaterial 
                        color={skill.color}
                        metalness={0.4}
                        roughness={0.2}
                        clearcoat={0.8}
                      />
                    </mesh>
                    <Text
                      position={[0, 0, 1.2]}
                      fontSize={0.4}
                      color="white"
                      anchorX="center"
                      anchorY="middle"
                      font="/fonts/Inter_Regular.json"
                    >
                      {skill.name}
                    </Text>
                  </group>
                ))}
              </Canvas>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}