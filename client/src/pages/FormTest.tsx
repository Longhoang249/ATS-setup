import Contact from '@/components/Contact';
import Demo from '@/components/Demo';

export default function FormTest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-green-600">AutoShop - Thử nghiệm biểu mẫu</h1>
          <p className="mt-2 text-gray-600">Kiểm tra hệ thống thông báo email gửi đến quanbn.autoshop@gmail.com</p>
        </div>
      </header>
      
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold mb-6 text-center">Biểu mẫu liên hệ</h2>
              <Contact />
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-6 text-center">Biểu mẫu yêu cầu demo</h2>
              <Demo />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}