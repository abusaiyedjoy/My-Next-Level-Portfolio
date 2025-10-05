"use client";

import Button from "@/components/ui/button";
import NewItemsLoading from "@/components/ui/loading";
import WordAnimator from "@/components/ui/word-animator";
import Background from "./../../components/ui/background";
import Image from "next/image";

const Home = () => {
  const words = ["Full Stack ", "Frontend ", "Backend ", "Modern"];

  return (
    <div>
      <Background />
      <section className="pt-16 sm:pt-20 min-h-screen overflow-hidden relative pb-6">

        {/* Two Section Layout */}
        <div className="relative z-[2] h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 sm:gap-10 lg:gap-12 items-center min-h-[calc(100vh-8rem)] py-8 sm:py-12">
              {/* Left Text Section */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 lg:pr-8 order-2 lg:order-1">
                <NewItemsLoading />
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold tracking-tight text-gray-300 leading-tight">
                  <span className="block mb-2">
                    Building Digital Solutions,
                  </span>
                  <span className="flex flex-wrap items-center gap-2">
                    Creating{" "}
                    <WordAnimator
                      words={words}
                      duration={5}
                      className="italic w-fit px-2 sm:px-3 dark:bg-gray-800 bg-gray-200 dark:border-neutral-800 border-neutral-200"
                    />{" "}
                    Excellence.
                  </span>
                </h1>

                <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                  Passionate full-stack developer specializing in{" "}
                  <strong>React</strong>, <strong>Node.js</strong>,
                  <strong> TypeScript</strong>, and <strong>Next.js</strong>. I
                  craft scalable web applications from concept to deployment,
                  turning complex ideas into elegant, user-friendly solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <Button title={"📄 Download Resume"} />
                </div>
              </div>

              {/* Right Profile Section */}
              <div className="flex justify-center lg:justify-end items-center relative order-2">
                <div className="relative group w-full max-w-sm sm:max-w-md">
                  {/* Animated Background Elements */}
                  <div className="hidden sm:block absolute -inset-16 opacity-30">
                    {/* Floating orbs */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-[#334CEC]/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 right-0 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-300"></div>

                    {/* Geometric shapes */}
                    <div className="absolute top-8 -left-8 w-16 h-16 border-2 border-[#334CEC]/40 rotate-12 animate-spin-slow"></div>
                    <div className="absolute top-20 -right-4 w-12 h-12 bg-gradient-to-br from-[#334CEC]/30 to-purple-500/30 rotate-45 animate-bounce-slow"></div>
                    <div className="absolute -bottom-8 left-16 w-14 h-14 border-2 border-purple-400/30 rounded-full animate-ping-slow"></div>

                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(51,76,236,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,76,236,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>

                  {/* Main profile container */}
                  <div className="relative">
                    {/* Professional card-style container */}
                    <div className="relative transform group-hover:scale-[1.02] transition-all duration-700 ease-out">
                      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl p-5 sm:p-7 border border-white/20 shadow-2xl overflow-hidden">
                        {/* Profile image with modern styling */}
                        <div className="relative mb-4">
                          {/* Image container with floating effect */}
                          <div className="relative w-full aspect-[4/5] sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[400px] rounded-2xl overflow-hidden mx-auto shadow-2xl group-hover:shadow-[0_20px_60px_-15px_rgba(51,76,236,0.5)] transition-all duration-700">
                            {/* Rotating gradient border */}
                            <div className="absolute -inset-[2px] bg-gradient-to-r from-[#334CEC] via-purple-500 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-spin-very-slow"></div>

                            {/* Image wrapper */}
                            <div className="relative bg-black rounded-2xl overflow-hidden h-full w-full">
                              <Image
                                src="/profile.png"
                                width={100}
                                height={100}
                                alt="Professional Profile"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                              />

                              {/* Status indicator with pulse */}
                              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <div className="relative">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                                </div>
                                <span className="text-white text-xs font-semibold tracking-wide">
                                  Available
                                </span>
                              </div>

                              {/* Corner accents */}
                              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#334CEC]/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#334CEC]/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            </div>
                          </div>

                          {/* Floating particles */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                            <div className="absolute top-10 left-5 w-1 h-1 bg-[#334CEC] rounded-full animate-float-1"></div>
                            <div className="absolute top-20 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float-2"></div>
                            <div className="absolute bottom-24 left-12 w-1 h-1 bg-blue-400 rounded-full animate-float-3"></div>
                            <div className="absolute bottom-32 right-6 w-1 h-1 bg-[#334CEC] rounded-full animate-float-4"></div>
                          </div>
                        </div>

                        {/* Professional info card with glassmorphism */}
                        <div className="relative text-center space-y-2 sm:space-y-3 px-2">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#334CEC]/5 to-transparent rounded-2xl"></div>

                          <div className="relative">
                            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent group-hover:from-[#334CEC] group-hover:via-blue-800 group-hover:to-blue-400 transition-all duration-700">
                              Full Stack Developer
                            </h3>

                            <div className="flex items-center justify-center space-x-2 mt-2">
                              {["Frontend", "Backend", "Full Stack"].map(
                                (skill, index) => (
                                  <span
                                    key={index}
                                    className="text-xs sm:text-sm text-white/70 font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#334CEC]/20 group-hover:border-[#334CEC]/30 group-hover:text-white/90 transition-all duration-500"
                                    style={{
                                      transitionDelay: `${index * 100}ms`,
                                    }}
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
