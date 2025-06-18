import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pricingPlans = [
  {
    name: "Gói Cơ bản",
    description: "Dành cho các gara quy mô nhỏ",
    price: "1.500.000",
    period: "tháng",
    features: [
      { name: "Quản lý sửa chữa cơ bản", available: true },
      { name: "Quản lý khách hàng", available: true },
      { name: "Quản lý kho đơn giản", available: true },
      { name: "Báo cáo cơ bản", available: true },
      { name: "Quản lý tài chính nâng cao", available: false },
      { name: "Tích hợp SMS Marketing", available: false },
      { name: "Hỗ trợ 24/7", available: false },
    ],
    popular: false,
  },
  {
    name: "Gói Tiêu chuẩn",
    description: "Dành cho các gara quy mô vừa",
    price: "2.500.000",
    period: "tháng",
    features: [
      { name: "Quản lý sửa chữa đầy đủ", available: true },
      { name: "Quản lý khách hàng nâng cao", available: true },
      { name: "Quản lý kho chuyên nghiệp", available: true },
      { name: "Báo cáo chi tiết", available: true },
      { name: "Quản lý tài chính nâng cao", available: true },
      { name: "Tích hợp SMS Marketing", available: false },
      { name: "Hỗ trợ 24/7", available: false },
    ],
    popular: true,
  },
  {
    name: "Gói Cao cấp",
    description: "Dành cho các gara quy mô lớn",
    price: "4.000.000",
    period: "tháng",
    features: [
      { name: "Tất cả tính năng gói Tiêu chuẩn", available: true },
      { name: "Quản lý nhiều chi nhánh", available: true },
      { name: "Báo cáo phân tích chuyên sâu", available: true },
      { name: "Tích hợp CRM", available: true },
      { name: "Quản lý tài chính nâng cao", available: true },
      { name: "Tích hợp SMS Marketing", available: true },
      { name: "Hỗ trợ 24/7", available: true },
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Bảng giá phần mềm
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Chúng tôi cung cấp nhiều gói dịch vụ khác nhau để phù hợp với nhu
            cầu và quy mô của doanh nghiệp bạn
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative ${
                plan.popular
                  ? "md:-mt-4 md:mb-4 z-10"
                  : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full ${
                  plan.popular
                    ? "border-primary shadow-xl"
                    : "border-gray-200 shadow-lg hover:shadow-xl transition-all"
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white py-2 text-center font-medium">
                    <span>Phổ biến nhất</span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-6">
                    <span
                      className={`text-4xl font-bold ${
                        plan.popular ? "text-primary" : "text-gray-800"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">
                      VNĐ/{plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center"
                      >
                        {feature.available ? (
                          <Check className="text-green-500 mr-2 h-5 w-5" />
                        ) : (
                          <X className="text-gray-400 mr-2 h-5 w-5" />
                        )}
                        <span
                          className={
                            feature.available ? "" : "text-gray-400"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    asChild
                  >
                    <a href="#contact">Liên hệ ngay</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Không tìm thấy gói phù hợp? Chúng tôi có thể tùy chỉnh giải pháp
            riêng cho doanh nghiệp của bạn.
          </p>
          <a
            href="#contact"
            className="text-primary font-medium hover:underline"
          >
            Liên hệ để được tư vấn cụ thể
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
