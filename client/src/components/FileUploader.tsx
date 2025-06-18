import { useState, useRef } from "react";
import { Upload, X, File, Image as ImageIcon, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileUpload: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUploader = ({
  onFileUpload,
  accept = "image/*,video/*",
  maxSize = 10, // 10MB default
  className = "",
}: FileUploaderProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"image" | "video" | "file">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra kích thước file
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File quá lớn",
        description: `Kích thước file tối đa là ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    // Tạo preview
    if (file.type.startsWith("image/")) {
      setPreviewType("image");
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      setPreviewType("video");
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreviewType("file");
      setPreview(null);
    }

    try {
      setIsUploading(true);
      
      // Tạo formData để gửi file
      const formData = new FormData();
      formData.append("file", file);

      // Gọi API upload thực sự
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      
      // Trả về URL cho component cha
      onFileUpload(result.url);
      
      toast({
        title: "Tải lên thành công",
        description: `File ${file.name} đã được tải lên`,
      });
    } catch (error) {
      toast({
        title: "Lỗi khi tải lên",
        description: "Đã xảy ra lỗi khi tải file lên server",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreview(null);
    setPreviewType("file");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (previewType === "image") {
      return (
        <div className="relative mt-2 rounded-md overflow-hidden border border-gray-200">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full max-h-48 object-contain bg-gray-50"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 rounded-full"
            onClick={clearPreview}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      );
    }

    if (previewType === "video") {
      return (
        <div className="relative mt-2 rounded-md overflow-hidden border border-gray-200">
          <video 
            src={preview} 
            controls 
            className="w-full max-h-48"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 rounded-full"
            onClick={clearPreview}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      );
    }

    return null;
  };

  // Icon cho từng loại file
  const renderTypeIcon = () => {
    if (previewType === "image") return <ImageIcon className="h-4 w-4 mr-2" />;
    if (previewType === "video") return <Film className="h-4 w-4 mr-2" />;
    return <File className="h-4 w-4 mr-2" />;
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        disabled={isUploading}
      />
      
      <Button
        variant="outline"
        type="button"
        onClick={handleButtonClick}
        disabled={isUploading}
        className="w-full"
      >
        {isUploading ? (
          <div className="flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
            <span>Đang tải lên...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            <span>Tải lên file</span>
          </div>
        )}
      </Button>
      
      {renderPreview()}
      
      <p className="text-xs text-gray-500 mt-1">
        Hỗ trợ các định dạng: PNG, JPG, GIF, MP4, MOV (tối đa {maxSize}MB)
      </p>
    </div>
  );
};

export default FileUploader;