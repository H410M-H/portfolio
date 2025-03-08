"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "@/components/contact-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactSection() {
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

  const socialLinks = [
    { icon: <Mail className="h-5 w-5" />, href: "mailto:hassaanazam7@gmail.com" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/H410M-H" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/hassaan-chouhan-53646a32a" },
    { icon: <Phone className="h-5 w-5" />, href: "https://wa.me/923016233609" }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"
        >
          Get In Touch
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="glass-panel border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="pt-8">
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-2xl border-white/10">
              <h3 className="text-2xl font-semibold mb-6">Lets Connect</h3>
              <p className="text-muted-foreground mb-8">
                Whether you have a project in mind or just want to say hello, 
                I shall do my best to get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <Link href="mailto:hassaanazam7@gmail.com" className="hover:text-primary transition-colors">
                      hassaanazam7@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="hover:text-primary transition-colors">Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="flex gap-6 mt-8">
                  {socialLinks.map((link, index) => (
                    <Button
                      key={index}
                      asChild
                      variant="outline"
                      className="w-12 h-12 p-0 rounded-full border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all"
                    >
                      <Link href={link.href} target="_blank">
                        {link.icon}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass-panel p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="font-medium">Available for opportunities</p>
                  <p className="text-sm text-muted-foreground">Typically responds within 2 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}