import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { aboutData } from "../staticData";
import {
  GraduationCap,
  Award,
  Calendar
} from "lucide-react";

const Education = () =>{
    return(
        <>
        {aboutData?.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <Card className="border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl  h-full group">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div
                                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#334CEC] to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                              >
                                <GraduationCap className="w-7 h-7 text-white" />
                              </div>
        
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                                  {edu.degree}
                                </h3>
                                <p className="text-[#334CEC] font-semibold mb-1">
                                  {edu.institution}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {edu.year}
                                  </span>
                                  <span className="font-semibold text-[#334CEC]">
                                    GPA: {edu.gpa}
                                  </span>
                                </div>
        
                                <div className="space-y-2">
                                  {edu.achievements.map((achievement, i) => (
                                    <motion.div
                                      key={i}
                                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                                      initial={{ opacity: 0, x: -10 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.3 + i * 0.1 }}
                                    >
                                      <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                      {achievement}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
        </>
    )
};
export default Education;