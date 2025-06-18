import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// Interface cho dữ liệu blog post từ API
interface ApiBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
  isPublished: boolean;
  tags?: string[];
}

// Dữ liệu mẫu cho trường hợp chưa có bài viết
const sampleBlogPosts = [
  {
    id: 1,
    title: "Hướng dẫn mở quán cà phê trọn gói - Từ A đến Z",
    excerpt: "Khám phá các bước then chốt để mở quán cà phê thành công từ khâu lên ý tưởng, tìm địa điểm, thiết kế không gian đến vận hành hiệu quả.",
    date: new Date().toISOString(),
    readTime: "8 phút",
    author: "Nguyễn Hoàng Phú",
    category: "Kinh doanh",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    slug: "huong-dan-mo-quan-ca-phe-tron-goi",
    content: "",
    isPublished: true
  },
  {
    id: 2,
    title: "10 Menu đồ uống bán chạy nhất cho quán cà phê hiện đại",
    excerpt: "Tổng hợp các công thức đồ uống phổ biến và được ưa chuộng nhất hiện nay, giúp quán của bạn thu hút khách hàng và tăng doanh thu.",
    date: new Date().toISOString(),
    readTime: "6 phút",
    author: "Kim Trọng Toàn",
    category: "Pha chế",
    image: "https://images.unsplash.com/photo-1572286258217-215cf2124a6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    slug: "10-menu-do-uong-ban-chay-nhat",
    content: "",
    isPublished: true
  },
  {
    id: 3,
    title: "Bí quyết lựa chọn thiết bị pha cà phê chuyên nghiệp",
    excerpt: "Hướng dẫn chi tiết về các loại máy pha chế, thiết bị và dụng cụ cần thiết để setup một quán cà phê chất lượng cao.",
    date: new Date().toISOString(),
    readTime: "7 phút",
    author: "Đinh Xuân Phong",
    category: "Thiết bị",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    slug: "bi-quyet-lua-chon-thiet-bi-pha-ca-phe",
    content: "",
    isPublished: true
  },
  {
    id: 4,
    title: "Cách tính chi phí và lợi nhuận cho quán cà phê mới mở",
    excerpt: "Phân tích và tính toán các khoản chi phí cố định, chi phí biến đổi và dự báo lợi nhuận cho một quán cà phê trong năm đầu tiên.",
    date: new Date().toISOString(),
    readTime: "10 phút",
    author: "Nguyễn Hồng Lâm",
    category: "Tài chính",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    slug: "cach-tinh-chi-phi-va-loi-nhuan",
    content: "",
    isPublished: true
  },
  {
    id: 5,
    title: "Chiến lược marketing hiệu quả cho quán cà phê trà sữa",
    excerpt: "Các chiến lược marketing online và offline giúp quán cà phê trà sữa của bạn nổi bật và thu hút khách hàng trong thị trường cạnh tranh.",
    date: new Date().toISOString(),
    readTime: "9 phút",
    author: "Thiên Du",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    slug: "chien-luoc-marketing-hieu-qua",
    content: "",
    isPublished: true
  },
  {
    id: 6,
    title: "Hành trình từ Barista đến chủ quán cà phê thành công",
    excerpt: "Câu chuyện truyền cảm hứng và những bài học kinh nghiệm từ những người đã thành công trong việc chuyển từ Barista thành chủ quán.",
    date: new Date().toISOString(),
    readTime: "8 phút",
    author: "Minh Trần",
    category: "Câu chuyện thành công",
    image: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    slug: "hanh-trinh-tu-barista-den-chu-quan",
    content: "",
    isPublished: true
  }
];

const BlogPosts = () => {
  const [isCreatingSample, setIsCreatingSample] = useState(false);

  // Sử dụng React Query để fetch dữ liệu bài viết
  const { data: blogPosts = [], isLoading, isError, error } = useQuery<ApiBlogPost[]>({
    queryKey: ['/api/blog'],
    retry: 1,
    staleTime: 60000 // 1 phút
  });
  
  // Tạo dữ liệu mẫu nếu chưa có bài viết
  const createSampleBlogPosts = async () => {
    if (isCreatingSample) return;
    
    setIsCreatingSample(true);
    try {
      for (const post of sampleBlogPosts) {
        await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });
      }
      // Reload trang sau khi tạo mẫu
      window.location.reload();
    } catch (error) {
      console.error('Error creating sample blog posts:', error);
    } finally {
      setIsCreatingSample(false);
    }
  };

  // Format ngày tháng từ ISO string
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  // Component hiển thị khi không có dữ liệu
  const EmptyState = () => (
    <div className="text-center py-16">
      <h3 className="text-xl font-semibold mb-4">Chưa có bài viết nào</h3>
      <p className="text-gray-600 mb-8">Bạn có thể thêm bài viết mới thông qua API hoặc tạo dữ liệu mẫu để xem trước.</p>
      <Button 
        onClick={createSampleBlogPosts}
        disabled={isCreatingSample}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        {isCreatingSample ? 'Đang tạo dữ liệu mẫu...' : 'Tạo dữ liệu mẫu'}
      </Button>
    </div>
  );

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-lg font-medium mb-2">KIẾN THỨC F&B</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            BÀI VIẾT CHIA SẺ KINH NGHIỆM
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tổng hợp những kiến thức, kinh nghiệm quý báu từ đội ngũ chuyên gia trong lĩnh vực F&B giúp bạn xây dựng và phát triển mô hình kinh doanh hiệu quả.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu: {(error as any)?.message || 'Không thể kết nối đến máy chủ'}</p>
            <EmptyState />
          </div>
        ) : !blogPosts || blogPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: ApiBlogPost, index: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/800x450/e2e8f0/64748b?text=F%26B`;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary hover:bg-primary/90 text-white font-medium px-3 py-1">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto font-medium text-primary group-hover:text-primary/80 transition-colors duration-300 flex items-center"
                        onClick={() => window.location.href = `/blog/${post.slug}`}
                      >
                        <span>Đọc tiếp</span>
                        <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                onClick={() => window.location.href = '/blog'}
              >
                Xem tất cả bài viết
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogPosts;