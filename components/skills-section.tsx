"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Code, Database, Layout, LineChart, Cloud, Shield, Smartphone, Cpu } from "lucide-react"

interface SkillArea {
  title: string
  description: string
  icon: React.ReactNode
  skills: string[]
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("development")

  const skillAreas: Record<string, SkillArea[]> = {
    development: [
      {
        title: "Frontend Development",
        description: "Building responsive, accessible interfaces with modern frameworks.",
        icon: <Layout className="h-8 w-8 text-primary" />,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Redux"],
      },
      {
        title: "Backend Development",
        description: "Developing scalable server-side applications and APIs.",
        icon: <Database className="h-8 w-8 text-primary" />,
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL", "REST API"],
      },
      {
        title: "Full Stack Solutions",
        description: "End-to-end development with seamless integration.",
        icon: <Code className="h-8 w-8 text-primary" />,
        skills: ["MERN Stack", "JAMstack", "Serverless", "CI/CD", "Testing"],
      },
      {
        title: "Cloud & DevOps",
        description: "Cloud deployment and infrastructure management.",
        icon: <Cloud className="h-8 w-8 text-primary" />,
        skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
      },
    ],
    specialized: [
      {
        title: "Data Visualization",
        description: "Creating interactive data dashboards and visualizations.",
        icon: <LineChart className="h-8 w-8 text-primary" />,
        skills: ["D3.js", "Chart.js", "Tableau", "Data Processing", "Dashboards"],
      },
      {
        title: "Application Security",
        description: "Implementing robust security measures.",
        icon: <Shield className="h-8 w-8 text-primary" />,
        skills: ["OAuth", "JWT", "HTTPS", "Encryption", "Security Audits"],
      },
      {
        title: "Mobile Development",
        description: "Cross-platform mobile applications.",
        icon: <Smartphone className="h-8 w-8 text-primary" />,
        skills: ["React Native", "Expo", "Mobile UI/UX", "Push Notifications"],
      },
      {
        title: "AI Integration",
        description: "Incorporating ML capabilities into applications.",
        icon: <Cpu className="h-8 w-8 text-primary" />,
        skills: ["OpenAI API", "TensorFlow.js", "NLP", "Computer Vision"],
      },
    ],
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
          Technical Expertise
        </motion.h2>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-12">
            <TabsList className="glass-panel p-2 rounded-2xl backdrop-blur-lg border border-white/10">
              <TabsTrigger 
                value="development" 
                className="px-6 py-2 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Development
              </TabsTrigger>
              <TabsTrigger 
                value="specialized" 
                className="px-6 py-2 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Specialized
              </TabsTrigger>
            </TabsList>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(skillAreas).map(([key, areas]) => (
              <TabsContent key={key} value={key}>
                <div className="grid lg:grid-cols-2 gap-6">
                  {areas.map((area, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="glass-panel border-white/10 hover:border-primary/30 transition-all">
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                              {area.icon}
                            </div>
                            <div>
                              <CardTitle className="text-2xl">{area.title}</CardTitle>
                              <p className="text-muted-foreground mt-2">{area.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {area.skills.map((skill, i) => (
                              <Badge 
                                key={i} 
                                variant="outline"
                                className="bg-primary/5 text-primary border-primary/10"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </motion.div>
        </Tabs>
      </div>
    </section>
  )
}