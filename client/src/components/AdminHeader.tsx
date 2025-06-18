import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, FileText, BarChart3, Settings } from 'lucide-react';

export default function AdminHeader() {
  const [location] = useLocation();
  
  const navigation = [
    { name: 'Trang chủ', href: '/', icon: Home },
    { name: 'Quản lý Blog', href: '/admin/blog', icon: FileText },
    { name: 'SEO Analytics', href: '/admin/seo-analytics', icon: BarChart3 },
    { name: 'Quản lý SEO', href: '/admin/seo', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Badge variant="outline" className="font-semibold">
                Admin Panel
              </Badge>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center">
            <Badge variant="secondary">
              Autoshop Setup Admin
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}