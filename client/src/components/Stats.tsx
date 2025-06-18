import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface StatItem {
  value: string;
  title: string;
  description: string;
}

const Stats = () => {
  const [selectedStat, setSelectedStat] = useState<number | null>(null);

  const stats: StatItem[] = [
    {
      value: "8+",
      title: "năm phát triển",
      description: "Hơn 8 năm kinh nghiệm trong ngành cung cấp giải pháp quản lý và setup quán cà phê/trà sữa."
    },
    {
      value: "50+",
      title: "tỉnh thành đã setup quán",
      description: "Đã triển khai hơn 50 tỉnh thành trên toàn quốc với đội ngũ kỹ thuật chuyên nghiệp."
    },
    {
      value: "500+",
      title: "Quán cà phê tin tưởng đồng hành",
      description: "Hơn 500 quán cà phê đã và đang sử dụng giải pháp của chúng tôi để vận hành hiệu quả."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex-1"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setSelectedStat(index)}
                className="w-full bg-white shadow rounded-lg p-6 md:p-8 text-center cursor-pointer hover:shadow-md transition-all h-full"
              >
                <div className="text-5xl md:text-7xl font-bold text-emerald-600 mb-4">{stat.value}</div>
                <div className="text-gray-800 font-medium text-lg">
                  {index === 0 && "năm phát triển"}
                  {index === 1 && "tỉnh thành"}
                  {index === 2 && "Quán cà phê"}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  {index === 0 && ""}
                  {index === 1 && "đã setup quán"}
                  {index === 2 && "tin tưởng đồng hành"}
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedStat !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStat(null)}
            >
              <motion.div
                className="bg-white rounded-lg max-w-md w-full p-8 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedStat(null)}
                >
                  <X size={24} />
                </button>
                
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-emerald-600 mb-2">
                    {stats[selectedStat].value}
                  </div>
                  <div className="text-xl font-semibold text-gray-800 mb-4">
                    {stats[selectedStat].title}
                  </div>
                  <div className="w-16 h-1 bg-emerald-500 mx-auto mb-6"></div>
                  <p className="text-gray-600">{stats[selectedStat].description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Stats;