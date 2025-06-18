import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  X,
  AlertCircle,
  BarChart3,
  PenLine,
  ListChecks,
  Image,
  Link2,
} from "lucide-react";

interface SEOScoreProps {
  title: string;
  content: string;
  keyword: string;
  excerpt: string;
  slug: string;
  hasImage: boolean;
  onKeywordChange: (keyword: string) => void;
}

export const SEOScoreAnalyzer = ({
  title,
  content,
  keyword,
  excerpt,
  slug,
  hasImage,
  onKeywordChange,
}: SEOScoreProps) => {
  const [score, setScore] = useState<number>(0);
  const [localKeyword, setLocalKeyword] = useState<string>(keyword || "");
  const [analyses, setAnalyses] = useState<{
    passed: { label: string; description: string }[];
    improvements: { label: string; description: string }[];
    problems: { label: string; description: string }[];
  }>({
    passed: [],
    improvements: [],
    problems: [],
  });

  // Đồng bộ keyword từ props
  useEffect(() => {
    if (keyword !== localKeyword) {
      setLocalKeyword(keyword || "");
    }
  }, [keyword]);

  // Phân tích SEO mỗi khi các thành phần thay đổi - với tối ưu cho nội dung lớn
  useEffect(() => {
    // Sử dụng keyword từ props để phân tích
    const keywordToAnalyze = keyword || "";
    if (!keywordToAnalyze) return;

    // Sử dụng setTimeout để tránh treo UI với nội dung lớn
    const timeoutId = setTimeout(() => {
      const passed: { label: string; description: string }[] = [];
      const improvements: { label: string; description: string }[] = [];
      const problems: { label: string; description: string }[] = [];

      // Phân tích tiêu đề
      if (title.length > 0) {
        if (title.toLowerCase().includes(keywordToAnalyze.toLowerCase())) {
          passed.push({
            label: "Tiêu đề có chứa từ khóa",
            description: "Tốt! Tiêu đề của bạn có chứa từ khóa chính.",
          });
        } else {
          problems.push({
            label: "Tiêu đề không chứa từ khóa",
            description: "Thêm từ khóa '" + keywordToAnalyze + "' vào tiêu đề để cải thiện SEO.",
          });
        }

        if (title.length < 60) {
          passed.push({
            label: "Độ dài tiêu đề tốt",
            description: "Tiêu đề của bạn có độ dài phù hợp để hiển thị trên Google.",
          });
        } else {
          improvements.push({
            label: "Tiêu đề quá dài",
            description: "Tiêu đề có " + title.length + " ký tự. Nên giữ dưới 60 ký tự để hiển thị đầy đủ trên Google.",
          });
        }
      } else {
        problems.push({
          label: "Chưa có tiêu đề",
          description: "Bạn cần thêm tiêu đề cho bài viết.",
        });
      }

      // Phân tích slug
      if (slug.length > 0) {
        if (slug.toLowerCase().includes(keywordToAnalyze.toLowerCase().replace(/\s+/g, "-"))) {
          passed.push({
            label: "URL thân thiện có chứa từ khóa",
            description: "Tốt! URL của bạn có chứa từ khóa chính."
          });
        } else {
          improvements.push({
            label: "URL không chứa từ khóa",
            description: "Thêm từ khóa vào URL để cải thiện SEO."
          });
        }
      } else {
        problems.push({
          label: "Chưa có URL",
          description: "Bạn cần thêm slug để tạo URL thân thiện."
        });
      }

      // Phân tích đoạn tóm tắt
      if (excerpt.length > 0) {
        if (excerpt.toLowerCase().includes(keywordToAnalyze.toLowerCase())) {
          passed.push({
            label: "Mô tả có chứa từ khóa",
            description: "Tốt! Đoạn tóm tắt có chứa từ khóa chính."
          });
        } else {
          improvements.push({
            label: "Mô tả không chứa từ khóa",
            description: "Thêm từ khóa vào đoạn tóm tắt để cải thiện SEO."
          });
        }

        if (excerpt.length > 120 && excerpt.length < 160) {
          passed.push({
            label: "Độ dài mô tả tốt",
            description: "Đoạn tóm tắt có độ dài phù hợp để hiển thị trên Google."
          });
        } else if (excerpt.length <= 120) {
          improvements.push({
            label: "Mô tả hơi ngắn",
            description: "Đoạn tóm tắt có " + excerpt.length + " ký tự. Nên có 120-160 ký tự để hiển thị tốt trên Google."
          });
        } else {
          improvements.push({
            label: "Mô tả quá dài",
            description: "Đoạn tóm tắt có " + excerpt.length + " ký tự. Nên giữ dưới 160 ký tự để hiển thị đầy đủ trên Google."
          });
        }
      } else {
        problems.push({
          label: "Chưa có mô tả",
          description: "Bạn cần thêm đoạn tóm tắt cho bài viết."
        });
      }

      // Phân tích nội dung với tối ưu hóa cho nội dung lớn
      if (content.length > 0) {
        // Tối ưu hóa đếm từ cho nội dung lớn
        let wordCount = 0;
        
        // Với nội dung thông thường, đếm từ trực tiếp
        // Nếu nội dung quá lớn, hãy ước tính
        try {
          if (content.length > 100000) {
            // Ước tính số từ dựa trên tỷ lệ ký tự
            wordCount = Math.round(content.length / 6); // Ước tính trung bình 6 ký tự/từ trong tiếng Việt
          } else {
            wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
          }
          
          // Ước tính mật độ từ khóa - giản lược cho nội dung lớn
          let keywordDensity = 0;
          try {
            // Đơn giản hóa đếm từ khóa để tránh treo UI
            if (content.length > 100000) {
              // Lấy mẫu nội dung
              const sampleText = content.substring(0, 50000);
              // Đếm từ khóa trong mẫu
              const keywordRegex = new RegExp(keywordToAnalyze, 'gi');
              const matches = sampleText.match(keywordRegex) || [];
              // Ước tính tỷ lệ
              keywordDensity = (matches.length / (wordCount / 2)) * 100;
            } else {
              const keywordRegex = new RegExp(keywordToAnalyze, 'gi');
              const matches = content.match(keywordRegex) || [];
              keywordDensity = (matches.length / wordCount) * 100;
            }
          } catch (error) {
            console.error("Lỗi khi tính mật độ từ khóa:", error);
            keywordDensity = 0;
          }
        
          if (wordCount < 300) {
            problems.push({
              label: "Nội dung quá ngắn",
              description: "Bài viết chỉ có " + wordCount + " từ. Nên có ít nhất 300 từ cho bài viết SEO tốt."
            });
          } else if (wordCount < 600) {
            improvements.push({
              label: "Nội dung hơi ngắn",
              description: "Bài viết có " + wordCount + " từ. Nên có ít nhất 600 từ cho bài viết SEO tốt hơn."
            });
          } else {
            passed.push({
              label: "Độ dài nội dung tốt",
              description: "Bài viết có " + wordCount + " từ, đủ dài cho SEO tốt."
            });
          }

          if (keywordDensity > 0 && keywordDensity <= 2.5) {
            passed.push({
              label: "Mật độ từ khóa tốt",
              description: "Mật độ từ khóa là " + keywordDensity.toFixed(1) + "%, nằm trong khoảng lý tưởng (0.5% - 2.5%)."
            });
          } else if (keywordDensity > 2.5) {
            improvements.push({
              label: "Mật độ từ khóa cao",
              description: "Mật độ từ khóa là " + keywordDensity.toFixed(1) + "%, có thể bị coi là spam. Nên giữ dưới 2.5%."
            });
          } else {
            problems.push({
              label: "Mật độ từ khóa thấp",
              description: "Từ khóa '" + keywordToAnalyze + "' hiếm khi xuất hiện trong nội dung. Nên thêm vào để cải thiện SEO."
            });
          }

          // Tối ưu kiểm tra tiêu đề phụ và liên kết cho nội dung lớn
          const hasSubheadings = /<h[2-3][^>]*>.*?<\/h[2-3]>/i.test(content.substring(0, 50000));
          const hasLinks = /<a[^>]*href=["'][^"']*["'][^>]*>/i.test(content.substring(0, 50000));
          
          if (hasSubheadings) {
            passed.push({
              label: "Có sử dụng tiêu đề phụ",
              description: "Tốt! Bài viết của bạn sử dụng các tiêu đề phụ (H2, H3) để phân chia nội dung."
            });
          } else {
            improvements.push({
              label: "Thiếu tiêu đề phụ",
              description: "Nên sử dụng các tiêu đề phụ (H2, H3) để phân chia nội dung thành các phần nhỏ, dễ đọc hơn."
            });
          }
          
          if (hasLinks) {
            passed.push({
              label: "Có sử dụng liên kết",
              description: "Tốt! Bài viết của bạn có các liên kết đến nội dung khác."
            });
          } else {
            improvements.push({
              label: "Thiếu liên kết",
              description: "Nên thêm các liên kết nội bộ và ngoại bộ để tăng tính liên kết cho SEO."
            });
          }
        } catch (error) {
          console.error("Lỗi khi phân tích nội dung:", error);
          problems.push({
            label: "Lỗi phân tích nội dung",
            description: "Có lỗi khi phân tích nội dung. Nội dung có thể quá lớn hoặc có định dạng không phù hợp."
          });
        }
      } else {
        problems.push({
          label: "Chưa có nội dung",
          description: "Bạn cần thêm nội dung cho bài viết."
        });
      }

      // Phân tích hình ảnh
      if (hasImage) {
        passed.push({
          label: "Có sử dụng hình ảnh",
          description: "Tốt! Bài viết của bạn có hình ảnh đại diện."
        });
      } else {
        problems.push({
          label: "Thiếu hình ảnh",
          description: "Nên thêm ít nhất một hình ảnh đại diện cho bài viết."
        });
      }

      // Cập nhật phân tích
      setAnalyses({
        passed,
        improvements,
        problems,
      });

      // Tính điểm SEO
      const totalPoints = passed.length * 3 + improvements.length * 1;
      const maxPoints = (passed.length + improvements.length + problems.length) * 3;
      const calculatedScore = Math.round((totalPoints / maxPoints) * 100);
      setScore(calculatedScore > 0 ? calculatedScore : 0);
    }, 100); // Thêm độ trễ nhỏ để tránh treo UI

    // Dọn dẹp
    return () => clearTimeout(timeoutId);
  }, [title, content, keyword, excerpt, slug, hasImage]);

  // Xác định màu sắc dựa trên điểm số
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  // Xác định màu sắc cho progress bar
  const getProgressColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  // Xác định đánh giá dựa trên điểm số
  const getScoreLabel = () => {
    if (score >= 80) return "Tốt";
    if (score >= 50) return "Cần cải thiện";
    return "Không tốt";
  };

  // Xử lý khi nhấn nút đặt từ khóa
  const handleSetKeyword = () => {
    if (localKeyword) {
      onKeywordChange(localKeyword);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Phân tích SEO
          </h3>
          <div className="text-gray-500 text-sm flex items-center mt-1">
            <span className="mr-1">Từ khóa:</span> 
            {keyword ? (
              <span className="inline-flex items-center">
                <Badge variant="outline" className="ml-1">{keyword}</Badge>
              </span>
            ) : (
              <span className="italic text-gray-400">Chưa đặt</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor()}`}>{score}</div>
            <div className="text-sm text-gray-500">Điểm</div>
          </div>
          <div className="w-28">
            <Progress
              value={score}
              className={`h-2 ${getProgressColor()}`}
            />
            <p className="text-xs text-gray-500 mt-1 text-center">{getScoreLabel()}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
          <div className="w-full">
            <p className="text-amber-800 font-medium">Từ khóa chính</p>
            <p className="text-amber-700 text-sm mb-2">
              {!keyword ? "Nhập từ khóa chính để nhận phân tích SEO chi tiết." : "Cập nhật từ khóa để tối ưu SEO."}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center w-full">
                <Input
                  type="text"
                  placeholder="Nhập từ khóa chính..."
                  className="rounded-r-none"
                  value={localKeyword}
                  onChange={(e) => setLocalKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSetKeyword();
                    }
                  }}
                />
                <Button 
                  variant="default" 
                  size="sm"
                  className="rounded-l-none h-10"
                  onClick={handleSetKeyword}
                >
                  <PenLine className="h-4 w-4 mr-1" /> Đặt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="problems" className="w-full">
        {analyses.problems.length > 0 && (
          <AccordionItem value="problems">
            <AccordionTrigger className="text-red-500 hover:text-red-600 hover:no-underline">
              <div className="flex items-center">
                <X className="h-4 w-4 mr-2" />
                <span>Vấn đề ({analyses.problems.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {analyses.problems.map((item, index) => (
                  <li key={index} className="bg-red-50 border border-red-100 rounded-md p-2">
                    <div className="font-medium text-red-700">{item.label}</div>
                    <div className="text-sm text-red-600">{item.description}</div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {analyses.improvements.length > 0 && (
          <AccordionItem value="improvements">
            <AccordionTrigger className="text-amber-500 hover:text-amber-600 hover:no-underline">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>Cải thiện ({analyses.improvements.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {analyses.improvements.map((item, index) => (
                  <li key={index} className="bg-amber-50 border border-amber-100 rounded-md p-2">
                    <div className="font-medium text-amber-700">{item.label}</div>
                    <div className="text-sm text-amber-600">{item.description}</div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {analyses.passed.length > 0 && (
          <AccordionItem value="passed">
            <AccordionTrigger className="text-green-500 hover:text-green-600 hover:no-underline">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2" />
                <span>Đạt yêu cầu ({analyses.passed.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {analyses.passed.map((item, index) => (
                  <li key={index} className="bg-green-50 border border-green-100 rounded-md p-2">
                    <div className="font-medium text-green-700">{item.label}</div>
                    <div className="text-sm text-green-600">{item.description}</div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Gợi ý cải thiện SEO</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center text-xs text-gray-600">
            <ListChecks className="h-4 w-4 mr-1 text-gray-400" />
            <span>Sử dụng từ khóa trong tiêu đề, mô tả, nội dung</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <PenLine className="h-4 w-4 mr-1 text-gray-400" />
            <span>Viết nội dung chất lượng, ít nhất 600 từ</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Image className="h-4 w-4 mr-1 text-gray-400" />
            <span>Thêm hình ảnh có thẻ alt chứa từ khóa</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Link2 className="h-4 w-4 mr-1 text-gray-400" />
            <span>Thêm liên kết nội bộ và ngoại bộ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOScoreAnalyzer;