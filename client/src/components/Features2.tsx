import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Building, Users, Coffee, HeartHandshake, PackageCheck } from "lucide-react";

interface FeatureItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const Features2 = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features: FeatureItem[] = [
    {
      id: "finance",
      title: "Finance (Kiểm soát tài chính)",
      icon: <DollarSign size={24} />,
      description: "Tự động vận hành tài chính mà không thất thoát, chủ quán chỉ thu tiền"
    },
    {
      id: "facility",
      title: "Facility (Kiểm soát trang thiết bị, cơ sở vật chất)",
      icon: <Building size={24} />,
      description: "Tự vận hành, bảo trì, sửa chữa mà không cần chủ đầu tư tham gia nhiều"
    },
    {
      id: "people",
      title: "People (Quản lý nhân sự)",
      icon: <Users size={24} />,
      description: "Tự động hóa quy trình tuyển dụng, đào tạo và duy trì quy chuẩn của quán"
    },
    {
      id: "product",
      title: "Product (Quản lý chất lượng sản phẩm)",
      icon: <Coffee size={24} />,
      description: "Luôn ổn định được chất lượng sản phẩm dù không có chủ quán"
    },
    {
      id: "service",
      title: "Service (Quản lý chất lượng phục vụ, dịch vụ khách hàng)",
      icon: <HeartHandshake size={24} />,
      description: "Luôn ổn định chất lượng dịch vụ, trải nghiệm khách hàng theo tiêu chuẩn"
    },
    {
      id: "stock",
      title: "Stock (Kiểm soát thất thoát tồn kho)",
      icon: <PackageCheck size={24} />,
      description: "Kho tự vận hành, tự kiểm soát giảm thiểu thất thoát"
    }
  ];

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  const currentFeature = features[currentFeatureIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gray-800">QUY TRÌNH "</span><span className="text-emerald-600">FPS</span><span className="text-gray-800">"</span>
            <span className="block mt-3 text-emerald-600">ĐẦU TIÊN VÀ DUY NHẤT</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto my-6"></div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Quy trình "FPS" độc quyền bởi AUTOSHOP là toàn bộ hệ thống tài liệu về 
            mọi yếu tố quan trọng nhất khi vận hành quán, bao gồm:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Side - FPS Carousel */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              <span className="hidden md:inline">6 Cột Trụ F.P.S Quán Tự Vận Hành</span>
              <span className="md:hidden">
                6 Cột Trụ F.P.S<br />
                Quán Tự Vận Hành
              </span>
            </h3>
            
            {/* Current Feature Display */}
            <motion.div
              key={currentFeatureIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-lg flex items-center justify-center">
                  {currentFeature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {currentFeature.title.split('(')[0].trim()}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    ({currentFeature.title.split('(')[1]?.replace(')', '') || ''})
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">{currentFeature.description}</p>
              </div>
              
              {/* Progress indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentFeatureIndex ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* All Features Grid for Reference */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                    index === currentFeatureIndex 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 bg-white hover:border-emerald-300'
                  }`}
                  onClick={() => setCurrentFeatureIndex(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      index === currentFeatureIndex 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-gray-800">
                        {feature.title.split('(')[0].trim()}
                      </h5>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Nhận Trọn Bộ Quy Trình F.P.S
            </h3>
            
            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BEEJrEd7P5Q"
                title="Quy trình FPS - Autoshop Setup"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
              <h4 className="font-semibold text-gray-800 mb-3">Lợi ích của Quy trình FPS:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Chủ đi chơi, quán vẫn tự vận hành, chỉ cần 2 tiếng mỗi ngày nắm quán trong lòng bàn tay</li>
                <li>• Nhẹ gánh khi nhân sự quen việc, biết việc và có động lực làm việc</li>
                <li>• Khách hàng luôn được trải nghiệm dịch vụ WOW</li>
                <li>• Giảm thiểu thất thoát, tối ưu doanh thu, dễ dàng kiểm soát tài chính</li>
        
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mt-16">
          <div className="h-[1px] w-16 bg-gray-300 mx-auto mb-6"></div>
          <p className="text-gray-600 italic text-lg">
            "Không dừng lại ở một quán hoàn thiện, bạn sẽ nhận được một luồng máy vận hành tự động kể cả khi chủ quán vắng mặt"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features2;