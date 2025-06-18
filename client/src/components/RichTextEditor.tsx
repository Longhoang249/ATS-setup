import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlock from '@tiptap/extension-code-block'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  X,
  Pencil
} from 'lucide-react'
import { useRef, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editorClassName?: string;
  toolbarClassName?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = 'Viết nội dung bài viết ở đây...', editorClassName = '', toolbarClassName = '' }: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageAlt, setImageAlt] = useState<string>('')
  const [showLinkMenu, setShowLinkMenu] = useState<boolean>(false)
  const [showImageMenu, setShowImageMenu] = useState<boolean>(false)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      // Tối ưu cấu hình StarterKit cho nội dung lớn
      StarterKit.configure({
        heading: false,  // Tắt heading để tránh xung đột
        codeBlock: false, // Tắt codeBlock để tránh xung đột
        history: {
          depth: 300, // Tăng lịch sử để hỗ trợ bài viết dài
        },
      }),
      Image.configure({
        HTMLAttributes: {
          loading: 'lazy',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          class: 'text-primary underline',
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlock,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
      },
      // Xử lý nội dung lớn khi dán
      handlePaste: (view, event) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;
        
        // Lấy nội dung text plain
        const text = clipboardData.getData('text/plain');
        
        // Nếu nội dung dán quá lớn, chúng ta xử lý theo từng phần
        if (text && text.length > 50000) {
          console.log('Đang xử lý nội dung lớn...');
          
          // Thêm thông báo để người dùng biết đang xử lý
          view.dispatch(view.state.tr.insertText("Đang xử lý nội dung lớn..."));
          
          // Xử lý không đồng bộ để không làm treo UI
          setTimeout(() => {
            try {
              // Xóa thông báo "đang xử lý"
              const transaction = view.state.tr;
              const docText = view.state.doc.textContent;
              const marker = "Đang xử lý nội dung lớn...";
              const pos = docText.indexOf(marker);
              if (pos >= 0) {
                transaction.delete(pos, pos + marker.length);
                view.dispatch(transaction);
              }
              
              // Chia nội dung thành các phần nhỏ hơn để xử lý
              const chunkSize = 20000; // Tăng kích thước chunk
              for (let i = 0; i < text.length; i += chunkSize) {
                const chunk = text.substring(i, i + chunkSize);
                view.dispatch(view.state.tr.insertText(chunk));
              }
            } catch (error) {
              console.error('Lỗi khi xử lý nội dung lớn:', error);
            }
          }, 100);
          
          return true; // Đã xử lý sự kiện
        }
        
        // Để editor xử lý mặc định nếu nội dung không quá lớn
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      // Để tránh UI đông cứng với nội dung lớn
      const html = editor.getHTML();
      if (html.length > 100000) {
        // Xử lý bất đồng bộ với nội dung lớn
        setTimeout(() => {
          onChange(html);
        }, 10);
      } else {
        onChange(html);
      }
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    if (linkUrl) {
      // Check if there's a protocol, if not, add https://
      const url = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') 
        ? linkUrl 
        : `https://${linkUrl}`
        
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()
    }
    setShowLinkMenu(false)
    setLinkUrl('')
  }

  const addImage = () => {
    if (imageUrl) {
      editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, alt: imageAlt || 'Hình ảnh' })
        .run()
    }
    setShowImageMenu(false)
    setImageUrl('')
    setImageAlt('')
  }

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run()
  }

  return (
    <div className={`border rounded-md overflow-hidden ${editorClassName}`}>
      <div className={`bg-gray-50 p-2 border-b flex flex-wrap gap-1 ${toolbarClassName}`}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-gray-200' : ''}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'bg-gray-200' : ''}
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => toggleHeading(1)}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => toggleHeading(2)}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => toggleHeading(3)}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        
        <Popover open={showLinkMenu} onOpenChange={setShowLinkMenu}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setShowLinkMenu(true)
                
                // If we have a selected link, pre-fill the input
                if (editor.isActive('link')) {
                  setLinkUrl(editor.getAttributes('link').href)
                }
              }}
              className={editor.isActive('link') ? 'bg-gray-200' : ''}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Chèn liên kết</h4>
              <div className="flex gap-2">
                <Input 
                  ref={linkInputRef}
                  placeholder="Nhập URL" 
                  value={linkUrl} 
                  onChange={e => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addLink()
                    }
                  }}
                />
                <Button onClick={addLink}>Áp dụng</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover open={showImageMenu} onOpenChange={setShowImageMenu}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowImageMenu(true)}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Chèn hình ảnh</h4>
              <div className="space-y-2">
                <Input 
                  ref={imageInputRef}
                  placeholder="URL hình ảnh" 
                  value={imageUrl} 
                  onChange={e => setImageUrl(e.target.value)}
                />
                <Input 
                  placeholder="Văn bản thay thế (alt)" 
                  value={imageAlt} 
                  onChange={e => setImageAlt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addImage()
                    }
                  }}
                />
                <Button onClick={addImage} className="w-full">Chèn hình ảnh</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Đã loại bỏ các BubbleMenu để tránh lỗi với nội dung lớn */}

      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor