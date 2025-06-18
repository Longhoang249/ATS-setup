import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, X, Star, TrendingUp, Clock, Shield } from "lucide-react";
import bartrainingImg from "@assets/DSC09924.jpg";

const Partnership = () => {
  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Sở hữu ngay quán cà phê/trà sữa",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      items: [
        {
          text: "Tạo ra dòng tiền đều đặn hàng tháng chục đến",
          highlight: "hàng trăm triệu mỗi tháng"
        },
        {
          text: "Chỉ cần",
          highlight: "2 giờ làm việc mỗi ngày",
          suffix: ", trở thành chủ quán tự do thật sự"
        },
        {
          text: "Tự động vận hành theo quy trình chuẩn hóa đã được chứng minh thành công"
        }
      ]
    },
    {
      icon: <X className="w-6 h-6" />,
      title: "Mà không cần phải:",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      items: [
        {
          text: "Tốn hàng tháng trời học pha chế, hàng năm trời cũng ít nhất",
          highlight: "30tr",
          suffix: "cho các khóa học chuyên sâu"
        },
        {
          text: "Bỏ hàng chục triệu mỗi tháng để thuê chuyên gia cố vẫn mà không biết có hiệu quả hay không"
        },
        {
          text: "Tự mình quản lý, trở thành nô lệ thời gian mất hết tự do của \"chủ quán thật sự\""
        }
      ]
    },

  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            TOP 1 ĐƠN VỊ SETUP CÓ TỈ LỆ QUÁN THÀNH CÔNG CAO NHẤT
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            LỢI ÍCH KHI HỢP TÁC CÙNG VỚI{" "}
            <span className="text-green-600 relative">
              ATS SETUP
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 -z-10 rounded"></div>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Section */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl">
                <img 
                  src={bartrainingImg} 
                  alt="Đào tạo pha chế tại ATS setup" 
                  className="w-full h-full object-cover"
                />
                {/* Prominent success stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600/95 via-green-500/80 to-transparent p-8 text-white">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <Shield className="w-8 h-8 text-yellow-300" />
                      <span className="font-black text-5xl text-yellow-300 drop-shadow-lg">500+</span>
                      <Shield className="w-8 h-8 text-yellow-300" />
                    </div>
                    <p className="text-white font-bold text-xl tracking-wide drop-shadow-md hidden md:block">
                      QUÁN CAFE SETUP THÀNH CÔNG
                    </p>
                    <div className="md:hidden text-center">
                      <p className="text-white font-bold text-lg tracking-wide drop-shadow-md">
                        QUÁN CAFE SETUP
                      </p>
                      <p className="text-white font-bold text-lg tracking-wide drop-shadow-md">
                        THÀNH CÔNG
                      </p>
                    </div>
                    <div className="w-24 h-1 bg-yellow-300 mx-auto mt-2 rounded-full"></div>
                  </div>
                </div>
              </div>
              

              
              {/* Background decoration */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-200 rounded-full opacity-20 -z-10"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full opacity-30 -z-10"></div>
            </div>
          </motion.div>

          {/* Benefits Cards */}
          <div className="space-y-6 order-1 lg:order-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`relative ${benefit.bgColor} ${benefit.borderColor} border-l-4 rounded-r-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${benefit.color} p-2 bg-white rounded-xl shadow-sm`}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  {/* Items */}
                  <div className="space-y-3">
                    {benefit.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 pl-4">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          {item.text}
                          {item.highlight && (
                            <span className="font-semibold text-gray-800 bg-white px-2 py-1 rounded-md mx-1">
                              {item.highlight}
                            </span>
                          )}
                          {item.suffix && item.suffix}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-bl-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;