import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trackEvent } from "@/lib/analytics";

// Interface cho bài viết
interface BlogPost {
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

const BlogPost = () => {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  // Fetch dữ liệu bài viết từ API
  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
  });

  // Track khi xem bài viết
  useEffect(() => {
    if (post) {
      trackEvent('view_content', {
        content_type: 'blog_post',
        content_id: post.id,
        content_title: post.title,
        content_category: post.category
      });
    }
  }, [post]);

  // Format ngày tháng từ ISO string
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  // Xử lý khi người dùng click vào nút quay lại
  const handleBack = () => {
    window.history.back();
  };

  // Xử lý share bài viết
  const handleShare = () => {
    // Track share event
    trackEvent('share_content', {
      content_type: 'blog_post',
      content_id: post?.id,
      content_title: post?.title
    });
    
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
        .catch(console.error);
    } else {
      // Fallback nếu không hỗ trợ Web Share API
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(post?.title || '');
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <Skeleton className="h-64 w-full mb-8 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Không tìm thấy bài viết</h1>
        <p className="text-gray-600 mb-8">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button onClick={handleBack}>Quay lại</Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Nút quay lại */}
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-gray-100"
            onClick={handleBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách bài viết
          </Button>

          {/* Tiêu đề và thông tin bài viết */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          {/* Thông tin meta */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{post.author}</span>
            </div>
            <Badge className="bg-primary text-white font-medium">
              {post.category}
            </Badge>
          </div>

          {/* Ảnh đại diện */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/1200x600/e2e8f0/64748b?text=F%26B`;
              }}
            />
          </div>

          {/* Nội dung bài viết */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl font-medium text-gray-700 mb-6">{post.excerpt}</p>
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }} 
              className="prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={18} className="text-gray-500" />
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 text-center">
            <Button 
              onClick={handleShare}
              variant="outline"
              className="gap-2"
            >
              <Share2 size={18} />
              Chia sẻ bài viết
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;