import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

// Import các ảnh chuyên gia
import nguyenHoangPhuImg from "../assets/nguyen-hoang-phu.png";
import kimTrongToanImg from "../assets/kim-trong-toan.png";
import dinhXuanImg from "../assets/dinh-xuan.png";
import nguyenHongLamImg from "../assets/nguyen-hong-lam.png";
import thienDuImg from "../assets/thien-du.png";
import minhTranImg from "../assets/minh-tran.png";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Mr. Nguyễn Hồng Lâm",
    title: "Chuyên gia Đào tạo & Setup",
    image: nguyenHongLamImg,
    bio: `Kinh Nghiệm:
– 10 năm kinh nghiệm pha chế trong ngành F&B
– 3 năm kinh nghiệm trong lĩnh vực giảng dạy, vận hành thực tế quán
– Một số brand lớn đã từng hợp tác: Passio, Coffee Bean, Angel in us, Phúc long, Soho...
– Quản lý chuỗi cà phê Phúc Long
– Quản lý chất lượng, R&D, training Barista cho thương hiệu Soho
 
Bằng Cấp:
– Chứng chỉ SCA BARISTA SKILLS từ hiệp hội cà phê đặc sản thế giới`,
  },
  {
    id: 2,
    name: "Mr. Thiên Du",
    title: "Chuyên gia Đào tạo & Setup",
    image: thienDuImg,
    bio: `Kinh Nghiệm:
– 10 năm kinh nghiệm trong ngành F&B
– 6 năm kinh nghiệm trong lĩnh vực giảng dạy
– 2 năm kinh nghiệm tại thị trường Myanmar
– Vị trí Products Research & Development Manager R&D-M tại One Stop F&B Academy Myanmar
 
Bằng Cấp:
– Chứng chỉ nghiệp vụ sư phạm – pedagogival certificate-tại Trường Cao Đẳng Nghề Cơ Điện Hà Nội
– Chứng chỉ Certificate of Completion "Professional Barista Course" tại Trung Tâm đào tạo nghề chuyên nghiệp Dạy Nghề Netspace
– Chứng chỉ Certificate of Completion "Professional Bartender Course" tại Trung Tâm đào tạo nghề chuyên nghiệp Dạy Nghề Netspace.`,
  },
  {
    id: 3,
    name: "Mr. Minh Trần",
    title: "Chuyên gia Đào tạo & Setup",
    image: minhTranImg,
    bio: `– 6 năm kinh nghiệm trong ngành Pha Chế và Setup Quán
– 3 năm kinh nghiệm tại thị trường Cambodia
– Tốt nghiệp chuyên ngành Quản trị Kinh doanh – Trường ĐH Kinh tế thành phố Hồ Chí Minh
– Vị trí Setup Training Manager tại One Stop F&B Academy Cambodia`,
  },
  {
    id: 4,
    name: "Mr. Nguyễn Hoàng Phú",
    title: "Chuyên gia Đào tạo & Setup",
    image: nguyenHoangPhuImg,
    bio: `– Chuyên gia pha chế và setup quán với 6 năm kinh nghiệm trong ngành F&B
– 4 năm nghiên cứu phát triển sản phẩm Cà phê và nguyên liệu pha chế
– Setup và vận hành 80+ mô hình quán cà phê trà sữa khắp các tỉnh miền Bắc như: 9 Bean Coffee – Thái Bình, Vina Coffee – Ninh Bình, Tâm Anh Coffee – Hải Phòng…`,
  },
  {
    id: 5,
    name: "Mr. Kim Trọng Toàn",
    title: "Chuyên gia Đào tạo & Setup",
    image: kimTrongToanImg,
    bio: `– Chuyên gia pha chế và setup quán với 7 năm kinh nghiệm trong ngành F&B
– 5 năm nghiên cứu phát triển sản phẩm Trà sữa và nguyên liệu pha chế
– Setup và vận hành 120+ mô hình quán cà phê trà sữa khắp các tỉnh miền Bắc và miền Trung như: Diamond Coffee – Hải Phòng, Siêu thị Tuấn Khánh – Hòa Bình, Ruby Six Coffee – Móng Cái…`,
  },
  {
    id: 6,
    name: "Mr. Đinh Xuân Phong",
    title: "Chuyên gia Đào tạo & Setup",
    image: dinhXuanImg,
    bio: `– Chuyên gia pha chế và setup quán với 7 năm kinh nghiệm trong ngành F&B

– 5 năm nghiên cứu phát triển sản phẩm Trà và nguyên liệu pha chế

– Setup và vận hành 100+ mô hình quán cà phê trà sữa khắp các tỉnh miền Bắc và miền Trung như: Momo Coffee – Ninh Bình, Vũ Gia Garden bonsai coffee & tea – Hạ Long, Hoà Ca cafe – Hà Nội…`,
  },
];

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const getVisibleMembers = (isMobile = false) => {
    const itemsCount = isMobile ? 1 : 3;
    const visibleMembers = [];
    for (let i = 0; i < itemsCount; i++) {
      const index = (currentIndex + i) % teamMembers.length;
      visibleMembers.push(teamMembers[index]);
    }
    return visibleMembers;
  };

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-lg font-medium mb-2">CHUYÊN GIA</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ĐỘI NGŨ CHUYÊN GIA SETUP <span className="text-black">&</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
            CHUYỂN GIAO QUY TRÌNH
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Đội ngũ chuyên gia với nhiều năm kinh nghiệm trong lĩnh vực F&B, cam kết đồng hành và hỗ trợ bạn xây dựng mô hình kinh doanh thành công.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Desktop Carousel - Show 3 at a time */}
          <div className="hidden md:block overflow-hidden px-12">
            <div className="grid grid-cols-3 gap-8">
              {getVisibleMembers(false).map((member, index) => (
                <motion.div
                  key={`${member.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=600`;
                      }}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary mt-1">{member.title}</p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="mt-4 flex items-center gap-1"
                        >
                          <Plus size={16} />
                          <span>Xem thêm</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{member.name}</DialogTitle>
                          <DialogDescription>{member.title}</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-auto rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=600`;
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-gray-700 whitespace-pre-line">{member.bio}</div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel - Show 1 at a time */}
          <div className="md:hidden overflow-hidden px-8">
            <div className="flex justify-center">
              {getVisibleMembers(true).map((member, index) => (
                <motion.div
                  key={`${member.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=600`;
                      }}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary mt-1">{member.title}</p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="mt-4 flex items-center gap-1"
                        >
                          <Plus size={16} />
                          <span>Xem thêm</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{member.name}</DialogTitle>
                          <DialogDescription>{member.title}</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-auto rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=600`;
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-gray-700 whitespace-pre-line">{member.bio}</div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;