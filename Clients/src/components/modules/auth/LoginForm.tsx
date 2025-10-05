"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Background from "@/components/ui/background";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      signIn("credentials", {
        ...values,
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center mt-10 p-4">
      {/* Background */}
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card>
          <CardHeader className="text-center px-4 sm:px-6 pt-4">
            {/* Logo */}
            <Link href="/" className="flex justify-center items-center gap-2">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            </Link>
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-[#334CEC] to-purple-600 dark:from-white dark:via-[#334CEC] dark:to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 px-2">
              Sign in to access your dashboard
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#334CEC] rounded-full"></div>
              <div className="h-1 w-5 sm:w-6 bg-[#334CEC] rounded-full"></div>
              <div className="h-1 w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#334CEC] rounded-full"></div>
            </div>
          </CardHeader>

          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 pb-6 sm:pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-5"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#334CEC]" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50 h-11 sm:h-12 text-sm sm:text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#334CEC]" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50 h-11 sm:h-12 pr-11 sm:pr-12 text-sm sm:text-base"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#334CEC] transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs sm:text-sm text-[#334CEC] hover:text-purple-600 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className={`w-full px-4 sm:px-6 py-3 cursor-pointer sm:py-4 rounded-lg bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all text-sm sm:text-base ${
                    form.formState.isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                  whileHover={{ scale: form.formState.isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: form.formState.isSubmitting ? 1 : 0.98 }}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                      Sign In
                    </>
                  )}
                </motion.button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-4"
        >
          <p>Protected by Abu Saiyed Joy</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
