import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// Removed apiRequest import
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Họ tên phải có ít nhất 2 ký tự.',
  }),
  phone: z.string().min(10, {
    message: 'Số điện thoại phải có ít nhất 10 số.',
  }),
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.',
  }),
  company: z.string().optional(),
  package: z.string({
    required_error: 'Vui lòng chọn gói dịch vụ.',
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      company: '',
      package: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Track form submission event
    trackEvent('generate_lead', {
      form_type: 'contact',
      service_type: data.package
    });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, source: 'website' }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Track successful submission
        trackEvent('form_submission_success', {
          form_type: 'contact'
        });
        
        toast({
          title: 'Gửi thành công!',
          description: 'Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.',
        });
        form.reset();
      } else {
        // Track submission error
        trackEvent('form_submission_error', {
          form_type: 'contact',
          error_type: 'api_error',
          error_message: result.message || 'Không thể gửi biểu mẫu'
        });
        
        toast({
          variant: 'destructive',
          title: 'Có lỗi xảy ra',
          description: result.message || 'Không thể gửi biểu mẫu. Vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      // Track network or other errors
      trackEvent('form_submission_error', {
        form_type: 'contact',
        error_type: 'network_error'
      });
      
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Không thể gửi biểu mẫu. Vui lòng thử lại sau.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Đặt lịch tư vấn
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Vui lòng để lại thông tin liên hệ, chúng tôi sẽ gọi lại cho bạn trong thời gian sớm nhất
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Số điện thoại *" {...field} type="tel" className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-green-600" />
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
                        <Input placeholder="Tên công ty" {...field} className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-green-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus:border-green-600">
                          <SelectValue placeholder="Chọn gói dịch vụ *" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="setup">Gói thiết kế & thi công trọn gói</SelectItem>
                        <SelectItem value="consult">Gói tư vấn setup</SelectItem>
                        <SelectItem value="training">Gói đào tạo quy trình</SelectItem>
                        <SelectItem value="franchise">Gói nhượng quyền thương hiệu</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Nội dung tin nhắn" 
                        {...field} 
                        className="min-h-[120px] border-b-2 border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 focus-visible:border-green-600" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Hotline</h3>
                <p className="mt-2 text-base text-gray-600">0936.333.860</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-2 text-base text-gray-600">quanbn.autoshop@gmail.com</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Địa chỉ</h3>
                <p className="mt-2 text-base text-gray-600">Hà Nội, Đà Nẵng, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}