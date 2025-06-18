import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const Hero = () => {
const [formData, setFormData] = useState({
name: "",
phone: "",
address: "",
businessType: ""
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSelectChange = (value: string) => {
setFormData(prev => ({ ...prev, businessType: value }));
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
console.log("Form submitted:", formData);

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
source: 'hero'
}),
});

const result = await response.json();

if (result.success) {
alert("Cảm ơn bạn đã đăng ký tư vấn. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!");
setFormData({ name: "", phone: "", address: "", businessType: "" });
} else {
alert("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.");
}
} catch (error) {
console.error('Error submitting form:', error);
alert("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.");
}
};

return (
<section
id="hero"
className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100"
>
{/* Decorative background elements */}
<div className="absolute inset-0 z-0">
<div className="absolute top-20 right-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
<div className="absolute bottom-32 left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-pulse delay-700"></div>
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
</div>

{/* Grid pattern overlay */}
<div className="absolute inset-0 z-1 opacity-5" 
style={{
backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23059669' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
}}>
</div>

<div className="container mx-auto px-4 pt-32 pb-20 lg:py-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
<motion.div
className="w-full lg:w-7/12 text-center lg:text-left"
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
⭐ Autoshop Setup - Giải pháp #1 tại Việt Nam
</motion.div>

<motion.h1 
className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-gray-900"
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.3 }}
>
SETUP TRỌN GÓI<br />
<span className="text-green-600">QUÁN CAFE TRÀ SỮA</span><br />
<span className="relative">
"TỰ VẬN HÀNH"
<motion.div
className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 -z-10"
initial={{ scaleX: 0 }}
animate={{ scaleX: 1 }}
transition={{ duration: 1, delay: 1 }}
/>
</span>
</motion.h1>

<motion.p 
className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.5 }}
>
Chủ quán nhận được một guồng máy tự vận hành, có thể hoạt động trơn chu ngay cả khi bạn vắng mặt!
</motion.p>

<motion.div 
className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.7 }}
>
<Button
size="lg"
className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
asChild
>
<a href="#features" className="flex items-center gap-2">
TÌM HIỂU THÊM 
<motion.div
animate={{ x: [0, 4, 0] }}
transition={{ repeat: Infinity, duration: 1.5 }}
>
<ArrowRight size={18} />
</motion.div>
</a>
</Button>

<div className="flex items-center gap-2 text-gray-600">
<div className="flex -space-x-2">
<div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
<div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
<div className="w-8 h-8 bg-green-300 rounded-full border-2 border-white"></div>
</div>
<span className="text-sm font-medium">500+ quán thành công</span>
</div>
</motion.div>
</motion.div>

<motion.div
className="w-full lg:w-5/12"
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8, delay: 0.4 }}
>
<div className="bg-white/80 backdrop-blur-sm border border-green-100 text-gray-800 p-8 rounded-3xl shadow-2xl relative">
{/* Decorative corner */}
<div className="absolute -top-6 -right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
💚
</div>

<div className="text-center mb-8">
<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">NHẬN TƯ VẤN MIỄN PHÍ</h2>
<p className="text-gray-600 text-sm leading-relaxed">
Để lại thông tin và trở thành chủ quán tự do<br />
nhờ hệ thống quán tự vận hành
</p>
</div>

<form onSubmit={handleSubmit} className="space-y-6">
<div className="relative group">
<Input 
id="name" 
name="name"
placeholder="Họ và tên" 
className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus:border-green-500 transition-colors group-hover:border-gray-300" 
value={formData.name}
onChange={handleChange}
required
/>
</div>

<div className="relative group">
<Input 
id="phone" 
name="phone"
placeholder="Số điện thoại*" 
className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus:border-green-500 transition-colors group-hover:border-gray-300 pr-8" 
value={formData.phone}
onChange={handleChange}
required
/>
<span className="absolute right-0 top-3 text-green-500 font-bold">*</span>
</div>

<div className="relative group">
<Input 
id="address" 
name="address"
placeholder="Địa chỉ" 
className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus:border-green-500 transition-colors group-hover:border-gray-300" 
value={formData.address}
onChange={handleChange}
/>
</div>

<div className="relative group">
<Select onValueChange={handleSelectChange} value={formData.businessType}>
<SelectTrigger className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 focus:ring-0 focus-visible:ring-0 focus:border-green-500 text-gray-500 transition-colors group-hover:border-gray-300">
<SelectValue placeholder="Lựa chọn tình trạng" />
</SelectTrigger>
<SelectContent>
<SelectItem value="has-location">Đã có mặt bằng</SelectItem>
<SelectItem value="no-location">Chưa có mặt bằng</SelectItem>
<SelectItem value="existing">Đang kinh doanh</SelectItem>
</SelectContent>
</Select>
</div>

<Button 
type="submit" 
className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-full mt-6 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
>
<span className="flex items-center justify-center gap-2">
Nhận tư vấn ngay
<ArrowRight size={16} />
</span>
</Button>
</form>

<div className="mt-6 pt-6 border-t border-gray-100 text-center">
<p className="text-xs text-gray-500">
🔒 Thông tin của bạn được bảo mật tuyệt đối
</p>
</div>
</div>
</motion.div>
</div>
</section>
);
};

export default Hero;