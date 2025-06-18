import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ArrowUpRight, TrendingUp, Users, Eye, MousePointerClick, Clock, Search, Award } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  views?: number;
  clicks?: number;
  rank?: number;
  score?: number;
}

interface KeywordData {
  keyword: string;
  volume: number;
  position: number;
  change: number;
}

interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

// Dữ liệu mẫu
const sampleTrafficData = [
  { month: 'T1', visits: 140, views: 120, clicks: 80 },
  { month: 'T2', visits: 180, views: 150, clicks: 95 },
  { month: 'T3', visits: 220, views: 190, clicks: 125 },
  { month: 'T4', visits: 300, views: 280, clicks: 190 },
  { month: 'T5', visits: 450, views: 400, clicks: 230 },
  { month: 'T6', visits: 590, views: 500, clicks: 320 },
];

const topKeywords: KeywordData[] = [
  { keyword: 'setup quán cà phê', volume: 1200, position: 3, change: 2 },
  { keyword: 'chi phí mở quán cà phê', volume: 880, position: 5, change: 1 },
  { keyword: 'quy trình pha chế cà phê', volume: 750, position: 4, change: -1 },
  { keyword: 'trang trí quán cà phê', volume: 620, position: 7, change: 3 },
  { keyword: 'mẫu quán cà phê đẹp', volume: 580, position: 9, change: 0 },
];

const trafficSources: TrafficSource[] = [
  { source: 'Tìm kiếm hữu cơ', visits: 1250, percentage: 64 },
  { source: 'Liên kết trực tiếp', visits: 420, percentage: 21 },
  { source: 'Mạng xã hội', visits: 210, percentage: 11 },
  { source: 'Khác', visits: 80, percentage: 4 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function SEOAnalytics() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  
  // Fetch blog posts from your API
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });
  
  // Add random analytics data for demo purposes
  const postsWithAnalytics = blogPosts.map(post => ({
    ...post,
    views: Math.floor(Math.random() * 1000) + 100,
    clicks: Math.floor(Math.random() * 500) + 50,
    rank: Math.floor(Math.random() * 30) + 1,
    score: Math.floor(Math.random() * 40) + 60,
  }));

  // Get the selected post details
  const selectedPost = selectedPostId
    ? postsWithAnalytics.find(post => post.id === selectedPostId)
    : postsWithAnalytics[0];

  useEffect(() => {
    // Set the first post as selected by default
    if (postsWithAnalytics.length > 0 && !selectedPostId) {
      setSelectedPostId(postsWithAnalytics[0].id);
    }
  }, [postsWithAnalytics, selectedPostId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Phân tích SEO</h1>
          <p className="text-gray-600">Theo dõi hiệu quả SEO của các bài viết trên trang</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tổng lượt xem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3,240</div>
                  <p className="text-xs text-gray-500">Trong 30 ngày qua</p>
                </div>
                <div className="ml-auto flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> +14%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tổng lượt click</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2">
                  <MousePointerClick className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1,867</div>
                  <p className="text-xs text-gray-500">Trong 30 ngày qua</p>
                </div>
                <div className="ml-auto flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> +7.4%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tỷ lệ nhấp chuột</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5.8%</div>
                  <p className="text-xs text-gray-500">Trung bình trên trang</p>
                </div>
                <div className="ml-auto flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> +1.2%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Số từ khóa xếp hạng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-gray-500">Top 10 Google</p>
                </div>
                <div className="ml-auto flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> +5
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Lưu lượng truy cập</CardTitle>
                <CardDescription>Lượt truy cập trong 6 tháng gần nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={sampleTrafficData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      name="Lượt truy cập"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      name="Lượt xem"
                      stroke="#82ca9d" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clicks" 
                      name="Lượt click"
                      stroke="#ffc658" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Nguồn lưu lượng</CardTitle>
                <CardDescription>Phân bổ lưu lượng theo nguồn</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visits"
                      nameKey="source"
                      label={({ source, percentage }) => `${source}: ${percentage}%`}
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Từ khóa xếp hạng hàng đầu</CardTitle>
              <CardDescription>Top 5 từ khóa có hiệu suất tốt nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Từ khóa</th>
                      <th className="text-left py-3 px-4">Lượng tìm kiếm</th>
                      <th className="text-left py-3 px-4">Vị trí</th>
                      <th className="text-left py-3 px-4">Thay đổi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topKeywords.map((keyword, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{keyword.keyword}</td>
                        <td className="py-3 px-4">{keyword.volume}/tháng</td>
                        <td className="py-3 px-4">{keyword.position}</td>
                        <td className="py-3 px-4">
                          <span className={`flex items-center ${keyword.change > 0 ? 'text-green-500' : keyword.change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                            {keyword.change > 0 ? '↑' : keyword.change < 0 ? '↓' : '−'}
                            {Math.abs(keyword.change)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất bài viết</CardTitle>
              <CardDescription>So sánh hiệu suất của các bài viết trên trang</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap gap-2">
                  {postsWithAnalytics.map((post) => (
                    <Button 
                      key={post.id}
                      variant={selectedPostId === post.id ? "default" : "outline"}
                      onClick={() => setSelectedPostId(post.id)}
                      className="text-sm"
                    >
                      {post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}
                    </Button>
                  ))}
                </div>

                {selectedPost && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{selectedPost.title}</h3>
                      <p className="text-gray-600 mb-4">{selectedPost.excerpt}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Điểm SEO: {selectedPost.score}/100</span>
                            <span className="text-sm font-medium">{selectedPost.score}%</span>
                          </div>
                          <Progress value={selectedPost.score} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <Eye className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm font-medium">Lượt xem</span>
                            </div>
                            <p className="text-2xl font-bold">{selectedPost.views}</p>
                          </div>
                          
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <MousePointerClick className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm font-medium">Lượt click</span>
                            </div>
                            <p className="text-2xl font-bold">{selectedPost.clicks}</p>
                          </div>
                          
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <Search className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm font-medium">Thứ hạng TB</span>
                            </div>
                            <p className="text-2xl font-bold">{selectedPost.rank}</p>
                          </div>
                          
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm font-medium">CTR</span>
                            </div>
                            <p className="text-2xl font-bold">
                              {((selectedPost.clicks! / selectedPost.views!) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Xu hướng hiệu suất</h3>
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart
                          data={[
                            { name: 'T.3', value: Math.floor(Math.random() * 100) + 50 },
                            { name: 'T.4', value: Math.floor(Math.random() * 100) + 50 },
                            { name: 'T.5', value: Math.floor(Math.random() * 100) + 50 },
                            { name: 'T.6', value: Math.floor(Math.random() * 100) + 50 },
                            { name: 'T.7', value: Math.floor(Math.random() * 100) + 50 },
                            { name: 'T.8', value: Math.floor(Math.random() * 100) + 50 },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" name="Lượt xem" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Các đề xuất cải thiện SEO</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  <CardTitle className="text-base">Tối ưu hóa nội dung</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Thêm các từ khóa liên quan vào các bài viết hiện có</li>
                  <li>Cập nhật nội dung cũ để cải thiện thứ hạng</li>
                  <li>Tạo nội dung chuyên sâu về từ khóa "setup quán cà phê"</li>
                  <li>Mở rộng các bài viết ngắn lên ít nhất 1500 từ</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  <CardTitle className="text-base">Chiến lược link building</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Liên hệ với 5 website ngành F&B để đặt backlink</li>
                  <li>Tăng cường liên kết nội bộ giữa các bài viết</li>
                  <li>Cập nhật các liên kết hỏng trong nội dung cũ</li>
                  <li>Tối ưu anchor text cho các liên kết</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle className="text-base">Trải nghiệm người dùng</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Cải thiện tốc độ tải trang cho phiên bản di động</li>
                  <li>Thêm các câu hỏi thường gặp vào bài viết</li>
                  <li>Tối ưu hóa hình ảnh để tăng tốc độ tải</li>
                  <li>Cải thiện bố cục trang để giảm tỷ lệ thoát</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-500" />
                  <CardTitle className="text-base">Các chủ đề cần triển khai</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Tạo nội dung mới về "Trang trí quán cà phê giá rẻ"</li>
                  <li>Tạo hướng dẫn chi tiết về "Quy trình đào tạo nhân viên"</li>
                  <li>Làm một series về xu hướng F&B mới nhất</li>
                  <li>Tạo một kho thư viện mẫu thiết kế quán cafe</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
