"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Background from "@/components/ui/background";
import {
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Globe,
  CheckCircle2,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { quickContacts } from "@/components/modules/staticData";
import { contactInfo } from '@/components/modules/staticData';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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

const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (err: any) {
      console.error("Error sending email:", err);
      setError(
        err.message || "Failed to send message. Please try contacting me directly via email or social media."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <motion.div
        className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 max-w-7xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16 mt-10 md:mt-8 lg:mt-6" variants={itemVariants}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-[#334CEC] to-purple-600 dark:from-white dark:via-[#334CEC] dark:to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
            <div className="h-1 w-8 bg-[#334CEC] rounded-full"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat?{" "}
            <span className="text-[#334CEC] font-semibold">Let's connect</span> and{" "}
            <span className="text-purple-500 font-semibold">build something amazing</span> together!
          </p>
        </motion.div>

        {/* Quick Contact Cards */}
        <motion.div className="grid md:grid-cols-3 gap-6 mb-16" variants={itemVariants}>
          {quickContacts?.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-[#334CEC]/20 transition-all duration-500 h-full group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#334CEC] dark:group-hover:text-[#334CEC] transition-colors">
                      {contact.title}
                    </h3>
                    <p className="text-[#334CEC] font-semibold mb-1">
                      {contact.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {contact.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="border-none py-10 bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Send className="w-7 h-7 text-[#334CEC]" />
                  Send Me a Message
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 my-2">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </CardHeader>

              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-semibold">
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          placeholder="John Doe"
                          className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600 dark:text-red-400">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-semibold">
                          Your Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          placeholder="john@example.com"
                          className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 dark:text-red-400">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 font-semibold">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        {...register("subject", {
                          required: "Subject is required",
                          minLength: {
                            value: 5,
                            message: "Subject must be at least 5 characters",
                          },
                        })}
                        placeholder="Project Inquiry"
                        className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50"
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-semibold">
                        Your Message *
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                        placeholder="Tell me about your project..."
                        rows={10}
                        className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50 resize-none"
                      />
                      {errors.message && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Clock, label: "Availability", value: contactInfo?.availability },
                  { icon: Globe, label: "Timezone", value: contactInfo?.timezone },
                  { icon: MessageCircle, label: "Response Time", value: contactInfo?.responseTime },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#334CEC] to-purple-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-to-br from-[#334CEC]/10 to-purple-500/10 dark:from-[#334CEC]/20 dark:to-purple-500/20 backdrop-blur-xl shadow-xl">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-4xl mb-3"
                >
                  ☕
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Coffee Chat?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I'm always up for a virtual coffee chat to discuss ideas and opportunities!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="w-7 h-7 text-[#334CEC]" />
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Location
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Foy's Lake, Chattogram, Bangladesh
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[450px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.6984744853843!2d91.79660731495856!3d22.36988898530535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad275c8ec71b13%3A0x93cc9ef1a0732b43!2sFoy&#39;s%20Lake!5e0!3m2!1sen!2sbd!4v1696234567890!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-lg"
                ></iframe>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg p-4 shadow-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#334CEC] to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        Open to Remote Work
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Available for collaboration worldwide • Based in Chattogram, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;