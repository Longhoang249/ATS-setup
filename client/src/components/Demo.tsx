import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Họ tên phải có ít nhất 2 ký tự.',
  }),
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.',
  }),
  company: z.string().min(2, {
    message: 'Vui lòng nhập tên công ty.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Demo() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState<{ url: string; username: string; password: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: 'Đăng ký thành công!',
          description: 'Thông tin tài khoản demo đã được gửi đến email của bạn.',
        });
        form.reset();
        
        // Hiển thị thông tin tài khoản demo (trong môi trường thực tế sẽ gửi qua email)
        if (result.demoCredentials) {
          setCredentials(result.demoCredentials);
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: result.message || 'Không thể gửi yêu cầu. Vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Không thể gửi yêu cầu. Vui lòng thử lại sau.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Đăng ký tài khoản demo
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trải nghiệm dịch vụ của chúng tôi với tài khoản demo miễn phí
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Họ và tên *" {...field} className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-green-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email *" {...field} type="email" className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-green-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Tên công ty *" {...field} className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-green-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng ký ngay'}
                </Button>
              </div>
            </form>
          </Form>
          
          {credentials && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Thông tin tài khoản demo</h3>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>URL:</strong> {credentials.url}</p>
                <p className="text-gray-700"><strong>Tên đăng nhập:</strong> {credentials.username}</p>
                <p className="text-gray-700"><strong>Mật khẩu:</strong> {credentials.password}</p>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Lưu ý: Trong môi trường thực tế, thông tin này sẽ được gửi đến email của bạn.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}