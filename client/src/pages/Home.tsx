import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features2 from "@/components/Features2";
import Stats from "@/components/Stats";
import BackToTop from "@/components/BackToTop";
import Partnership from "@/components/Partnership";
import WhyChooseUs from "@/components/WhyChooseUs";
import SetupPackage from "@/components/SetupPackage";
import Team from "@/components/Team";
import VideoGallery from "@/components/VideoGallery";

import FloatingCallButton from "@/components/FloatingCallButton";
import Footer from "@/components/Footer";

const Home = () => {
  useEffect(() => {
    // Set page title
    document.title = "Autoshop Setup - Setup trọn gói quán cafe trà sữa";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Dịch vụ setup trọn gói quán cafe, trà sữa tự động hoàn toàn. Tư vấn từ A-Z, hỗ trợ mở quán kinh doanh hiệu quả. Liên hệ ngay để nhận báo giá.');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Partnership />
        <Stats />
        <WhyChooseUs />
        <Features2 />
        <VideoGallery />
        <SetupPackage />
        <Team />
      </main>
      <Footer />
      <FloatingCallButton />
      <BackToTop />
    </div>
  );
};

export default Home;