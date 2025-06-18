import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PricingPlans = () => {
  const basicFeatures = [
    "Tư vấn về máy móc, thiết bị",
    "Quy trình pha chế cơ bản",
    "Đào tạo nhân viên trong 1 ngày",
    "Công thức đồ uống cơ bản",
    "Hỗ trợ setup quầy bar",
  ];

  const standardFeatures = [
    "Tất cả tính năng của gói Basic",
    "Đào tạo nhân viên trong 3 ngày",
    "Công thức đồ uống nâng cao",
    "Tư vấn thiết kế menu",
    "Hỗ trợ tuyển dụng nhân sự",
    "Đào tạo quản lý cửa hàng",
  ];

  const premiumFeatures = [
    "Tất cả tính năng của gói Standard",
    "Đào tạo nhân viên trong 5-7 ngày",
    "Tư vấn mô hình kinh doanh toàn diện",
    "Xây dựng quy trình vận hành tự động",
    "Hỗ trợ khai trương",
    "Tư vấn marketing và phát triển thương hiệu",
    "Công thức đồ uống độc quyền",
    "Hỗ trợ kĩ thuật trọn đời",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            GÓI DỊCH VỤ SETUP CAFE/TRÀ SỮA
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp nhiều gói dịch vụ phù hợp với quy mô và nhu cầu của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Gói Basic</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-800">9.000.000</span>
                <span className="text-gray-600 mb-1">VNĐ</span>
              </div>
              <p className="text-gray-600 text-sm">
                Dành cho những quán mới bắt đầu hoặc chỉ cần hỗ trợ cơ bản
              </p>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-3">
                {basicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <button className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium transition-colors">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </motion.div>

          {/* Standard Plan */}
          <motion.div
            className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-green-600 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 right-0 left-0">
              <div className="flex justify-center">
                <Badge className="bg-green-600 text-white px-3 rounded-b-md font-medium">
                  Phổ biến nhất
                </Badge>
              </div>
            </div>
            <div className="p-6 border-b border-gray-200 mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Gói Standard</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-800">18.000.000</span>
                <span className="text-gray-600 mb-1">VNĐ</span>
              </div>
              <p className="text-gray-600 text-sm">
                Phù hợp với các quán vừa và nhỏ, muốn có sự đào tạo chuyên sâu hơn
              </p>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-3">
                {standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-colors">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Gói Premium</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-800">38.000.000</span>
                <span className="text-gray-600 mb-1">VNĐ</span>
              </div>
              <p className="text-gray-600 text-sm">
                Giải pháp toàn diện để xây dựng chuỗi cửa hàng chuyên nghiệp
              </p>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <button className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium transition-colors">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;