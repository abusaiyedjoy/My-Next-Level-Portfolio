"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";
import { aboutData } from "../staticData";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="border-none w-full md:w-[70%] mx-auto bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6">
            {/* Profile Picture */}
            <div className="relative w-36 h-36 mx-auto">
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

            {/* Profile Info */}
            <div className="flex-1 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {aboutData.personalInfo.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {aboutData.personalInfo.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {aboutData.personalInfo.location}
                </div>
                <div className="flex items-center gap-1">
                  🟢{aboutData.personalInfo.availability}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
