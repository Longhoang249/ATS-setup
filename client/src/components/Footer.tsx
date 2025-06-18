import { Link } from "wouter";
import { Facebook, Youtube, MapPin, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    businessType: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, businessType: value }));
  };

  return (
    <footer className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-1 opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23059669' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
           }}>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Cột trái - Thông tin và Form liên hệ */}
          <motion.div 
            className="md:w-7/12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              📞 LIÊN HỆ - Hỗ trợ 24/7
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Liên hệ với chúng tôi để nhận <span className="text-green-600">tư vấn</span><br/>
              <span className="relative">
                từ chuyên gia và phần quà hấp dẫn
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
            </motion.h2>
            
            <motion.form 
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: formData.name,
                      phone: formData.phone,
                      address: formData.address,
                      businessType: formData.businessType,
                      message: formData.message,
                      source: 'footer'
                    }),
                  });
                  
                  const result = await response.json();
                  
                  if (result.success) {
                    alert('Đã gửi thông tin thành công! Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.');
                    setFormData({ name: "", phone: "", address: "", businessType: "", message: "" });
                  } else {
                    alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                  }
                } catch (error) {
                  console.error('Error submitting form:', error);
                  alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                }
              }} 
              className="space-y-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus:border-green-500 transition-colors group-hover:border-gray-300 bg-transparent"
                  required
                />
              </div>
              
              <div className="relative group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại*"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus:border-green-500 transition-colors group-hover:border-gray-300 bg-transparent pr-8"
                />
                <span className="absolute right-0 top-3 text-green-500 font-bold">*</span>
              </div>
              
              <div className="relative group">
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus:border-green-500 transition-colors group-hover:border-gray-300 bg-transparent"
                />
              </div>
              
              <div className="relative group">
                <Select onValueChange={handleSelectChange} value={formData.businessType}>
                  <SelectTrigger className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus-visible:ring-0 focus:border-green-500 text-gray-500 transition-colors group-hover:border-gray-300 bg-transparent">
                    <SelectValue placeholder="Lựa chọn tình trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-location">Chưa có mặt bằng</SelectItem>
                    <SelectItem value="has-location">Đã có mặt bằng</SelectItem>
                    <SelectItem value="existing">Đang kinh doanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Lời nhắn"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus:border-green-500 transition-colors group-hover:border-gray-300 bg-transparent resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-full transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Nhận Tư Vấn Ngay
                <ArrowRight size={16} />
              </button>
            </motion.form>
          </motion.div>
          
          {/* Cột phải - Thông tin liên hệ */}
          <motion.div 
            className="md:w-5/12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/80 backdrop-blur-sm border border-green-100 p-8 rounded-3xl shadow-2xl relative">
              {/* Decorative corner */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                📍
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Địa chỉ</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-medium text-green-600">Miền Bắc:</span> Tầng 15 tòa nhà Vietcombank Tây Hà Nội, Tố Hữu, Vạn Phúc, Hà Đông, Hà Nội.</p>
                      <p><span className="font-medium text-green-600">Miền Trung:</span> 131 Trần Minh Tông, Phường Hòa Minh, Quận Liên Chiểu, Đà Nẵng.</p>
                      <p><span className="font-medium text-green-600">Miền Nam:</span> 236 Nguyễn Xí – Phường 13 – Quận Bình Thạnh – TP. HCM.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-2xl">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Hotline</h3>
                    <p className="text-green-600 text-2xl font-bold">0799.888.222</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-4">
                  🔒 Thông tin của bạn được bảo mật tuyệt đối
                </p>
                
                <div className="flex justify-center items-center space-x-6">
                  <a href="https://www.facebook.com/setupautoshop" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="https://www.youtube.com/@autoshopsetupquan" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 hover:text-red-600 transition-colors transform hover:scale-110">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright and Social */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-gray-600 mb-4 md:mb-0">© {new Date().getFullYear()} AutoShop. Tất cả các quyền được bảo lưu.</p>
          
          <a
            href="https://bandosetup.autoshop.com.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            BẢN ĐỒ SETUP TOÀN VIỆT NAM
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;