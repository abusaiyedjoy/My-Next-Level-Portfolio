"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Background from "@/components/ui/background";
import {
  Home,
  ArrowLeft,
  FileQuestion,
  Compass,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const quickLinks = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      gradient: "from-[#334CEC] to-blue-600",
    },
    {
      icon: FileQuestion,
      label: "About",
      href: "/about",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Compass,
      label: "Projects",
      href: "/projects",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Mail,
      label: "Contact",
      href: "/contact",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <Background />
      <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[radial-gradient(#1d1d1d_1px,transparent_1px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#334CEC]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* 404 Number with Animation */}
              
              <h1 className="text-[150px] sm:text-[200px] lg:text-[250px] font-black leading-none relative">
                <span className="bg-gradient-to-r from-[#334CEC] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  404
                </span>
              </h1>

          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
              <div className="h-1 w-8 bg-[#334CEC] rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Oops! Looks like you've ventured into uncharted territory.{" "}
              <span className="text-[#334CEC] font-semibold">Don't worry</span>, even the best explorers get lost sometimes!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              onClick={() => router.back()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-gray-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>

            <motion.button
              onClick={() => router.push("/")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Or explore these pages:
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-[#334CEC]/20 transition-all duration-500 h-full group">
                    <CardContent className="p-6 flex flex-col items-center">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <link.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#334CEC] dark:group-hover:text-[#334CEC] transition-colors">
                        {link.label}
                      </span>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12"
          >
            <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
              ERROR_CODE: PAGE_NOT_FOUND_404
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;