import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface Project {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

const projectsData: Project[] = [
  {
    id: "1",
    title: "De Vivre - Măng Đen",
    duration: "3:25",
    thumbnail: "https://i.ibb.co/2kBpttj/devivre.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "2",
    title: "Her - Vũng Tàu",
    duration: "4:10",
    thumbnail: "https://i.ibb.co/2kBpttj/her.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "3",
    title: "Candles Cafe",
    duration: "2:45",
    thumbnail: "https://i.ibb.co/2kBpttj/candles.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "4",
    title: "Yumi Coffee & Tea",
    duration: "3:50",
    thumbnail: "https://i.ibb.co/2kBpttj/yumi.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "5",
    title: "TH Bistro",
    duration: "3:20",
    thumbnail: "https://i.ibb.co/2kBpttj/thbistro.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "6",
    title: "Hoa Gió Coffee",
    duration: "4:05",
    thumbnail: "https://i.ibb.co/2kBpttj/hoagio.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "7",
    title: "It's me Coffee",
    duration: "3:30",
    thumbnail: "https://i.ibb.co/2kBpttj/itsme.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "8",
    title: "M-Zone",
    duration: "2:50",
    thumbnail: "https://i.ibb.co/2kBpttj/mzone.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "9",
    title: "PH Coffee",
    duration: "3:15",
    thumbnail: "https://i.ibb.co/2kBpttj/ph.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "10",
    title: "Momo Coffee",
    duration: "3:40",
    thumbnail: "https://i.ibb.co/2kBpttj/momo.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "11",
    title: "SALA - Hải Phòng",
    duration: "4:20",
    thumbnail: "https://i.ibb.co/2kBpttj/sala.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
  {
    id: "12",
    title: "Cà phê nhà Thuý",
    duration: "3:10",
    thumbnail: "https://i.ibb.co/2kBpttj/thuy.jpg",
    videoUrl: "https://www.youtube.com/embed/ABCDEFGH",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  const handleSelectVideo = (project: Project) => {
    setSelectedProject(project);
    setVideoVisible(true);
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            THIẾT KẾ QUÁN CAFE
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Những dự án tiêu biểu AutoShop đã thực hiện trên toàn quốc với đa dạng phong cách thiết kế
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10">
          <div>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  <TabsTrigger value="north">Miền Bắc</TabsTrigger>
                  <TabsTrigger value="central">Miền Trung</TabsTrigger>
                  <TabsTrigger value="south">Miền Nam</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectsData.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="group relative rounded-lg overflow-hidden shadow-lg"
                    >
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Fallback if image doesn't load
                            e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=AutoShop+Design";
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            onClick={() => handleSelectVideo(project)}
                            variant="outline"
                            size="icon"
                            className="bg-white text-primary hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center"
                          >
                            <Play className="h-5 w-5" />
                          </Button>
                          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {project.duration}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="north" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectsData
                    .filter((p) => p.title.includes("Hải Phòng") || p.id === "5" || p.id === "8")
                    .map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="group relative rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=AutoShop+Design";
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              onClick={() => handleSelectVideo(project)}
                              variant="outline"
                              size="icon"
                              className="bg-white text-primary hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center"
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                            <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {project.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="central" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectsData
                    .filter((p) => p.title.includes("Măng Đen") || p.id === "3" || p.id === "6")
                    .map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="group relative rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=AutoShop+Design";
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              onClick={() => handleSelectVideo(project)}
                              variant="outline"
                              size="icon"
                              className="bg-white text-primary hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center"
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                            <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {project.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="south" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectsData
                    .filter((p) => p.title.includes("Vũng Tàu") || p.id === "4" || p.id === "9" || p.id === "10")
                    .map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="group relative rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=AutoShop+Design";
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              onClick={() => handleSelectVideo(project)}
                              variant="outline"
                              size="icon"
                              className="bg-white text-primary hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center"
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                            <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {project.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {videoVisible && selectedProject && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-5xl bg-white rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="font-semibold text-lg">{selectedProject.title}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setVideoVisible(false)}
                  >
                    Đóng
                  </Button>
                </div>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={selectedProject.videoUrl}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;