import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import setupImage from "@assets/image_1745225785635.png";

const SetupPackage = () => {
  return (
    <section id="setup-package" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            GÓI SETUP TỔNG THỂ (38.000.000đ)
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi hỗ trợ bạn từng bước xây dựng cửa hàng từ tư vấn ban đầu đến vận hành
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <motion.div
            className="w-full md:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="day1" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 1: TƯ VẤN MÔ HÌNH KINH DOANH & SẢN PHẨM
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Tư vấn mô hình kinh doanh và sản phẩm đồ uống phù hợp với khách hàng mục tiêu khu vực</p>
                  <p>– Tư vấn hình thức thanh toán phù hợp với cửa hàng</p>
                  <p>– Thử chất lượng sản phẩm đồ uống và chốt menu bán hàng</p>
                  <p>– Tiến hành ký kết hợp đồng hợp tác</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day2" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 2: TƯ VẤN THIẾT KẾ KHÔNG GIAN & CÔNG NĂNG QUẦY BAR
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Giới thiệu đơn vị đối tác thiết kế, thi công</p>
                  <p>– Vẽ phác công năng quầy bar, bố trí khu vực làm việc phù hợp với từng nhóm sản phẩm</p>
                  <p>– Tham vấn thiết kế không gian quán</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day3" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 3: TƯ VẤN THIẾT BỊ MÁY PHA CHẾ, DỤNG CỤ PHA CHẾ, NGUYÊN LIỆU
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Xây dựng danh sách máy pha chế đáp ứng đủ công năng bán hàng</p>
                  <p>– Xây dựng danh sách nguyên liệu đầu vào theo menu bán hàng</p>
                  <p>– Xây dựng danh sách dụng cụ pha chế, ly-cốc bán hàng sử dụng cho từng nhóm sản phẩm trong menu</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day4" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 4: TƯ VẤN TUYỂN DỤNG NHÂN SỰ
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Định biên số lượng nhân sự phù hợp với mô hình kinh doanh</p>
                  <p>– Tư vấn cơ chế lương thưởng cho các bộ phận nhân sự</p>
                  <p>– Xây dựng bài tuyển dụng mẫu cho cửa hàng</p>
                  <p>– Tham vấn kênh tuyển dụng và phỏng vấn nhân sự</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day5" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 5: XÂY DỰNG GIÁO TRÌNH ĐÀO TẠO VÀ BẢNG GIÁ VỐN SẢN PHẨM
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Xây dựng công thức và cách làm chi tiết các sản phẩm</p>
                  <p>– Xây dựng bảng giá vốn hàng bán chi tiết cho từng sản phẩm</p>
                  <p>– Đề xuất giá bán cho từng nhóm sản phẩm</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day6" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 6: SẮP XẾP MÁY PHA CHẾ, DỤNG CỤ, HƯỚNG DẪN NHÂN VIÊN SỬ DỤNG
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Bố trí nhân sự vệ sinh, dọn dẹp, sắp xếp công dụng cụ máy móc trong quầy bar</p>
                  <p>– Sắp xếp máy pha chế vào các vị trí như công năng quầy bar đã thiết kế</p>
                  <p>– Sắp xếp dụng cụ pha chế, nguyên liệu các khu vực làm việc</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day7_11" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 7,8,9,10,11: ĐÀO TẠO NHÂN VIÊN PHA CHẾ
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Giảng viên sẽ gửi nội dung đào tạo từng ngày trước (02 ngày) khi đến cửa hàng</p>
                  <p>– Thời lượng đào tạo các buổi từ 7-10 tiếng</p>
                  <p>– Hướng dẫn cài đặt và sử dụng các máy pha chế trong quầy bar</p>
                  <p>– Hướng dẫn sử dụng các công dụng cụ pha chế trong quầy bar</p>
                  <p>– Bố trí vị trí làm việc cho nhân sự phù hợp với công năng trong quầy bar</p>
                  <p>– Đào tạo pha chế toàn bộ nhân viên các sản phẩm đồ uống theo menu cửa hàng</p>
                  <p>– Hướng dẫn sơ chế các sản phẩm và những lưu ý trong quá trình sơ chế</p>
                  <p>– Hướng dẫn nhân viên thực hành chi tiết các món đồ uống cùng các lưu ý trong thao tác pha chế</p>
                  <p>– Hướng dẫn nhân viên trang trí các món đồ uống</p>
                  <p>– Hướng dẫn kỹ năng thử nếm đồ uống đảm bảo vệ sinh trong quá trình pha chế</p>
                  <p>– Hướng dẫn cách bảo quản nguyên vật liệu sau khi sơ chế và sau khi sử dụng</p>
                  <p>– Hướng dẫn vệ sinh máy pha chế, dụng cụ pha chế, quầy bar sau cuối ca và cuối ngày làm việc</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day12" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 12: ĐÀO TẠO KỸ NĂNG CHO CÁC BỘ PHẬN
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <div>
                    <p className="font-medium mb-2">1. Đào tạo kỹ năng bán hàng các bộ phận nhân sự:</p>
                    <div className="pl-4 space-y-2">
                      <p>– Gửi bản mô tả công việc các bộ phân nhân sự trong cửa hàng</p>
                      <p>– Đào tạo kỹ năng giao tiếp, tư vấn bán hàng cho bộ phận oder, thu ngân</p>
                      <p>– Đào tạo kỹ năng giao tiếp và ứng xử với khách hàng cho các bộ phận nhân sự</p>
                      <p>– Đào tạo kỹ năng giao tiếp, phối hợp giữa các bộ phận trong quá trình bán hàng</p>
                      <p>– Đạo tạo kỹ năng xử lý tình huống trong quá trình bán hàng (sản phẩm lỗi, khách hàng phản hồi, v.v…) cho các bộ phận nhân sự</p>
                      <p>– Đào tạo quy trình bán hàng, quy trình phục vụ khách hàng khi đến quán</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="font-medium mb-2">2. Đào tạo bộ phận của hàng trưởng:</p>
                    <div className="pl-4 space-y-2">
                      <p>– Xây dựng lịch làm việc và sắp xếp nhân sự làm việc theo tuần, theo tháng</p>
                      <p>– Xây dựng cơ chế lương thưởng cho các bộ phận nhân sự</p>
                      <p>– Xây dựng checklist công việc các bộ phận và theo dõi hàng ngày</p>
                      <p>– Xây dựng các nhóm quản lý cửa hàng bằng phần mềm zalo</p>
                      <p>– Hướng dẫn kỹ năng thử nếm, kiểm soát chất lượng sản phẩm hàng bán mỗi ngày</p>
                      <p>– Xây dựng mẫu kiểm soát số lượng sản phẩm sơ chế và sản phẩm hàng hủy trong ngày</p>
                      <p>– Báo cáo doanh thu bán hàng và số lượng từng sản phẩm bán trong tuần, trong tháng và đưa ra đề xuất nhập nguyên liệu cho tháng sau (kiểm soát qua phần mềm bán hàng)</p>
                      <p>– Tư vấn các kênh bán hàng và cách tăng trưởng doanh thu trên các ứng dụng giao đồ ăn</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="day13_15" className="border border-green-100 rounded-md mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-green-50 font-semibold text-left">
                  NGÀY 13,14,15: VẬN HÀNH BÁN HÀNG
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 space-y-2 text-gray-600">
                  <p>– Tư vấn trương trình bán hàng cho ngày khai trương</p>
                  <p>– Hướng dẫn, kèm cặp các bộ phận nhân sự trong quá trình bán hàng</p>
                  <p>– Hỗ trợ pha chế, kiểm soát chất lượng sản phẩm trước khi mang ra cho khách hàng</p>
                  <p>– Hướng dẫn nhân viên xử lý các tình huống phát sinh trong quá trình bán hàng</p>
                  <p>– Thu thập phản hồi của khách hàng và đề xuất phương án thay đổi cho phù hợp</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          <motion.div
            className="w-full md:w-2/5 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden relative shadow-xl">
              <img 
                src={setupImage} 
                alt="Chuyên gia pha chế ATS SETUP" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SetupPackage;