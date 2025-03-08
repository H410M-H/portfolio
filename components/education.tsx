import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"

interface EducationItem {
  degree: string
  institution: string
  location: string
  period: string
  description: string
  achievements?: string[]
}

export default function EducationSection() {
    const educationItems: EducationItem[] = [
        {
          degree: "Bachelor of Science in Information Technology",
          institution: "University of Gujrat (HH-Campus)",
          location: "Gujrat, Pakistan",
          period: "2020 - 2024",
          description: "Focused on Algorithms and System Architecture with minor in digital media & professional practices.",
          achievements: [
            "Dean's List for academic excellence",
            "Led the university's web development club",
            "Completed internship at Google",
          ],
        },
        {
          degree: "Intermediate in Computer Science",
          institution: "Quaid-e-Azam Divisional Public Scool & College",
          location: "Gujranwala, Pakistan",
          period: "2010 - 2019",
          description: "Advanced placement courses in Computer Science, Mathematics, and Physics.",
          achievements: ["Valedictorian", "National Merit Scholar", "First place in State Coding Competition"],
        },
      ]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <section id="education" className="py-20 bg-background/80 backdrop-blur-md">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"
        >
          Education Journey
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {educationItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-panel h-full border-white/10 hover:border-primary/30 transition-all group hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-semibold mb-1">
                        {item.degree}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {item.institution}
                      </p>
                      <Badge 
                        variant="outline" 
                        className="mt-3 bg-primary/5 text-primary border-primary/10"
                      >
                        {item.period}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    {item.achievements && (
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="font-medium mb-3 text-primary">Key Achievements</h4>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <li 
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-primary">▹</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}