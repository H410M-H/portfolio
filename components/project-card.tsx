import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  githubUrl: string
  liveUrl: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-background/20 backdrop-blur-sm">
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={imageUrl || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <Badge 
                key={tech} 
                variant="outline"
                className={`border-opacity-50 ${
                  [
                    'text-blue-400 border-blue-400/30',
                    'text-purple-400 border-purple-400/30',
                    'text-green-400 border-green-400/30'
                  ][index % 3]
                }`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2 transition-all hover:bg-primary/10 hover:border-primary/30"
            asChild
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span>Code</span>
            </Link>
          </Button>
          <Button 
            size="sm"
            className="w-full gap-2 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
            asChild
          >
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span>Demo</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}