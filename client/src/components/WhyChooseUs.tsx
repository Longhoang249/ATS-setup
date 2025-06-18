import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Award, MapPin, Zap, Building, ChevronLeft, ChevronRight, Target } from "lucide-react";
import storeImage from "@assets/image_1745225882213.png";

const WhyChooseUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const imageAlbum = [
    {
      src: storeImage,
      title: "Cooler City",
      subtitle: "Chuỗi cửa hàng kem và trà sữa tự vận hành"
    },
    {
      src: "https://i.postimg.cc/wvdgp7Lr/481916545-645931204483581-5531193989691141398-n.jpg",
      title: "Rosier",
      subtitle: "Chuỗi trà sữa 20+ điểm bán"
    },
    {
      src: "https://i.postimg.cc/d3Ly8kX1/read-station-7.jpg",
      title: "Read Station",
      subtitle: "Chuỗi trạm đọc nổi tiếng của Alpha Book"
    }
  ];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageAlbum.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageAlbum.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageAlbum.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageAlbum.length) % imageAlbum.length);
  };

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "ĐỘI NGŨ CHUYÊN GIA SETUP & CHUYỂN GIAO QUY TRÌNH",
      description: "Những chuyên gia hàng đầu trong lĩnh vực với nhiều năm làm nghề cùng hàng trăm dự án đã đi vào hoạt động khắp Việt Nam sẽ giúp bạn setup quán và chuyển giao",
      highlight: "toàn bộ quy trình vận hành tự động hóa",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "KINH NGHIỆM TOP 1 THỊ TRƯỜNG",
      description: "Top 1 đơn vị setup có tỉ lệ quán thành công cao nhất Việt Nam, đã tư vấn và triển khai xây dựng",
      highlight: "50+ mô hình đa dạng",
      subtext: ", phù hợp với mọi nhu cầu cũng như vốn đầu tư",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "QUY MÔ HOẠT ĐỘNG TOÀN QUỐC",
      description: "Quy mô lớn, triển khai dự án khắp Việt Nam với đội ngũ nhân sự và hệ thống văn phòng trải dài có",
      highlight: "3 miền Bắc - Trung - Nam",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            <Zap className="w-4 h-4 mr-2" />
            Lợi ích khi hợp tác cùng Autoshop Setup
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            <span className="block md:inline">VÌ SAO AUTOSHOP SETUP</span>{" "}
            <span className="block md:inline">CÓ THỂ XÂY DỰNG NHỮNG QUÁN</span>{" "}
            <span className="text-green-600 relative block md:inline">
              TỰ VẬN HÀNH
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 -z-10 rounded"></div>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Benefits Cards */}
          <div className="h-full flex flex-col justify-between space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group relative flex-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-r ${benefit.gradient} text-white mb-6 shadow-lg`}>
                    {benefit.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-base flex-grow">
                    {benefit.description}{" "}
                    <span className="font-semibold text-gray-800 bg-yellow-100 px-3 py-1 rounded-md">
                      {benefit.highlight}
                    </span>
                    {benefit.subtext && benefit.subtext}
                  </p>
                  
                  {/* Enhanced decorative elements */}
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-r ${benefit.gradient} opacity-10 rounded-full`}></div>
                  <div className={`absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r ${benefit.gradient} opacity-5 rounded-full`}></div>
                </div>
              </motion.div>
            ))}
            

          </div>

          {/* Image Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Image Carousel */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl">
                <motion.img 
                  key={currentImageIndex}
                  src={imageAlbum[currentImageIndex].src}
                  alt={imageAlbum[currentImageIndex].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.currentTarget.src = storeImage; // Fallback to local image
                  }}
                />
                
                {/* Image overlay with title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Building className="w-6 h-6" />
                    <span className="font-bold text-2xl">{imageAlbum[currentImageIndex].title}</span>
                  </div>
                  <p className="text-white/90">{imageAlbum[currentImageIndex].subtitle}</p>
                </div>
                
                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Dots indicator */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
                  {imageAlbum.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-200 rounded-full opacity-20 -z-10"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full opacity-30 -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;