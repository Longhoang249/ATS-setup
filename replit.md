# Autoshop Setup - Coffee & Tea Shop Setup Service

## Overview

This is a full-stack web application for Autoshop Setup, a Vietnamese company that provides comprehensive setup services for coffee shops and tea houses. The application includes a marketing website with a blog system, contact forms, and admin dashboard for content management.

## System Architecture

The application follows a modern full-stack architecture with:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Replit with autoscale deployment

## Key Components

### Frontend Architecture
- **React Router**: Using wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI
- **Animations**: Framer Motion for smooth animations
- **Forms**: React Hook Form with Zod validation
- **Rich Text Editor**: TipTap for blog content editing

### Backend Architecture
- **Express.js**: RESTful API server
- **Database Layer**: Drizzle ORM with PostgreSQL
- **Email Service**: SendGrid for automated email notifications
- **File Upload**: Multer for handling media uploads
- **Development**: Hot reload with Vite integration

### Database Schema
- **Users**: Basic user authentication system
- **Blog Posts**: Comprehensive blog system with SEO features
  - Title, slug, content, excerpt
  - SEO metadata (meta title, keywords, canonical URL)
  - Publishing status, tags, categories
  - Structured data support

## Data Flow

1. **User Interactions**: Forms submit data via REST API endpoints
2. **Contact Forms**: Automatically send notifications via SendGrid
3. **Blog Management**: Admin can create/edit posts with rich text editor
4. **SEO Optimization**: Built-in SEO analysis and structured data generation
5. **Analytics**: Google Analytics integration for tracking

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connection to Neon PostgreSQL
- **@sendgrid/mail**: Email service integration
- **@radix-ui/***: UI component primitives
- **@tiptap/***: Rich text editor extensions
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: TypeScript ORM
- **framer-motion**: Animation library

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Production bundling

## Deployment Strategy

The application is configured for Replit deployment with:

- **Development**: `npm run dev` - runs Express with Vite middleware
- **Production Build**: `npm run build` - builds frontend and bundles backend
- **Production Start**: `npm run start` - serves built application
- **Database**: Neon PostgreSQL with connection pooling
- **Static Assets**: Served from Express with proper routing

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SENDGRID_API_KEY`: SendGrid API key for email notifications

### Deployment Configuration
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: 5000 (mapped to external port 80)
- **Autoscale**: Enabled for production scaling

## Changelog

- June 14, 2025: Email system migrated from SendGrid to Google Apps Script
  - Replaced @sendgrid/mail dependency with direct HTTP requests to Apps Script
  - Updated all email functions (contact notifications, demo requests, auto-replies)
  - Apps Script URL: https://script.google.com/macros/s/AKfycbw_kjK25PXJ-jGwqhFy_PBCf4CFHGEbTp5QDD7FmhidM5GtT6dZPH3QZk4-zQiSTVSW/exec
  - All email functionality tested and working with autoshop.trasua@gmail.com
  - Fixed email validation issues and auto-reply handling
- June 14, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.