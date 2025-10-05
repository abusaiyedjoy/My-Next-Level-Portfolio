"use client";

import { Card, CardContent, } from "@/components/ui/card";
import {
  MapPin,
  User
} from "lucide-react";
import { aboutData } from "../staticData";

const ProfilePage = () => {

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#334DED] to-[#5865F2] flex items-center justify-center ring-4 ring-white/50 dark:ring-gray-800/50">
                <User className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {aboutData.personalInfo.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{aboutData.personalInfo.bio}</p>
              <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {aboutData.personalInfo.location}
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