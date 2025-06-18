import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Chủ quán Cafe Sunshine",
    content:
      "Đội ngũ ATS Setup đã hỗ trợ chúng tôi từ khâu thiết kế đến vận hành. Sau 3 tháng, quán của tôi đã có lãi và vượt xa mong đợi ban đầu. Đặc biệt quy trình FPS giúp tôi có thể quản lý từ xa mà không cần phải có mặt tại quán.",
    rating: 5,
  },
  {
    id: 2,
    name: "Trần Thị B",
    position: "Chủ quán Trà sữa Moon",
    content:
      "Ban đầu tôi rất lo lắng vì chưa có kinh nghiệm kinh doanh, nhưng nhờ ATS Setup, tôi đã được đào tạo chi tiết về mọi khía cạnh. Giờ đây quán của tôi hoạt động tự động và mang lại lợi nhuận ổn định mỗi tháng.",
    rating: 5,
  },
  {
    id: 3,
    name: "Phạm Văn C",
    position: "Chủ chuỗi Cooler Tea",
    content:
      "Tôi đã làm việc với nhiều đơn vị setup khác nhau, nhưng ATS Setup là đơn vị chuyên nghiệp nhất. Từ thiết kế menu đến đào tạo nhân viên và vận hành cửa hàng, họ đều cung cấp dịch vụ tuyệt vời. Hiện tại tôi đã mở rộng được 3 chi nhánh và vẫn tiếp tục hợp tác với ATS.",
    rating: 5,
  },
];

const TestimonialsSlider = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-green-600 font-medium mb-2">KHÁCH HÀNG NÓI GÌ</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            PHẢN HỒI TỪ CHỦ QUÁN ĐÃ SETUP
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những đánh giá thực tế từ các chủ quán đã sử dụng dịch vụ setup của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 relative shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
            >
              <div className="absolute top-6 right-6 text-gray-200">
                <Quote size={42} />
              </div>
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 relative z-10">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Xem thêm đánh giá
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;