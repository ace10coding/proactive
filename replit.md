# PROACTIVE - Health & Wellness Platform

## Overview

PROACTIVE is a comprehensive health and wellness web application built with React, TypeScript, and Vite. The platform provides users with tools and resources for health tracking, fitness guidance, community support, and wellness education. Key features include a BMI calculator, workout program generator, health events calendar, support group forums, and multilingual content (English/Portuguese).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18.3+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMM and optimized production builds
- React Router DOM for client-side routing with dedicated pages for each feature area

**UI Component System**
- Radix UI primitives for accessible, unstyled components (dialogs, dropdowns, tabs, etc.)
- shadcn/ui component library built on top of Radix UI for consistent design patterns
- Tailwind CSS for utility-first styling with custom design tokens defined in CSS variables
- CVA (Class Variance Authority) for managing component variants
- Custom theming system with HSL color values for easy theme customization

**State Management & Data Fetching**
- React Query (TanStack Query) for server state management and caching
- Local state management via React hooks (useState, useContext)
- LocalStorage for persisting user-generated data (workout plans, gallery images)

**Internationalization**
- Custom LanguageContext provider for managing English/Portuguese translations
- Translation keys system with centralized translation object
- Language switcher component in navigation for runtime language changes

### Core Feature Modules

**BMI Calculator**
- Standalone calculator page with weight/height inputs
- Real-time BMI calculation with category classification
- Color-coded result display based on health ranges

**Workout System**
- Exercise library with filtering by type and equipment (limited to 3 exercises: Barbell Front Raises, Arnold Press, Barbell Upright Rows)
- Fullscreen image viewing for exercise demonstrations (click to expand)
- Interactive workout plan generator with multi-step form
- Humanized, natural-language exercise instructions
- LocalStorage persistence of generated workout plans
- Dedicated plan view with weekly/daily exercise breakdown

**Events Management**
- Events listing page displaying health/fitness events
- Event details with date, location, and description
- Admin-protected image gallery with password authentication
- LocalStorage-based gallery image management

**Support Groups (Forums)**
- Supabase-backed discussion forum system
- Topic creation with categories (Mental Health, Fitness, Chronic Conditions, etc.)
- Threaded discussions with post replies
- Username-based posting (no authentication required)
- CRUD operations for topics and posts
- View count tracking for topic engagement

### Routing & Navigation

**Route Structure**
- `/` - Home page with feature overview and health tips
- `/events` - Events calendar and gallery
- `/calculator` - BMI calculator tool
- `/workouts` - Exercise library and workout plan generator
- `/support` - Support group forums
- `*` - 404 catch-all route

**Navigation Components**
- Fixed top navigation bar with mobile-responsive menu
- Active route highlighting
- Language switcher integrated in navigation
- Footer with social media links

### Styling & Design System

**Design Tokens**
- CSS custom properties for colors, gradients, shadows, and transitions
- Primary color: Teal/Cyan (HSL 174 62% 47%)
- Secondary color: Coral/Orange (HSL 16 90% 65%)
- Typography: Inter (body) and Outfit (headings) from Google Fonts
- Border radius: 0.75rem default
- Smooth transitions with cubic-bezier easing

**Responsive Design**
- Mobile-first approach with Tailwind breakpoints
- Collapsible mobile navigation menu
- Container-based layouts with max-width constraints

## Recent Changes

**December 3, 2025 - Migration from Supabase to Replit Neon PostgreSQL**
- Migrated from Supabase to Replit's integrated Neon PostgreSQL database
- Implemented Drizzle ORM for type-safe database operations
- Created Express API server for backend endpoints
- Updated SupportGroups component to use REST API instead of direct database calls
- Removed Supabase dependencies and configuration files

## External Dependencies

### Backend Services

**Neon PostgreSQL (Replit Integrated)**
- PostgreSQL database for support group topics and posts
- Managed through Drizzle ORM for type-safe queries
- Connection via DATABASE_URL environment variable
- Schema defined in `shared/schema.ts`

**Express API Server**
- RESTful API endpoints in `server/index.ts`
- Runs on port 3001 (proxied through Vite on development)
- Handles all database operations for support groups
- CRUD operations for topics and posts

### UI Libraries

**Radix UI Suite**
- Comprehensive set of headless UI components for accessibility
- Components: Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Navigation Menu, Popover, Progress, Radio Group, Select, Slider, Switch, Tabs, Toast, Tooltip

**Additional UI Dependencies**
- `embla-carousel-react` - Carousel/slider functionality
- `cmdk` - Command palette component
- `react-day-picker` - Calendar/date picker
- `input-otp` - OTP input fields
- `lucide-react` - Icon library
- `react-icons` - Additional icon set (specifically for Pinterest icon)
- `next-themes` - Theme management (dark/light mode support infrastructure)
- `sonner` - Toast notification system (alternative to Radix Toast)

### Form Management

**React Hook Form Ecosystem**
- `react-hook-form` - Form state and validation
- `@hookform/resolvers` - Schema validation resolvers
- Integration with Zod or other validation libraries (resolver configured but schema not shown)

### Utilities

- `class-variance-authority` - Component variant management
- `clsx` & `tailwind-merge` - Conditional class name composition
- `date-fns` - Date formatting and manipulation

### Development Tools

- TypeScript with relaxed compiler settings (strict mode disabled)
- ESLint with React and TypeScript plugins
- Vite with React SWC plugin for fast refresh
- `lovable-tagger` - Development-only component tagging plugin

### Build & Deployment

- Vite production builds with code splitting
- Static asset optimization
- Environment-specific builds (development vs production modes)