import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Schema cho bài viết blog
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),                       // Tiêu đề bài viết
  slug: text("slug").notNull().unique(),                // URL thân thiện
  excerpt: text("excerpt").notNull(),                   // Mô tả ngắn (meta description)
  content: text("content").notNull(),                   // Nội dung HTML của bài viết (PostgreSQL TEXT type không giới hạn kích thước)
  date: timestamp("date").defaultNow().notNull(),       // Ngày đăng
  readTime: text("read_time").notNull(),                // Thời gian đọc ví dụ: "5 phút"
  author: text("author").notNull(),                     // Tác giả
  category: text("category").notNull(),                 // Danh mục
  image: text("image").notNull(),                       // URL hình ảnh (thumbnail / og:image)
  isPublished: boolean("is_published").default(true).notNull(), // Trạng thái xuất bản
  tags: text("tags").array(),                           // Các thẻ liên quan
  
  // SEO fields
  canonicalUrl: text("canonical_url"),                  // URL gốc (cho trường hợp nội dung trùng lặp)
  metaTitle: text("meta_title"),                        // Tiêu đề tùy chỉnh cho SEO (nếu khác title)
  metaKeywords: text("meta_keywords"),                  // Từ khóa meta (keywords)
  structuredData: text("structured_data"),              // Dữ liệu có cấu trúc JSON-LD
  updatedAt: timestamp("updated_at").defaultNow(),      // Thời gian cập nhật
  relatedPosts: integer("related_posts").array(),       // ID các bài viết liên quan
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
