import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingCallButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);

  // Bắt đầu hiệu ứng nhấp nháy sau khi component mount (giảm cường độ gây chú ý)
  useEffect(() => {
    // Nhấp nháy nhẹ sau khi tải trang 2 giây
    const initialTimeout = setTimeout(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1200);
    }, 2000);
    
    // Cứ mỗi 8 giây nhấp nháy một lần (giảm tần suất)
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      const timeout = setTimeout(() => {
        setIsPulsing(false);
      }, 1200);

      return () => clearTimeout(timeout);
    }, 8000);

    return () => {
      clearInterval(pulseInterval);
      clearTimeout(initialTimeout);
    };
  }, []);

  // Xử lý scroll để ẩn/hiện nút khi cần
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const st = window.scrollY;
      if (st > lastScrollTop && st > 300) {
        // Cuộn xuống và đã cuộn xa hơn 300px
        setIsVisible(false);
      } else {
        // Cuộn lên hoặc ở gần đầu trang
        setIsVisible(true);
      }
      lastScrollTop = st;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="tel:0799888222" // Số hotline từ yêu cầu
      className={`fixed bottom-6 right-6 z-50 flex items-center transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <div className="relative transform scale-90"> {/* Giảm kích thước 10% */}
        {/* Vòng tròn nhấp nháy lớn */}
        <div className={`absolute -inset-3 rounded-full bg-green-100 ${
          isPulsing ? "animate-ping scale-105" : ""
        } opacity-60`}></div> {/* Giảm opacity và hiệu ứng */}
        
        {/* Nút gọi điện chính */}
        <div className="flex items-center bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all relative z-10">
          <div className="hidden sm:flex items-center px-4 py-2 font-bold">
            0799.888.222
          </div>
          <div className="p-3 sm:p-3 rounded-full bg-green-500 relative">
            <Phone className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </a>
  );
};

export default FloatingCallButton;