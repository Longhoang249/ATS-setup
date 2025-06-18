import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Pencil, Trash2, Plus, Eye, ArrowLeft, 
  Lightbulb, FileJson, FileCode, BookOpen 
} from "lucide-react";

// SEO and editor components
import SEOScoreAnalyzer from "@/components/SEOScoreAnalyzer";
import SEOTabs from "@/components/SEOTabs";
import TagInput from "@/components/TagInput";
import RichTextEditor from "@/components/RichTextEditor";
import FileUploader from "@/components/FileUploader";

// Interface cho dữ liệu blog post từ API
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
  
  // SEO fields
  canonicalUrl?: string;
  metaTitle?: string;
  metaKeywords?: string;
  structuredData?: string;
  updatedAt?: string;
  relatedPosts?: number[];
}

// Form data cho việc tạo/cập nhật bài viết
interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
  isPublished: boolean;
  tags?: string[];
  
  // SEO fields
  canonicalUrl?: string;
  metaTitle?: string;
  metaKeywords?: string;
  structuredData?: string;
  relatedPosts?: number[];
}

const BlogAdmin = () => {
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("content");
  const [keywordSEO, setKeywordSEO] = useState<string>("");
  
  // Form state
  const initialFormData: BlogPostFormData = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    readTime: "5 phút",
    author: "",
    category: "",
    image: "",
    isPublished: true,
    tags: [],
    canonicalUrl: "",
    metaTitle: "",
    metaKeywords: "",
    structuredData: ""
  };
  
  const [formData, setFormData] = useState<BlogPostFormData>(initialFormData);
  
  // Fetch blog posts
  const { data: blogPosts = [], isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    retry: 1,
  });

  // Create blog post mutation
  const createMutation = useMutation({
    mutationFn: async (newPost: BlogPostFormData) => {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsSheetOpen(false);
      resetForm();
      toast({
        title: "Thành công!",
        description: "Bài viết đã được tạo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi!",
        description: "Không thể tạo bài viết: " + (error as any).message,
        variant: "destructive",
      });
    },
  });

  // Update blog post mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BlogPostFormData }) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update blog post");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsSheetOpen(false);
      resetForm();
      toast({
        title: "Thành công!",
        description: "Bài viết đã được cập nhật.",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi!",
        description: "Không thể cập nhật bài viết: " + (error as any).message,
        variant: "destructive",
      });
    },
  });

  // Delete blog post mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog post");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "Thành công!",
        description: "Bài viết đã được xóa.",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi!",
        description: "Không thể xóa bài viết: " + (error as any).message,
        variant: "destructive",
      });
    },
  });

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: vi });
    } catch (error) {
      return dateString;
    }
  };

  // Function to generate slug from title
  const generateSlug = (title: string) => {
    return title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === "title" && !currentPostId) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.excerpt || !formData.content || !formData.slug) {
      toast({
        title: "Thiếu thông tin!",
        description: "Vui lòng điền đầy đủ các trường bắt buộc.",
        variant: "destructive",
      });
      return;
    }

    if (currentPostId) {
      updateMutation.mutate({ id: currentPostId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  // Handle tags change
  const handleTagsChange = (newTags: string[]) => {
    setFormData(prev => ({ ...prev, tags: newTags }));
  };
  
  // Handle file upload
  const handleFileUpload = async (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
    toast({
      title: "Tải lên thành công",
      description: "Hình ảnh đã được tải lên và cập nhật vào bài viết"
    });
  };

  // Open edit form
  const openEditForm = (post: BlogPost) => {
    setCurrentPostId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime,
      author: post.author,
      category: post.category,
      image: post.image,
      isPublished: post.isPublished,
      tags: post.tags || [],
      
      // SEO fields
      canonicalUrl: post.canonicalUrl || "",
      metaTitle: post.metaTitle || "",
      metaKeywords: post.metaKeywords || "",
      structuredData: post.structuredData || "",
      relatedPosts: post.relatedPosts || []
    });
    
    // Cập nhật từ khóa SEO từ dữ liệu hiện có
    setKeywordSEO(post.category || "");
    
    setIsSheetOpen(true);
  };

  // Open new post form
  const openNewPostForm = () => {
    setCurrentPostId(null);
    resetForm();
    setIsSheetOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setIsPreview(false);
    setActiveTab("content");
    setKeywordSEO("");
  };

  // Open delete confirmation
  const openDeleteConfirmation = (id: number) => {
    setCurrentPostId(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDelete = () => {
    if (currentPostId) {
      deleteMutation.mutate(currentPostId);
    }
  };

  // Toggle preview
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Format tags for display
  const formatTags = (tags?: string[]) => {
    return tags?.join(", ") || "";
  };
  
  // Generate structured data
  const generateStructuredData = () => {
    try {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": formData.metaTitle || formData.title,
        "description": formData.excerpt,
        "author": {
          "@type": "Person",
          "name": formData.author
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "image": formData.image,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://autoshop.com.vn/blog/${formData.slug}`
        },
        "publisher": {
          "@type": "Organization",
          "name": "Autoshop",
          "logo": {
            "@type": "ImageObject",
            "url": "https://autoshop.com.vn/logo.png"
          }
        },
        "keywords": formData.metaKeywords || formData.category
      };
      
      setFormData(prev => ({ 
        ...prev, 
        structuredData: JSON.stringify(structuredData, null, 2) 
      }));
      
      toast({
        title: "Thành công!",
        description: "Dữ liệu cấu trúc đã được tạo."
      });
    } catch (error) {
      toast({
        title: "Lỗi!",
        description: "Không thể tạo dữ liệu cấu trúc",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quản lý bài viết</h1>
          <p className="text-gray-600">Thêm, sửa và xóa bài viết trên trang web</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang chủ</span>
          </Button>
          <Button onClick={openNewPostForm} className="bg-primary hover:bg-primary/90">
            <Plus size={16} className="mr-2" />
            Bài viết mới
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg mb-4">Đã xảy ra lỗi khi tải dữ liệu!</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/blog'] })}>
            Thử lại
          </Button>
        </div>
      ) : !blogPosts || blogPosts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Chưa có bài viết nào</h2>
          <p className="text-gray-600 mb-6">Hãy tạo bài viết đầu tiên của bạn ngay bây giờ!</p>
          <Button onClick={openNewPostForm} className="bg-primary hover:bg-primary/90">
            <Plus size={16} className="mr-2" />
            Bài viết mới
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Ngày đăng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post: BlogPost) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell>
                  <div className="font-medium line-clamp-1">{post.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{post.slug}</div>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{formatDate(post.date)}</TableCell>
                <TableCell>
                  {post.isPublished ? (
                    <Badge className="bg-green-500 hover:bg-green-600">Đã xuất bản</Badge>
                  ) : (
                    <Badge variant="outline">Nháp</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => openEditForm(post)}
                    >
                      <Pencil size={14} />
                      <span className="sr-only">Sửa</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => openDeleteConfirmation(post.id)}
                    >
                      <Trash2 size={14} />
                      <span className="sr-only">Xóa</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Sheet for creating/editing blog posts */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-xl lg:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{currentPostId ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}</SheetTitle>
            <SheetDescription>
              {currentPostId
                ? "Cập nhật thông tin bài viết của bạn."
                : "Tạo một bài viết mới cho trang web."}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <Button
                type="button"
                variant={isPreview ? "outline" : "default"}
                size="sm"
                onClick={() => setIsPreview(false)}
              >
                Chỉnh sửa
              </Button>
              <Button
                type="button"
                variant={isPreview ? "default" : "outline"}
                size="sm"
                onClick={togglePreview}
              >
                <Eye size={16} className="mr-2" />
                Xem trước
              </Button>
            </div>

            {isPreview ? (
              <div className="bg-white rounded-md border p-6">
                <h1 className="text-2xl font-bold mb-2">{formData.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary">{formData.category}</Badge>
                  <span className="text-sm text-gray-500">
                    {formData.readTime} đọc • {formData.author}
                  </span>
                </div>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-md mb-6"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/800x450/e2e8f0/64748b?text=Preview`;
                    }}
                  />
                )}
                <div className="prose max-w-none">
                  <p className="text-lg font-medium mb-6">{formData.excerpt}</p>
                  <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content" className="flex items-center gap-1">
                      <FileCode size={16} />
                      <span>Nội dung</span>
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="flex items-center gap-1">
                      <Lightbulb size={16} />
                      <span>SEO Score</span>
                    </TabsTrigger>
                    <TabsTrigger value="meta" className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>SEO/Meta</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Tiêu đề <span className="text-red-500">*</span></Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Nhập tiêu đề bài viết"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                        <Input
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          placeholder="ten-bai-viet"
                          required
                        />
                        <p className="text-xs text-gray-500">URL của bài viết, chỉ bao gồm chữ thường, số và dấu gạch ngang</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="author">Tác giả <span className="text-red-500">*</span></Label>
                          <Input
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Tên tác giả"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Danh mục <span className="text-red-500">*</span></Label>
                          <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Danh mục"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="readTime">Thời gian đọc</Label>
                          <Input
                            id="readTime"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleInputChange}
                            placeholder="5 phút"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="isPublished">Trạng thái</Label>
                          <select
                            id="isPublished"
                            name="isPublished"
                            value={formData.isPublished.toString()}
                            onChange={(e) => setFormData({...formData, isPublished: e.target.value === 'true'})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="true">Xuất bản</option>
                            <option value="false">Lưu nháp</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">Hình ảnh bài viết</Label>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <FileUploader 
                              onFileUpload={handleFileUpload}
                              accept="image/*"
                              maxSize={5}
                            />
                          </div>
                          {formData.image && (
                            <div className="border rounded-md p-2">
                              <img 
                                src={formData.image} 
                                alt="Preview" 
                                className="w-full h-32 object-contain"
                                onError={(e) => {
                                  e.currentTarget.src = `https://placehold.co/800x450/e2e8f0/64748b?text=Preview`;
                                }}
                              />
                              <div className="mt-2 flex justify-between items-center">
                                <span className="text-xs text-gray-500 truncate max-w-[200px]">
                                  {formData.image}
                                </span>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                >
                                  Xóa
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <TagInput 
                          value={formData.tags || []}
                          onChange={handleTagsChange}
                          placeholder="Thêm tag và nhấn Enter"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Tóm tắt <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="excerpt"
                          name="excerpt"
                          value={formData.excerpt}
                          onChange={handleInputChange}
                          placeholder="Tóm tắt ngắn về bài viết"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Nội dung <span className="text-red-500">*</span></Label>
                        <RichTextEditor
                          content={formData.content}
                          onChange={(content) => setFormData({...formData, content})}
                          placeholder="Nhập nội dung bài viết của bạn ở đây..."
                          editorClassName="min-h-[300px] border rounded-md p-4"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="mt-4">
                    <SEOScoreAnalyzer
                      title={formData.title}
                      content={formData.content}
                      keyword={keywordSEO}
                      excerpt={formData.excerpt}
                      slug={formData.slug}
                      hasImage={!!formData.image}
                      onKeywordChange={(keyword) => {
                        setKeywordSEO(keyword);
                        // Cập nhật cả trường category và metaKeywords
                        setFormData(prev => ({ 
                          ...prev, 
                          category: keyword,
                          metaKeywords: prev.metaKeywords || keyword 
                        }));
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="meta" className="mt-4">
                    <SEOTabs
                      title={formData.title}
                      excerpt={formData.excerpt}
                      slug={formData.slug}
                      canonicalUrl={formData.canonicalUrl || ""}
                      metaTitle={formData.metaTitle || ""}
                      metaKeywords={formData.metaKeywords || ""}
                      image={formData.image}
                      onMetaTitleChange={(value) => setFormData(prev => ({ ...prev, metaTitle: value }))}
                      onMetaKeywordsChange={(value) => setFormData(prev => ({ ...prev, metaKeywords: value }))}
                      onCanonicalUrlChange={(value) => setFormData(prev => ({ ...prev, canonicalUrl: value }))}
                      onGenerateStructuredData={generateStructuredData}
                      className="mb-6"
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="pt-4 flex justify-end gap-2 mt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsSheetOpen(false);
                      resetForm();
                    }}
                  >
                    Hủy
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {createMutation.isPending || updateMutation.isPending ? (
                      <>Đang lưu...</>
                    ) : currentPostId ? (
                      <>Cập nhật</>
                    ) : (
                      <>Tạo bài viết</>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogAdmin;