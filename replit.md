# Referentes Huancaínas 2.0

## Overview

Referentes Huancaínas 2.0 is a cultural and educational platform celebrating Wanka women leaders from Huancayo, Peru. The application showcases inspiring stories of female leadership, provides educational courses on intercultural topics, and fosters community engagement through forums and an interactive chatbot. The platform combines social impact with cultural preservation, honoring Wanka identity while providing accessible role models and resources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**UI Component System**: Shadcn UI (New York style) with Radix UI primitives, providing a comprehensive set of accessible, customizable components. The design system implements a warm, culturally-authentic aesthetic with the Wanka color palette (red #8C2C3E, yellow #E9C46A, blue #2A9D8F, cream #F4EDE4).

**Styling**: Tailwind CSS with custom design tokens matching Wanka cultural identity. Typography uses Poppins for body text and Playfair Display for headings, creating a balance between modern accessibility and cultural gravitas.

**State Management**: TanStack Query (React Query) for server state management, with a centralized query client configuration that handles API requests, caching, and synchronization.

**Routing**: Wouter for lightweight client-side routing, chosen for its minimal footprint compared to React Router.

**Key Frontend Features**:
- Single-page application with section-based navigation
- Profile modal system for detailed referente (role model) information
- Interactive chatbot with conversational AI responses
- Community forum with real-time message posting
- Course catalog with enrollment capabilities
- Geographic visualization via interactive map section

### Backend Architecture

**Runtime**: Node.js with Express.js web framework, using ES modules throughout.

**API Design**: RESTful API endpoints following resource-based conventions:
- `/api/referentes` - CRUD operations for women leaders
- `/api/cursos` - Course management
- `/api/foro/mensajes` - Community forum messages

**Data Validation**: Zod schema validation integrated with Drizzle ORM, ensuring type safety from database to API layer. All API endpoints validate incoming data against defined schemas before processing.

**Development Setup**: Custom Vite middleware integration for hot module replacement during development, with separate production build process using esbuild for server bundling.

**Error Handling**: Centralized error handling with structured responses, API request logging with response capture for debugging.

### Data Storage

**ORM**: Drizzle ORM with PostgreSQL dialect, providing type-safe database queries and migrations.

**Database Schema**:
- `users` - Authentication and user management (id, username, password)
- `referentes` - Women leader profiles (id, nombre, foto, rol, biografia, logros array)
- `cursos` - Educational courses (id, titulo, descripcion, duracion, nivel)
- `mensajes_foro` - Community forum messages (id, autor, contenido, timestamp)

**Migration Strategy**: Schema-first approach using `drizzle-kit push` for database synchronization.

**Development Fallback**: In-memory storage implementation (MemStorage class) used when database is unavailable, with pre-seeded sample data for development and testing.

### External Dependencies

**Database**: PostgreSQL via Neon serverless driver (`@neondatabase/serverless`), enabling edge-compatible database connections.

**UI Component Library**: 
- Radix UI primitives for accessibility-compliant interactive components
- Shadcn UI configuration for consistent design system
- Lucide React for iconography

**Form Management**: React Hook Form with Hookform Resolvers for validation integration.

**Date Handling**: date-fns library for timestamp formatting and relative time display (Spanish locale support).

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript for type safety across the stack
- PostCSS with Autoprefixer for CSS processing

**Session Management**: Connect-pg-simple for PostgreSQL-backed session storage (referenced in dependencies, though authentication implementation may be incomplete).

**Assets**: Generated AI images stored in `attached_assets/generated_images/` directory, with imported references mapped through Vite aliases.

### Architectural Decisions

**Monorepo Structure**: Single repository containing both client and server code with shared type definitions in `/shared` directory. This enables:
- Type safety across the full stack
- Simplified deployment process
- Easier code reuse and refactoring

**Schema-Driven Development**: Database schemas serve as the source of truth, with Zod schemas derived from Drizzle table definitions. This ensures consistency between database, API validation, and TypeScript types.

**Component Composition**: Heavy use of compound components pattern (e.g., Card with CardHeader, CardContent, CardFooter) for flexibility and maintainability.

**Optimistic UI Updates**: TanStack Query configuration with infinite stale time and disabled automatic refetching, relying on manual cache invalidation for data freshness. This reduces unnecessary network requests but requires careful cache management.

**Accessibility First**: All interactive components built on Radix UI primitives ensure ARIA compliance and keyboard navigation support out of the box.

**Cultural Localization**: Spanish language throughout the interface, with culturally-specific greetings in the chatbot ("Sutiyki warmi" - Quechua greeting meaning "What is your name, sister").