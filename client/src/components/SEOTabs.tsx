import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InfoIcon, Share, Link, RefreshCw, FileJson } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SEOTabsProps {
  title: string;
  excerpt: string;
  slug: string;
  canonicalUrl: string;
  metaTitle: string;
  metaKeywords: string;
  image: string;
  onMetaTitleChange: (value: string) => void;
  onMetaKeywordsChange: (value: string) => void;
  onCanonicalUrlChange: (value: string) => void;
  onGenerateStructuredData: () => void;
  className?: string;
}

const SEOTabs = ({
  title,
  excerpt,
  slug,
  canonicalUrl,
  metaTitle,
  metaKeywords,
  image,
  onMetaTitleChange,
  onMetaKeywordsChange,
  onCanonicalUrlChange,
  onGenerateStructuredData,
  className = ''
}: SEOTabsProps) => {
  const [seoTitle, setSeoTitle] = useState(metaTitle || title);
  const [seoKeywords, setSeoKeywords] = useState(metaKeywords || '');
  const [seoCanonical, setSeoCanonical] = useState(canonicalUrl || '');
  const [baseUrl, setBaseUrl] = useState('');
  
  // Set base URL when component mounts
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);
  
  // Update parent component when values change
  useEffect(() => {
    onMetaTitleChange(seoTitle);
  }, [seoTitle, onMetaTitleChange]);
  
  useEffect(() => {
    onMetaKeywordsChange(seoKeywords);
  }, [seoKeywords, onMetaKeywordsChange]);
  
  useEffect(() => {
    onCanonicalUrlChange(seoCanonical);
  }, [seoCanonical, onCanonicalUrlChange]);

  // Set default SEO title when title changes
  useEffect(() => {
    if (!metaTitle || metaTitle === '') {
      setSeoTitle(title);
    }
  }, [title, metaTitle]);
  
  // Create default canonical URL if not set
  const getDefaultCanonicalUrl = () => {
    return `${baseUrl}/blog/${slug}`;
  };
  
  return (
    <div className={className}>
      <Tabs defaultValue="meta" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="meta">
            Meta Tags
          </TabsTrigger>
          <TabsTrigger value="preview">
            Search Preview
          </TabsTrigger>
          <TabsTrigger value="schema">
            Schema.org
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="meta" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="seo-title">Meta Title</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Tiêu đề hiển thị trên kết quả tìm kiếm. Tốt nhất nên giữ dưới 60 ký tự.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="seo-title"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Tiêu đề hiển thị trên kết quả tìm kiếm"
                maxLength={120}
              />
              <Badge 
                variant={seoTitle.length <= 60 ? "secondary" : seoTitle.length <= 70 ? "outline" : "destructive"}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 font-mono opacity-70 ${
                  seoTitle.length <= 60 ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                  seoTitle.length <= 70 ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                  "bg-red-100 text-red-800 hover:bg-red-100"
                }`}
              >
                {seoTitle.length}/60
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="seo-description">Meta Description</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Mô tả hiển thị dưới tiêu đề trong kết quả tìm kiếm. Độ dài lý tưởng là 155-160 ký tự.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Textarea
                disabled
                value={excerpt}
                placeholder="Mô tả được lấy từ trường 'Tóm tắt' của bài viết"
                rows={3}
                className="resize-none"
              />
              <Badge 
                variant={excerpt.length <= 155 ? "secondary" : excerpt.length <= 165 ? "outline" : "destructive"}
                className={`absolute right-2 bottom-2 font-mono opacity-70 ${
                  excerpt.length <= 155 ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                  excerpt.length <= 165 ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                  "bg-red-100 text-red-800 hover:bg-red-100"
                }`}
              >
                {excerpt.length}/155
              </Badge>
            </div>
            <p className="text-xs text-gray-500">* Để thay đổi mô tả meta, hãy chỉnh sửa phần "Tóm tắt" của bài viết</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="seo-keywords">Meta Keywords</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Từ khóa phân tách bằng dấu phẩy. Mặc dù ảnh hưởng SEO không lớn, nhưng vẫn nên điền cho đầy đủ.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="seo-keywords"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="từ-khóa-1, từ-khóa-2, từ-khóa-3"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="canonical-url">Canonical URL</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 ml-1 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>URL gốc cho bài viết này. Điền URL gốc nếu nội dung này là bản sao từ trang khác.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-2">
              <Input
                id="canonical-url"
                value={seoCanonical}
                onChange={(e) => setSeoCanonical(e.target.value)}
                placeholder={getDefaultCanonicalUrl()}
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSeoCanonical(getDefaultCanonicalUrl())}
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">* Để trống nếu đây là bài viết gốc</p>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <div className="bg-white rounded border p-4">
            <h3 className="text-sm font-medium mb-3">Xem trước kết quả tìm kiếm</h3>
            <div className="space-y-2 border p-3 rounded-md">
              <div className="flex items-center text-xs text-green-700 gap-0.5 mb-1">
                <span className="max-w-[280px] truncate">{baseUrl}/blog/{slug}</span>
                <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </div>
              <h2 className="text-base font-medium text-blue-700 break-words line-clamp-1">{seoTitle || title}</h2>
              <p className="text-xs text-gray-600 line-clamp-2">{excerpt}</p>
            </div>
            
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium mb-1">Open Graph / Social Sharing</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-100 h-32 flex items-center justify-center">
                  {image ? (
                    <img 
                      src={image} 
                      alt="Preview thumbnail" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/a1a1aa?text=No+Image';
                      }}  
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No image provided</div>
                  )}
                </div>
                <div className="p-3 bg-white">
                  <div className="text-xs text-gray-500 mb-1">{baseUrl}</div>
                  <h3 className="text-sm font-medium mb-1 line-clamp-1">{seoTitle || title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{excerpt}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schema" className="space-y-4">
          <div className="bg-white rounded border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Schema.org JSON-LD</h3>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-1.5"
                onClick={onGenerateStructuredData}
              >
                <FileJson className="h-4 w-4" />
                Tạo cấu trúc dữ liệu
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1.5">
                    <FileJson className="h-3.5 w-3.5" />
                    Article
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <Share className="h-3.5 w-3.5" />
                    BreadcrumbList
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Dữ liệu có cấu trúc giúp Google hiểu nội dung trang web của bạn và hiển thị nổi bật trong kết quả tìm kiếm.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center">
                  <span>Sẽ được tạo tự động khi lưu bài viết</span>
                </Label>
                <div className="bg-gray-50 rounded border p-3 text-xs text-gray-500 font-mono h-32 overflow-auto">
{`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${seoTitle || title}",
  "description": "${excerpt}",
  "image": "${image}",
  "author": {
    "@type": "Person",
    "name": "AUTOSHOP"
  },
  ...
}`}
                </div>
                <p className="text-xs text-gray-500">* Schema.org được tự động tạo dựa trên nội dung bài viết</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOTabs;