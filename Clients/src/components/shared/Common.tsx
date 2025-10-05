"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Button from "../ui/button";

const Common = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf"; 
    link.download = "Abu_Saiyed_Joy_Resume.pdf";
    link.click();
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative container mx-auto text-center mt-12 md:mt-16 p-10 rounded-3xl bg-gradient-to-br dark:from-white/10 dark:to-white/5 border border-[#334CEC]/30 shadow-xl backdrop-blur-xl"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* glowing background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#334CEC]/40 via-transparent to-[#0f172a] blur-3xl opacity-40"></div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
        Let’s Work <span className="text-[#334CEC]">Together</span>
      </h2>

      <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        Have an exciting project in mind? 🚀 I’d love to collaborate and help bring your vision to life with modern web technologies and creative design.
      </p>

      <motion.div
        className="flex flex-col sm:flex-row gap-5 justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Button onClick={handleDownload} title="💬 Contact Me" />
        <Button onClick={handleDownload} title="📄 Download Resume" />
      </motion.div>
    </motion.div>
  );
};

export default Common;
