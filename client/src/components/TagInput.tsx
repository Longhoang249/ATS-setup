import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  maxTags?: number;
  required?: boolean;
  className?: string;
}

const TagInput = ({
  value = [],
  onChange,
  label = "Tags",
  placeholder = "Thêm tag mới và nhấn Enter",
  maxTags = 10,
  required = false,
  className = ""
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus on input when clicking the container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Normalize tag: lowercase, trim, and replace spaces with hyphens
  const normalizeTag = (tag: string) => {
    return tag.trim().toLowerCase().replace(/\s+/g, '-');
  };

  // Add a new tag
  const addTag = () => {
    if (inputValue.trim() !== "") {
      const normalizedTag = normalizeTag(inputValue);
      
      // Don't add if it already exists
      if (!value.includes(normalizedTag) && value.length < maxTags) {
        onChange([...value, normalizedTag]);
      }
      
      setInputValue("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  // Handle key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === "" && value.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      removeTag(value[value.length - 1]);
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    } else if (e.key === ',' || e.key === ';') {
      // Allow comma or semicolon to separate tags
      e.preventDefault();
      addTag();
    }
  };

  // Handle paste event to add multiple tags at once
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // Split by commas, semicolons, or newlines
    const tagsToAdd = pastedText
      .split(/[,;\n]/)
      .map(tag => normalizeTag(tag))
      .filter(tag => tag !== "");
    
    if (tagsToAdd.length > 0) {
      // Filter for unique tags
      const allTags = [...value, ...tagsToAdd];
      const uniqueTags: string[] = [];
      
      // Use a manual approach to deduplicate tags
      allTags.forEach(tag => {
        if (!uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
      });
      
      // Respect maxTags limit
      onChange(uniqueTags.slice(0, maxTags));
    }
  };

  useEffect(() => {
    // If tags are provided but not as an array, convert to array
    if (value && !Array.isArray(value)) {
      onChange([]);
    }
  }, [value, onChange]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor="tag-input" className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
          {value.length > 0 && (
            <span className="text-xs text-gray-500 ml-1">
              ({value.length}/{maxTags})
            </span>
          )}
        </Label>
      )}
      
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={`flex flex-wrap gap-2 p-2 border rounded-md focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-colors ${value.length === 0 ? 'min-h-[38px]' : ''}`}
      >
        {value.map(tag => (
          <Badge key={tag} variant="secondary" className="py-1 px-2.5 gap-1 h-auto text-sm">
            {tag}
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="w-4 h-4 p-0 ml-1 rounded-full hover:bg-gray-200"
            >
              <X className="w-3 h-3" />
              <span className="sr-only">Remove {tag}</span>
            </Button>
          </Badge>
        ))}
        
        <Input
          ref={inputRef}
          id="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 placeholder:text-gray-400"
          disabled={value.length >= maxTags}
        />
      </div>
      
      {value.length >= maxTags && (
        <p className="text-amber-600 text-xs mt-1">
          Đã đạt giới hạn tối đa ({maxTags} tags)
        </p>
      )}
    </div>
  );
};

export default TagInput;