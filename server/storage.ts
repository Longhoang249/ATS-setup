import { users, blogPosts, type User, type InsertUser, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { eq, desc, like, sql } from "drizzle-orm";
import { db } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      date: blogPosts.date,
      readTime: blogPosts.readTime,
      author: blogPosts.author,
      category: blogPosts.category,
      image: blogPosts.image,
      isPublished: blogPosts.isPublished,
      tags: blogPosts.tags,
      // Các trường SEO mới (có thể null)
      canonicalUrl: blogPosts.canonicalUrl,
      metaTitle: blogPosts.metaTitle,
      metaKeywords: blogPosts.metaKeywords,
      structuredData: blogPosts.structuredData,
      updatedAt: blogPosts.updatedAt,
      relatedPosts: blogPosts.relatedPosts,
    })
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.date));
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      date: blogPosts.date,
      readTime: blogPosts.readTime,
      author: blogPosts.author,
      category: blogPosts.category,
      image: blogPosts.image,
      isPublished: blogPosts.isPublished,
      tags: blogPosts.tags,
      // Các trường SEO mới (có thể null)
      canonicalUrl: blogPosts.canonicalUrl,
      metaTitle: blogPosts.metaTitle,
      metaKeywords: blogPosts.metaKeywords,
      structuredData: blogPosts.structuredData,
      updatedAt: blogPosts.updatedAt,
      relatedPosts: blogPosts.relatedPosts,
    })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug));
    return post || undefined;
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      date: blogPosts.date,
      readTime: blogPosts.readTime,
      author: blogPosts.author,
      category: blogPosts.category,
      image: blogPosts.image,
      isPublished: blogPosts.isPublished,
      tags: blogPosts.tags,
      // Các trường SEO mới (có thể null)
      canonicalUrl: blogPosts.canonicalUrl,
      metaTitle: blogPosts.metaTitle,
      metaKeywords: blogPosts.metaKeywords,
      structuredData: blogPosts.structuredData,
      updatedAt: blogPosts.updatedAt,
      relatedPosts: blogPosts.relatedPosts,
    })
    .from(blogPosts)
    .where(eq(blogPosts.id, id));
    return post || undefined;
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }
  
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set(post)
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost || undefined;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    const [deletedPost] = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();
    return !!deletedPost;
  }
  
  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    // Tìm kiếm bài viết theo tiêu đề, trích đoạn hoặc nội dung
    const searchTerm = `%${query}%`;
    return await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        date: blogPosts.date,
        readTime: blogPosts.readTime,
        author: blogPosts.author,
        category: blogPosts.category,
        image: blogPosts.image,
        isPublished: blogPosts.isPublished,
        tags: blogPosts.tags,
        // Các trường SEO mới (có thể null)
        canonicalUrl: blogPosts.canonicalUrl,
        metaTitle: blogPosts.metaTitle,
        metaKeywords: blogPosts.metaKeywords,
        structuredData: blogPosts.structuredData,
        updatedAt: blogPosts.updatedAt,
        relatedPosts: blogPosts.relatedPosts,
      })
      .from(blogPosts)
      .where(
        sql`${blogPosts.title} ILIKE ${searchTerm} OR
            ${blogPosts.excerpt} ILIKE ${searchTerm} OR
            ${blogPosts.content} ILIKE ${searchTerm}`
      )
      .orderBy(desc(blogPosts.date));
  }
}

export const storage = new DatabaseStorage();
