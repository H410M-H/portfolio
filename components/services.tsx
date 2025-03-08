"use client"

import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Paintbrush, Video, FileText, Share2, Music, BarChart3, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface Service {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  detailedDescription: string
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const services: Service[] = [
    {
      title: "Graphic Design",
      description: "Creative visual solutions for your brand identity, marketing materials, and digital assets.",
      icon: <Paintbrush className="h-10 w-10 text-primary" />,
      features: ["Brand Identity", "UI/UX Design", "Print Materials", "Social Media Graphics", "Illustrations"],
      detailedDescription:
        "Comprehensive graphic design services tailored to your brand's unique identity and goals. From logo design and brand guidelines to marketing materials and digital assets, I create visually compelling designs that communicate your message effectively and leave a lasting impression on your audience. My design process involves understanding your brand values, researching your industry, and creating custom solutions that stand out in the market.",
    },
    {
      title: "Video Editing",
      description: "Professional video editing services for promotional content, tutorials, and social media.",
      icon: <Video className="h-10 w-10 text-primary" />,
      features: ["Commercial Videos", "Social Media Content", "Motion Graphics", "Color Grading", "Audio Mixing"],
      detailedDescription:
        "End-to-end video editing services that transform raw footage into polished, engaging content. I specialize in creating compelling narratives through careful editing, adding professional transitions, incorporating motion graphics, and ensuring high-quality audio. Whether you need promotional videos for your business, content for social media, or educational tutorials, I deliver videos that capture attention and convey your message effectively across all platforms.",
    },
    {
      title: "Content Writing",
      description: "Engaging and SEO-optimized content for websites, blogs, and marketing materials.",
      icon: <FileText className="h-10 w-10 text-primary" />,
      features: ["Blog Posts", "Website Copy", "Technical Writing", "Email Newsletters", "Product Descriptions"],
      detailedDescription:
        "Strategic content writing services that combine compelling storytelling with SEO best practices. I create clear, engaging, and purposeful content that resonates with your target audience while improving your search engine visibility. From website copy and blog posts to technical documentation and marketing materials, my content is researched, well-structured, and aligned with your brand voice and business objectives.",
    },
    {
      title: "Social Media Marketing",
      description: "Strategic social media campaigns to increase brand awareness and engagement.",
      icon: <Share2 className="h-10 w-10 text-primary" />,
      features: [
        "Campaign Strategy",
        "Content Creation",
        "Audience Growth",
        "Performance Analysis",
        "Paid Advertising",
      ],
      detailedDescription:
        "Comprehensive social media marketing services that build your brand presence and drive meaningful engagement. I develop tailored strategies for each platform, create compelling content calendars, manage community interactions, and implement targeted advertising campaigns. By analyzing performance metrics and staying current with platform trends, I continuously optimize your social media presence to achieve your business goals and connect with your audience effectively.",
    },
    {
      title: "Music Production",
      description: "Custom music composition and production for various media projects.",
      icon: <Music className="h-10 w-10 text-primary" />,
      features: ["Original Composition", "Sound Design", "Mixing & Mastering", "Podcast Audio", "Jingles & Intros"],
      detailedDescription:
        "Professional music production services covering every aspect of the creative and technical process. I offer original composition, arrangement, recording, mixing, and mastering to create high-quality audio for your projects. Whether you need background music for videos, sound design for interactive media, podcast production, or commercial jingles, I deliver polished audio that enhances your content and creates the right emotional impact for your audience.",
    },
    {
      title: "Social Media Management",
      description: "Comprehensive management of your social media presence across multiple platforms.",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      features: [
        "Account Management",
        "Content Scheduling",
        "Community Engagement",
        "Analytics Reporting",
        "Growth Strategy",
      ],
      detailedDescription:
        "End-to-end social media management services that maintain a consistent and engaging presence for your brand. I handle content creation, scheduling, community management, and performance tracking across all relevant platforms. By developing platform-specific strategies, responding to audience interactions, and continuously analyzing results, I help you build meaningful relationships with your followers and achieve your social media objectives while saving you time and resources.",
    },
  ]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  const badgeColors = [
    'from-primary to-purple-500',
    'from-cyan-400 to-blue-500',
    'from-green-400 to-emerald-500'
  ]

  return (
    <section id="services" className="py-20 backdrop-blur-md relative overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-20" />

      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
        >
          Professional Services
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass-panel h-full flex flex-col border-white/20 hover:border-primary/40 transition-all group hover:shadow-lg">
                <CardHeader className="p-4 md:p-6">
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="p-3 md:p-4 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl backdrop-blur-sm">
                      {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, {
                        className: "h-6 w-6 md:h-8 md:w-8 text-primary transition-transform group-hover:scale-110"
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-center font-semibold">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm md:text-base text-center mt-2">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-grow p-4 md:p-6 pt-0">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.features.map((feature, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className={`text-xs md:text-sm font-medium bg-gradient-to-br ${badgeColors[i % 3]} bg-clip-text text-transparent border-white/20 hover:border-primary/40`}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 md:p-6 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full gap-2 text-primary hover:bg-primary/10 text-sm md:text-base"
                        onClick={() => setSelectedService(service)}
                      >
                        Explore Details
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] md:max-w-2xl border-white/20 backdrop-blur-xl">
                      <DialogHeader>
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                          <div className="p-3 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl">
                            {selectedService?.icon}
                          </div>
                          <DialogTitle className="text-2xl md:text-3xl text-center md:text-left bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            {selectedService?.title}
                          </DialogTitle>
                        </div>
                      </DialogHeader>
                      
                      <div className="space-y-6 text-sm md:text-base">
                        <p className="text-foreground leading-relaxed">
                          {selectedService?.detailedDescription}
                        </p>
                        
                        <div className="border-t border-white/20 pt-6">
                          <h4 className="font-semibold text-lg mb-4">Key Features</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedService?.features.map((feature, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                                  <ChevronRight className="h-4 w-4 text-primary" />
                                </div>
                                <span className="flex-1">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}