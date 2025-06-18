var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";
import express from "express";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertUserSchema: () => insertUserSchema,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  // Tiêu đề bài viết
  slug: text("slug").notNull().unique(),
  // URL thân thiện
  excerpt: text("excerpt").notNull(),
  // Mô tả ngắn (meta description)
  content: text("content").notNull(),
  // Nội dung HTML của bài viết (PostgreSQL TEXT type không giới hạn kích thước)
  date: timestamp("date").defaultNow().notNull(),
  // Ngày đăng
  readTime: text("read_time").notNull(),
  // Thời gian đọc ví dụ: "5 phút"
  author: text("author").notNull(),
  // Tác giả
  category: text("category").notNull(),
  // Danh mục
  image: text("image").notNull(),
  // URL hình ảnh (thumbnail / og:image)
  isPublished: boolean("is_published").default(true).notNull(),
  // Trạng thái xuất bản
  tags: text("tags").array(),
  // Các thẻ liên quan
  // SEO fields
  canonicalUrl: text("canonical_url"),
  // URL gốc (cho trường hợp nội dung trùng lặp)
  metaTitle: text("meta_title"),
  // Tiêu đề tùy chỉnh cho SEO (nếu khác title)
  metaKeywords: text("meta_keywords"),
  // Từ khóa meta (keywords)
  structuredData: text("structured_data"),
  // Dữ liệu có cấu trúc JSON-LD
  updatedAt: timestamp("updated_at").defaultNow(),
  // Thời gian cập nhật
  relatedPosts: integer("related_posts").array()
  // ID các bài viết liên quan
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true
});

// server/storage.ts
import { eq, desc, sql } from "drizzle-orm";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Blog post methods
  async getBlogPosts() {
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
      relatedPosts: blogPosts.relatedPosts
    }).from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.date));
  }
  async getBlogPostBySlug(slug) {
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
      relatedPosts: blogPosts.relatedPosts
    }).from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || void 0;
  }
  async getBlogPostById(id) {
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
      relatedPosts: blogPosts.relatedPosts
    }).from(blogPosts).where(eq(blogPosts.id, id));
    return post || void 0;
  }
  async createBlogPost(post) {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  async updateBlogPost(id, post) {
    const [updatedPost] = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
    return updatedPost || void 0;
  }
  async deleteBlogPost(id) {
    const [deletedPost] = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return !!deletedPost;
  }
  async searchBlogPosts(query) {
    const searchTerm = `%${query}%`;
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
      relatedPosts: blogPosts.relatedPosts
    }).from(blogPosts).where(
      sql`${blogPosts.title} ILIKE ${searchTerm} OR
            ${blogPosts.excerpt} ILIKE ${searchTerm} OR
            ${blogPosts.content} ILIKE ${searchTerm}`
    ).orderBy(desc(blogPosts.date));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// server/email.ts
var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_kjK25PXJ-jGwqhFy_PBCf4CFHGEbTp5QDD7FmhidM5GtT6dZPH3QZk4-zQiSTVSW/exec";
console.log("Google Apps Script email service initialized successfully");
async function sendToAppsScript(data) {
  try {
    console.log("Sending to Apps Script:", JSON.stringify(data, null, 2));
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      redirect: "follow"
    });
    console.log("Apps Script response status:", response.status);
    console.log("Apps Script response headers:", Object.fromEntries(response.headers.entries()));
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Apps Script error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    const result = await response.text();
    console.log("Apps Script success response:", result);
    return true;
  } catch (error) {
    console.error("Apps Script error:", error);
    console.error("Please check that your Google Apps Script is:");
    console.error("1. Deployed as a web app");
    console.error('2. Set to "Anyone" can access');
    console.error("3. Has the correct permissions");
    return false;
  }
}
async function sendContactNotification(data) {
  try {
    console.log("DEBUG: Received contact form data:", JSON.stringify(data, null, 2));
    const emailData = {
      type: "contact",
      to: "autoshop.trasua@gmail.com",
      subject: "Th\xF4ng tin li\xEAn h\u1EC7 m\u1EDBi t\u1EEB website",
      data: {
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN"),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN"),
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address || "",
        businessType: data.businessType ? data.businessType === "has-location" ? "\u0110\xE3 c\xF3 m\u1EB7t b\u1EB1ng" : data.businessType === "no-location" ? "Ch\u01B0a c\xF3 m\u1EB7t b\u1EB1ng" : data.businessType === "existing" ? "\u0110ang kinh doanh" : data.businessType : "",
        message: data.message || "",
        source: data.source || "website"
      }
    };
    const success = await sendToAppsScript(emailData);
    if (success) {
      console.log("Contact notification sent to Apps Script successfully");
    }
    return success;
  } catch (error) {
    console.error("Error sending contact notification:", error);
    return false;
  }
}
async function sendDemoRequestNotification(data) {
  try {
    console.log("Demo account request received:", {
      name: data.name,
      email: data.email,
      company: data.company
    });
    const emailData = {
      type: "demo",
      to: "autoshop.trasua@gmail.com",
      subject: "Y\xEAu c\u1EA7u t\xE0i kho\u1EA3n demo m\u1EDBi t\u1EEB website",
      data: {
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN"),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("vi-VN"),
        name: data.name,
        email: data.email,
        company: data.company
      }
    };
    const success = await sendToAppsScript(emailData);
    if (success) {
      console.log("Demo request notification sent to Apps Script successfully");
    }
    return success;
  } catch (error) {
    console.error("Error sending demo request notification:", error);
    return false;
  }
}
async function sendAutoReply(to, name) {
  try {
    console.log("Sending auto-reply email to:", {
      to,
      name
    });
    const emailData = {
      type: "autoReply",
      to,
      subject: "C\u1EA3m \u01A1n qu\xFD kh\xE1ch \u0111\xE3 li\xEAn h\u1EC7 v\u1EDBi AutoShop",
      data: {
        name,
        message: `
          <h2>Xin ch\xE0o ${name},</h2>
          <p>C\u1EA3m \u01A1n qu\xFD kh\xE1ch \u0111\xE3 li\xEAn h\u1EC7 v\u1EDBi AutoShop!</p>
          <p>Ch\xFAng t\xF4i \u0111\xE3 nh\u1EADn \u0111\u01B0\u1EE3c th\xF4ng tin y\xEAu c\u1EA7u t\u01B0 v\u1EA5n c\u1EE7a qu\xFD kh\xE1ch. \u0110\u1ED9i ng\u0169 CSKH c\u1EE7a AutoShop s\u1EBD li\xEAn h\u1EC7 l\u1EA1i v\u1EDBi qu\xFD kh\xE1ch trong th\u1EDDi gian s\u1EDBm nh\u1EA5t (trong v\xF2ng 24 gi\u1EDD).</p>
          <p>Tr\xE2n tr\u1ECDng,</p>
          <p><strong>AutoShop</strong></p>
          <p>Hotline: 0936.333.860</p>
          <p>Website: <a href="https://autoshop.com.vn">autoshop.com.vn</a></p>
        `
      }
    };
    const success = await sendToAppsScript(emailData);
    if (success) {
      console.log("Auto-reply email sent to Apps Script successfully");
    }
    return success;
  } catch (error) {
    console.error("Error sending auto-reply email:", error);
    return false;
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, phone, email, company, package: packageChoice, message, source, address, businessType } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ message: "H\u1ECD t\xEAn v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i l\xE0 b\u1EAFt bu\u1ED9c" });
      }
      const notificationSent = await sendContactNotification({
        name,
        phone,
        email: email || "Kh\xF4ng cung c\u1EA5p",
        company,
        package: packageChoice,
        message,
        source,
        address,
        businessType
      });
      let autoReplySent = false;
      if (email) {
        autoReplySent = await sendAutoReply(email, name);
      }
      console.log(`Contact form: Admin notification ${notificationSent ? "sent" : "failed"}${email ? `, Auto-reply ${autoReplySent ? "sent" : "failed"}` : ""}`);
      return res.status(200).json({
        success: true,
        message: "Th\xF4ng tin li\xEAn h\u1EC7 \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi th\xE0nh c\xF4ng",
        emailSent: notificationSent
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i khi x\u1EED l\xFD bi\u1EC3u m\u1EABu li\xEAn h\u1EC7" });
    }
  });
  app2.post("/api/demo-request", async (req, res) => {
    try {
      const { name, email, company } = req.body;
      if (!name || !email || !company) {
        return res.status(400).json({ message: "H\u1ECD t\xEAn, email v\xE0 t\xEAn c\xF4ng ty l\xE0 b\u1EAFt bu\u1ED9c" });
      }
      const notificationSent = await sendDemoRequestNotification({
        name,
        email,
        company
      });
      const autoReplySent = await sendAutoReply(email, name);
      console.log(`Demo request: Admin notification ${notificationSent ? "sent" : "failed"}, Auto-reply ${autoReplySent ? "sent" : "failed"}`);
      return res.status(200).json({
        success: true,
        message: "Y\xEAu c\u1EA7u t\xE0i kho\u1EA3n demo \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi th\xE0nh c\xF4ng",
        emailSent: notificationSent,
        // Trong trường hợp thực tế, đây sẽ được gửi sau khi quản trị viên tạo tài khoản
        demoCredentials: {
          url: "demo.autoshop.com.vn",
          username: "demo",
          password: "demo123"
        }
      });
    } catch (error) {
      console.error("Error processing demo request:", error);
      return res.status(500).json({ message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i khi x\u1EED l\xFD y\xEAu c\u1EA7u t\xE0i kho\u1EA3n demo" });
    }
  });
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const { email, name = "Kh\xE1ch h\xE0ng" } = req.body;
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "\u0110\u1ECBa ch\u1EC9 email h\u1EE3p l\u1EC7 l\xE0 b\u1EAFt bu\u1ED9c" });
      }
      const notificationSent = await sendContactNotification({
        name,
        phone: "Kh\xF4ng c\xF3",
        email,
        source: "\u0110\u0103ng k\xFD nh\u1EADn b\u1EA3n tin"
      });
      const autoReplySent = await sendAutoReply(email, name);
      console.log(`Newsletter subscription: Admin notification ${notificationSent ? "sent" : "failed"}, Auto-reply ${autoReplySent ? "sent" : "failed"}`);
      return res.status(200).json({
        success: true,
        message: "\u0110\u0103ng k\xFD nh\u1EADn b\u1EA3n tin th\xE0nh c\xF4ng",
        emailSent: notificationSent
      });
    } catch (error) {
      console.error("Error processing subscription:", error);
      return res.status(500).json({ message: "\u0110\xE3 x\u1EA3y ra l\u1ED7i khi x\u1EED l\xFD \u0111\u0103ng k\xFD" });
    }
  });
  app2.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/blog", async (req, res) => {
    try {
      const validationResult = insertBlogPostSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Invalid blog post data",
          errors: validationResult.error.format()
        });
      }
      const newPost = await storage.createBlogPost(validationResult.data);
      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.put("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      const existingPost = await storage.getBlogPostById(id);
      if (!existingPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      const updatedPost = await storage.updateBlogPost(id, req.body);
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      const result = await storage.deleteBlogPost(id);
      if (!result) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      return res.status(200).json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/blog/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      if (!query || query.length < 3) {
        return res.status(400).json({ message: "Search query must be at least 3 characters long" });
      }
      const results = await storage.searchBlogPosts(query);
      return res.status(200).json(results);
    } catch (error) {
      console.error("Error searching blog posts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const storage2 = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
      const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    }
  });
  const fileFilter = (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Ch\u1EC9 ch\u1EA5p nh\u1EADn c\xE1c file h\xECnh \u1EA3nh, video, v\xE0 PDF"));
  };
  const upload = multer({
    storage: storage2,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
    // 10MB limit
  });
  app2.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Kh\xF4ng c\xF3 file n\xE0o \u0111\u01B0\u1EE3c t\u1EA3i l\xEAn" });
      }
      const fileUrl = `/uploads/${req.file.filename}`;
      return res.status(200).json({
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({ message: "L\u1ED7i khi t\u1EA3i file l\xEAn server" });
    }
  });
  app2.use(express.static(path.join(process.cwd(), "public")));
  app2.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/ATS-setup/",
  // <--- THAY ĐỔI 1: Thêm dòng này
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    // THAY ĐỔI 2: Sửa dòng này để output không nằm trong thư mục 'public'
    outDir: path2.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
