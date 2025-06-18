import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import express from "express";
import { storage as dbStorage } from "./storage";
import { insertBlogPostSchema } from '@shared/schema';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { sendContactNotification, sendDemoRequestNotification, sendAutoReply } from './email';

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, phone, email, company, package: packageChoice, message, source, address, businessType } = req.body;
      
      // Validate form data - chỉ yêu cầu name và phone
      if (!name || !phone) {
        return res.status(400).json({ message: 'Họ tên và số điện thoại là bắt buộc' });
      }
      
      // Gửi email thông báo cho admin
      const notificationSent = await sendContactNotification({
        name,
        phone,
        email: email || 'Không cung cấp',
        company,
        package: packageChoice,
        message,
        source,
        address,
        businessType
      });
      
      // Chỉ gửi email tự động nếu có email
      let autoReplySent = false;
      if (email) {
        autoReplySent = await sendAutoReply(email, name);
      }
      
      // Ghi nhật ký kết quả gửi email
      console.log(`Contact form: Admin notification ${notificationSent ? 'sent' : 'failed'}${email ? `, Auto-reply ${autoReplySent ? 'sent' : 'failed'}` : ''}`);

      return res.status(200).json({ 
        success: true, 
        message: 'Thông tin liên hệ đã được gửi thành công',
        emailSent: notificationSent
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý biểu mẫu liên hệ' });
    }
  });

  // Demo account request
  app.post('/api/demo-request', async (req, res) => {
    try {
      const { name, email, company } = req.body;
      
      // Validate form data
      if (!name || !email || !company) {
        return res.status(400).json({ message: 'Họ tên, email và tên công ty là bắt buộc' });
      }
      
      // Gửi email thông báo cho admin về yêu cầu tài khoản demo
      const notificationSent = await sendDemoRequestNotification({
        name,
        email,
        company
      });
      
      // Gửi email tự động cho khách hàng
      const autoReplySent = await sendAutoReply(email, name);
      
      // Ghi nhật ký kết quả gửi email
      console.log(`Demo request: Admin notification ${notificationSent ? 'sent' : 'failed'}, Auto-reply ${autoReplySent ? 'sent' : 'failed'}`);
      
      // Trong ứng dụng thực tế, bạn nên lưu trữ thông tin này trong database
      // và tạo tài khoản demo thông qua hệ thống quản lý người dùng
      
      return res.status(200).json({ 
        success: true, 
        message: 'Yêu cầu tài khoản demo đã được gửi thành công',
        emailSent: notificationSent,
        // Trong trường hợp thực tế, đây sẽ được gửi sau khi quản trị viên tạo tài khoản
        demoCredentials: {
          url: 'demo.autoshop.com.vn',
          username: 'demo',
          password: 'demo123'
        }
      });
    } catch (error) {
      console.error('Error processing demo request:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý yêu cầu tài khoản demo' });
    }
  });

  // Newsletter subscription
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email, name = "Khách hàng" } = req.body;
      
      // Validate email
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Địa chỉ email hợp lệ là bắt buộc' });
      }
      
      // Gửi email thông báo cho admin
      const notificationSent = await sendContactNotification({
        name: name,
        phone: "Không có",
        email: email,
        source: "Đăng ký nhận bản tin"
      });
      
      // Gửi email tự động cho khách hàng
      const autoReplySent = await sendAutoReply(email, name);
      
      console.log(`Newsletter subscription: Admin notification ${notificationSent ? 'sent' : 'failed'}, Auto-reply ${autoReplySent ? 'sent' : 'failed'}`);
      
      // Trong ứng dụng thực tế, bạn sẽ lưu thông tin này vào database
      
      return res.status(200).json({ 
        success: true, 
        message: 'Đăng ký nhận bản tin thành công',
        emailSent: notificationSent
      });
    } catch (error) {
      console.error('Error processing subscription:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý đăng ký' });
    }
  });

  // Blog API endpoints
  
  // Get all blog posts
  app.get('/api/blog', async (_req, res) => {
    try {
      const posts = await dbStorage.getBlogPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get a single blog post by slug
  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await dbStorage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new blog post
  app.post('/api/blog', async (req, res) => {
    try {
      // Validate the request body
      const validationResult = insertBlogPostSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: 'Invalid blog post data', 
          errors: validationResult.error.format() 
        });
      }

      const newPost = await dbStorage.createBlogPost(validationResult.data);
      return res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating blog post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update a blog post
  app.put('/api/blog/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid blog post ID' });
      }

      // Partial validation for update
      const existingPost = await dbStorage.getBlogPostById(id);
      if (!existingPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      const updatedPost = await dbStorage.updateBlogPost(id, req.body);
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating blog post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete a blog post
  app.delete('/api/blog/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid blog post ID' });
      }

      const result = await dbStorage.deleteBlogPost(id);
      if (!result) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      return res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Search blog posts
  app.get('/api/blog/search/:query', async (req, res) => {
    try {
      const query = req.params.query;
      if (!query || query.length < 3) {
        return res.status(400).json({ message: 'Search query must be at least 3 characters long' });
      }

      const results = await dbStorage.searchBlogPosts(query);
      return res.status(200).json(results);
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // File upload configuration
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Ensure uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  // Configure storage for multer
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
      const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    }
  });
  
  // File filter function
  const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept images, videos, and PDFs
    const filetypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    
    cb(new Error('Chỉ chấp nhận các file hình ảnh, video, và PDF'));
  };
  
  // Initialize upload middleware
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });
  
  // File upload endpoint
  app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Không có file nào được tải lên' });
      }
      
      // Create URL for the uploaded file
      const fileUrl = `/uploads/${req.file.filename}`;
      
      return res.status(200).json({ 
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ message: 'Lỗi khi tải file lên server' });
    }
  });

  // Serve files from the public directory
  app.use(express.static(path.join(process.cwd(), 'public')));
  
  // Make sure uploads are still explicitly handled
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  const httpServer = createServer(app);

  return httpServer;
}
