import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Globe, Eye, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminHeader from '@/components/AdminHeader';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
}

export default function SEOManager() {
  const { toast } = useToast();
  const [seoData, setSeoData] = useState<SEOData>({
    title: 'Autoshop Setup - Setup trọn gói quán cafe trà sữa',
    description: 'SỞ HỮU NGAY QUÁN CÀ PHÊ TƯ VẤN HÀNH. Bạn sẽ nhận được một lượng máy văn hành tự động hoàn toàn kể cả khi vắng mặt.',
    keywords: 'quán cafe, trà sữa, setup quán, tự động hóa, kinh doanh cafe',
    ogTitle: 'Autoshop Setup - Setup trọn gói quán cafe trà sữa',
    ogDescription: 'Dịch vụ setup trọn gói quán cafe trà sữa tự động hoàn toàn. Tư vấn và hỗ trợ từ A-Z.',
    canonicalUrl: 'https://setupquan.autoshop.com.vn'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(seoData);

  const handleSave = async () => {
    try {
      // Cập nhật document title ngay lập tức
      document.title = tempData.title;
      
      // Cập nhật meta tags
      updateMetaTag('description', tempData.description);
      updateMetaTag('keywords', tempData.keywords);
      updateMetaTag('og:title', tempData.ogTitle);
      updateMetaTag('og:description', tempData.ogDescription);
      updateMetaTag('canonical', tempData.canonicalUrl);

      setSeoData(tempData);
      setIsEditing(false);
      
      toast({
        title: "Đã lưu thành công",
        description: "Thông tin SEO đã được cập nhật",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu thông tin SEO",
        variant: "destructive"
      });
    }
  };

  const updateMetaTag = (name: string, content: string) => {
    let selector = '';
    let attr = '';
    
    if (name === 'canonical') {
      selector = 'link[rel="canonical"]';
      attr = 'href';
    } else if (name.startsWith('og:')) {
      selector = `meta[property="${name}"]`;
      attr = 'content';
    } else {
      selector = `meta[name="${name}"]`;
      attr = 'content';
    }
    
    let element = document.querySelector(selector);
    if (!element && name === 'canonical') {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      document.head.appendChild(element);
    } else if (!element) {
      element = document.createElement('meta');
      if (name.startsWith('og:')) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    
    if (element) {
      element.setAttribute(attr, content);
    }
  };

  const handleCancel = () => {
    setTempData(seoData);
    setIsEditing(false);
  };

  const GooglePreview = ({ data }: { data: SEOData }) => (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Google Search Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-green-700">{data.canonicalUrl}</span>
          </div>
          <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
            {data.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <AdminHeader />
      <div className="max-w-6xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý SEO</h1>
            <p className="text-gray-600">Chỉnh sửa và xem trước thông tin SEO của website</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form chỉnh sửa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Thông tin SEO
                  <Badge variant={isEditing ? "destructive" : "secondary"}>
                    {isEditing ? "Đang chỉnh sửa" : "Chỉ xem"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Quản lý thông tin SEO cơ bản của website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Tiêu đề trang (Title Tag)</Label>
                  <Input
                    id="title"
                    value={tempData.title}
                    onChange={(e) => setTempData({...tempData, title: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Độ dài: {tempData.title.length}/60 ký tự
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Mô tả (Meta Description)</Label>
                  <Textarea
                    id="description"
                    value={tempData.description}
                    onChange={(e) => setTempData({...tempData, description: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Độ dài: {tempData.description.length}/160 ký tự
                  </p>
                </div>

                <div>
                  <Label htmlFor="keywords">Từ khóa (Keywords)</Label>
                  <Input
                    id="keywords"
                    value={tempData.keywords}
                    onChange={(e) => setTempData({...tempData, keywords: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Phân cách bằng dấu phẩy"
                  />
                </div>

                <div>
                  <Label htmlFor="canonicalUrl">Canonical URL</Label>
                  <Input
                    id="canonicalUrl"
                    value={tempData.canonicalUrl}
                    onChange={(e) => setTempData({...tempData, canonicalUrl: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Lưu thay đổi
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Hủy
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <div className="space-y-6">
              <GooglePreview data={isEditing ? tempData : seoData} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Open Graph Preview</CardTitle>
                  <CardDescription>Xem trước khi chia sẻ trên mạng xã hội</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-300 rounded-lg p-4 bg-white max-w-md">
                    <div className="w-full h-32 bg-gradient-to-r from-green-400 to-green-600 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-white font-semibold">Autoshop Setup</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {(isEditing ? tempData : seoData).ogTitle}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {(isEditing ? tempData : seoData).ogDescription}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {(isEditing ? tempData : seoData).canonicalUrl}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phân tích SEO</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Độ dài title</span>
                      <Badge variant={tempData.title.length <= 60 ? "default" : "destructive"}>
                        {tempData.title.length <= 60 ? "Tốt" : "Quá dài"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Độ dài description</span>
                      <Badge variant={tempData.description.length <= 160 ? "default" : "destructive"}>
                        {tempData.description.length <= 160 ? "Tốt" : "Quá dài"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Từ khóa</span>
                      <Badge variant={tempData.keywords ? "default" : "secondary"}>
                        {tempData.keywords ? "Có" : "Chưa có"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}