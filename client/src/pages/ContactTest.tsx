import Contact from '@/components/Contact';

export default function ContactTest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-green-600">AutoShop - Kiểm tra form liên hệ</h1>
        </div>
      </header>
      
      <main>
        <Contact />
      </main>
    </div>
  );
}