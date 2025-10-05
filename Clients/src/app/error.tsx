"use client";

import Background from "@/components/ui/background";
import { Home, RefreshCw, Mail, AlertCircle } from "lucide-react";

const ErrorPage = () => {
  const handleReset = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <Background />
      {/* Error Content */}
      <div className="relative z-10 max-w-3xl w-full">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
          Oops! Something Went Wrong
        </h1>

        {/* Error Description */}
        <p className="text-gray-400 text-center mb-8 text-base sm:text-lg max-w-2xl mx-auto">
          We encountered an unexpected error. Don't worry, it's not your fault.
          Our team has been notified and we're working on fixing it.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleReset}
            className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center justify-center gap-3 border border-white/20 hover:border-white/30"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <button
            onClick={handleGoHome}
            className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#334DED] to-[#5865F2] hover:from-[#2d42d4] hover:to-[#4a54dc] text-white font-semibold transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#334DED]/20"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Back to Home
          </button>
        </div>

        {/* Support Information */}
        <div className="text-center border-t border-white/10 pt-6">
          <p className="text-gray-400 text-sm mb-3">
            If this problem persists, please contact support
          </p>
          <a
            href="mailto:abusaiyedjoy1@email.com"
            className="inline-flex items-center gap-2 text-[#334DED] hover:text-[#5865F2] font-semibold text-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            abusaiyedjoy1@email.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
