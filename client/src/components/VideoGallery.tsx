import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  embedId: string;
}

const videoItems: VideoItem[] = [
  {
    id: "1",
    title: "Dagi Shark Coffee & Tea - Mô hình trà sữa cho học sinh, sinh viên",
    duration: "3:19",
    thumbnail: "https://img.youtube.com/vi/Qb2ek3S6kdA/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Qb2ek3S6kdA&t=1s",
    embedId: "Qb2ek3S6kdA"
  },
  {
    id: "2",
    title: "Lola Tea - Mô hình trà sữa và chè kết hợp cho khách trẻ, gia đình",
    duration: "4:25",
    thumbnail: "https://img.youtube.com/vi/AF2xJg_4Acs/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?time_continue=3&v=AF2xJg_4Acs",
    embedId: "AF2xJg_4Acs"
  },
  {
    id: "2b",
    title: "Thăm Lola Tea sau 1 năm vận hành - Đã hồi vốn và đem về doanh thu 10-15 Triệu/ngày",
    duration: "6:30",
    thumbnail: "https://img.youtube.com/vi/gFyrh2XHe1g/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=gFyrh2XHe1g",
    embedId: "gFyrh2XHe1g"
  },
  {
    id: "3",
    title: "Read Station - Chuỗi trạm đọc dành cho người mê sách, người làm việc",
    duration: "5:50",
    thumbnail: "https://img.youtube.com/vi/evBaN6CrrkM/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=evBaN6CrrkM",
    embedId: "evBaN6CrrkM"
  },
  {
    id: "4",
    title: "Lá Coffe - Mô hình quán trà sữa kết hợp bán hoa, cây cảnh",
    duration: "4:10",
    thumbnail: "https://img.youtube.com/vi/Dw2hVD6h-7U/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?time_continue=1&v=Dw2hVD6h-7U",
    embedId: "Dw2hVD6h-7U"
  },
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>("1");
  const [mainVideoKey, setMainVideoKey] = useState(0); // Force iframe reload

  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setActiveVideoId(video.id);
    setOpenDialog(true);
    // Force reload main video iframe without autoplay when dialog opens
    setMainVideoKey(prev => prev + 1);
  };

  return (
    <section id="video-gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            DỰ ÁN TIÊU BIỂU
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Những mô hình kinh doanh cà phê và trà sữa đã được setup bởi đội ngũ chuyên gia của Autoshop
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {videoItems.length} Videos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">Danh sách video</h3>
              <div className="space-y-2">
                {videoItems.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Number(video.id) * 0.1 }}
                    className={`flex items-center p-2 rounded-md cursor-pointer transition-all ${
                      activeVideoId === video.id
                        ? "bg-green-100 border border-green-300"
                        : "hover:bg-white border border-transparent"
                    }`}
                    onClick={() => handleSelectVideo(video)}
                  >
                    <div className="relative flex-shrink-0 w-16 h-10 mr-3 rounded overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/64x40/e2e8f0/64748b?text=Video";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-30 rounded-full w-5 h-5 flex items-center justify-center">
                          <Play className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-xs leading-4 mb-1 ${
                        activeVideoId === video.id ? "text-green-700" : "text-gray-800"
                      }`} style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {video.title}
                      </h4>
                      <p className={`text-xs ${
                        activeVideoId === video.id ? "text-green-600" : "text-gray-500"
                      }`}>
                        {video.duration}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg"
            >
              {openDialog ? (
                // Show placeholder when dialog is open to prevent double playback
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video đang phát trong cửa sổ mới</p>
                  </div>
                </div>
              ) : selectedVideo ? (
                <iframe
                  key={`main-${mainVideoKey}`}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.embedId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              ) : (
                <iframe
                  key={`main-default-${mainVideoKey}`}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoItems[0].embedId}`}
                  title={videoItems[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              )}
            </motion.div>
          </div>
        </div>

        {/* Nút dẫn đến Bản đồ Setup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a 
            href="https://bandosetup.autoshop.com.vn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300"
          >
            <span className="mr-2">BẢN ĐỒ SETUP TOÀN VIỆT NAM</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </motion.div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-md">
            {selectedVideo && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoGallery;