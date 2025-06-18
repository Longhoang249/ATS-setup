import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Từ khi sử dụng Auto Shop Setup, việc quản lý gara của tôi trở nên dễ dàng hơn rất nhiều. Tôi có thể theo dõi tình trạng sửa chữa từng xe, kiểm soát tồn kho và doanh thu một cách hiệu quả.",
    author: "Nguyễn Văn Nam",
    role: "Giám đốc Gara Nam Việt",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
  },
  {
    content:
      "Phần mềm rất dễ sử dụng, giao diện thân thiện. Đội ngũ hỗ trợ nhiệt tình, luôn sẵn sàng giải đáp mọi thắc mắc. Tôi đã giới thiệu Auto Shop Setup cho nhiều đồng nghiệp trong ngành.",
    author: "Trần Thị Hương",
    role: "Quản lý Toyota Thăng Long",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
  },
  {
    content:
      "Chức năng quản lý khách hàng và lịch sử sửa chữa giúp chúng tôi chăm sóc khách hàng tốt hơn. Hệ thống nhắc lịch bảo dưỡng tự động đã giúp tăng tỷ lệ khách hàng quay lại đáng kể.",
    author: "Lê Minh Tuấn",
    role: "Chủ Gara Minh Tuấn Auto",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 4.5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Khách hàng nói gì về chúng tôi
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hàng trăm doanh nghiệp đã tin tưởng và sử dụng Auto Shop Setup để
            quản lý gara của họ
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gray-50 h-full">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex text-primary">
                      {Array.from({ length: Math.floor(testimonial.rating) }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="fill-current h-5 w-5"
                          />
                        )
                      )}
                      {testimonial.rating % 1 !== 0 && (
                        <div className="relative">
                          <Star className="text-gray-300 h-5 w-5" />
                          <div
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: "50%" }}
                          >
                            <Star className="fill-current text-primary h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-gray-300">
                      <Quote className="h-8 w-8" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-8 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
