"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProgressiveBlur } from "@/components/ui/progressiveBlur";
import Marquee from "@/components/ui/marquee";
import Background from "@/components/ui/background";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  GraduationCap,
  Code2,
} from "lucide-react";
import { aboutData } from "@/components/modules/staticData";
import { technologies } from "@/components/modules/staticData";
import Education from "@/components/modules/about/educationCard";
import Image from "next/image";

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AboutPage = () => {

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <Background />
      <motion.div
        className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section with Modern Design */}
        <motion.div className="text-center mb-16 mt-10 md:mt-8 lg:mt-6" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-[#334CEC] to-purple-600 dark:from-white dark:via-[#334CEC] dark:to-purple-400 bg-clip-text text-transparent mb-6">
            About Me
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
            <div className="h-1 w-8 bg-[#334CEC] rounded-full"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences with{" "}
            <span className="text-[#334CEC] font-semibold">passion</span>,{" "}
            <span className="text-purple-500 font-semibold">precision</span>,
            and <span className="text-blue-500 font-semibold">purpose</span>
          </p>
        </motion.div>

        {/* Personal Info Section - Enhanced Design */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-20"
          variants={itemVariants}
        >
          {/* Profile Card - Glassmorphism Design */}
          <div className="lg:col-span-1">
            <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-2xl hover:shadow-[#334CEC]/20 hover:shadow-3xl transition-all duration-500">
              <CardHeader className="text-center pb-4">
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#334CEC] via-purple-500 to-blue-400 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full"></div>
                  <Image
                    src="/profile.jpg"
                    width={128}
                    height={128}
                    alt={aboutData.personalInfo.name}
                    className="absolute inset-2 w-32 h-32 object-cover rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {aboutData.personalInfo.name}
                </CardTitle>
                <p className="text-[#334CEC] font-bold text-lg mt-2">
                  {aboutData.personalInfo.title}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {[
                  { icon: MapPin, text: aboutData.personalInfo.location },
                  { icon: Mail, text: aboutData.personalInfo.email },
                  { icon: Phone, text: aboutData.personalInfo.phone },
                  { icon: Calendar, text: aboutData.personalInfo.availability },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <item.icon className="w-5 h-5 text-[#334CEC] group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.text}
                    </span>
                  </motion.div>
                ))}

                <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {[
                    { icon: Github, href: aboutData.socialLinks.github },
                    { icon: Linkedin, href: aboutData.socialLinks.linkedin },
                    { icon: Twitter, href: aboutData.socialLinks.twitter },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#334CEC] to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-[#334CEC]/50 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bio and Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Card */}
            <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span
                    className="text-4xl animate-spin text-[#334CEC]"
                  >
                    ✱
                  </span>
                  <span className="pl-1 text-gray-200"> WHO I AM ?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg">
                  {aboutData.personalInfo.bio}
                </p>
              </CardContent>
            </Card>
            <div className="lg:grid md:grid-cols-2 gap-6 hidden">
            <Education/>
          </div>
          </div>
        </motion.div>

        {/* Academic Background Section */}
        <motion.div className="mb-20 lg:hidden" variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-[#334CEC] to-purple-600 dark:from-white dark:via-[#334CEC] dark:to-purple-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-[#334CEC]" />
              Academic Background
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
              <div className="h-1 w-6 bg-[#334CEC] rounded-full"></div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Education/>
          </div>
        </motion.div>

        {/* Technical Proficiencies Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-[#334CEC] to-purple-600 dark:from-white dark:via-[#334CEC] dark:to-purple-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
              <Code2 className="w-8 h-8 text-[#334CEC]" />
              Technical Proficiencies
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
              <div className="h-1 w-6 bg-[#334CEC] rounded-full"></div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
            </div>
          </div>

        {/* Technology Marquee */}
        <div className="pt-12 relative px-4">
          <Marquee className="[--marquee-duration:25s]">
            {technologies.map((tech) => (
              <div className="flex px-8 items-center" key={tech.name}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#334CEC]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    width={80}
                    height={80}
                    className=" w-20 relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </Marquee>

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
            direction="right"
            blurIntensity={1}
          />
        </div>
        
      </motion.div>
    </div>
  );
};

export default AboutPage;