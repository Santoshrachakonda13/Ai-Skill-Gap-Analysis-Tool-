# replit.md

## Overview

AI Skill Gap Analysis Tool is an enterprise-grade educational platform that uses artificial intelligence to diagnose student skill mastery, identify learning gaps, and generate personalized curricula. The system provides comprehensive assessment analysis, progress tracking, and adaptive learning recommendations for educational institutions serving 50K-1M+ students across multiple subjects (mathematics, language arts, science, social studies).

The platform features a React-based frontend with TypeScript and a Node.js/Express backend, designed as a full-stack web application with real-time dashboard analytics, AI-powered curriculum generation, and detailed student progress monitoring capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript in a Vite-powered development environment
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design system
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation schemas
- **Charts/Visualization**: Recharts for data visualization and progress tracking

### Backend Architecture
- **Runtime**: Node.js with Express.js framework in TypeScript
- **API Design**: RESTful APIs with structured route handlers and middleware
- **Database ORM**: Drizzle ORM for type-safe database operations and schema management
- **Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **Development**: Hot reload with Vite middleware integration for seamless development experience

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle with migration support
- **Database Provider**: Neon Database serverless PostgreSQL for scalable cloud hosting
- **Schema Management**: Centralized schema definitions in shared directory with automatic type generation
- **Session Storage**: Connect-pg-simple for PostgreSQL-backed session management

### Component Architecture
- **Shared Types**: Common TypeScript interfaces and schemas in shared directory
- **Component Library**: Modular UI components with consistent props and styling patterns
- **Page Structure**: Route-based page components with dedicated layout components
- **Custom Hooks**: Reusable hooks for mobile detection, toast notifications, and form handling

### Development and Build System
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Management**: npm with lock file for dependency consistency
- **TypeScript Configuration**: Strict type checking with path mapping for clean imports
- **Development Features**: Runtime error overlay and Replit integration for cloud development

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript for component-based UI development
- **Vite**: Modern build tool with plugins for React, runtime error handling, and development features
- **TanStack React Query**: Server state management with caching, background updates, and optimistic updates

### UI and Styling Libraries
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **Lucide React**: Icon library for consistent iconography across the application
- **Class Variance Authority**: Utility for creating type-safe component variants

### Database and Backend
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect and schema validation
- **Neon Database**: Serverless PostgreSQL provider for scalable cloud database hosting
- **Express.js**: Web framework for RESTful API development and middleware support

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Integration layer for external validation libraries
- **Zod**: TypeScript-first schema validation for runtime type checking

### Development and Utilities
- **Wouter**: Lightweight routing library for client-side navigation
- **Date-fns**: Modern date utility library for date manipulation and formatting
- **CMDK**: Command palette component for improved user experience
- **Embla Carousel**: Touch-friendly carousel component for content presentation