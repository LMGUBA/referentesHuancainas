# Design Guidelines: Referentes Huancaínas 2.0

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from platforms that blend social impact with community engagement - combining LinkedIn's professional profile presentation, Airbnb's card-based discovery interface, and Coursera's educational clarity. The design celebrates Wanka cultural heritage while maintaining modern usability.

**Core Principle**: Warm, authentic, and empowering - honoring cultural identity while providing accessible access to role models and educational resources.

## Typography

**Font Families**:
- Primary: Poppins (300, 400, 500, 600) - Friendly, approachable, modern
- Accent: Playfair Display (600, 700) - For section headers and hero text, adding cultural gravitas

**Hierarchy**:
- Hero Headlines: 48-64px (Playfair Display, bold)
- Section Headers: 32-40px (Playfair Display, semibold)
- Card Titles: 20-24px (Poppins, semibold)
- Body Text: 16-18px (Poppins, regular)
- Captions: 14px (Poppins, light)

## Layout System

**Spacing Units**: Consistent use of Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Card gaps: gap-6 to gap-8
- Inner content margins: m-4 to m-8

**Container Strategy**:
- Full-width sections with inner max-w-7xl
- Content sections: max-w-6xl
- Text-heavy areas: max-w-4xl

## Color Application

Maintain the established Wanka palette as primary brand colors:
- **Wanka Red (#8C2C3E)**: Primary CTAs, navigation, important accents
- **Wanka Yellow (#E9C46A)**: Secondary accents, hover states, badges
- **Wanka Blue (#2A9D8F)**: Interactive elements, links, chatbot interface
- **Wanka Cream (#F4EDE4)**: Backgrounds, card surfaces
- **Dark (#2F2E41)**: Primary text

Additional functional colors needed but not specified in guidelines per user request.

## Component Library

### Navigation
- Fixed top navigation with Wanka Red background
- Logo/title on left, horizontal menu on right
- Transparent overlay state when scrolling
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- 75vh height with cultural imagery overlay
- Content positioned bottom-left with strong text shadow for readability
- Primary CTA with blurred background for legibility
- Tagline max-width of 500px

### Referentes (Profile Cards)
- Masonry/grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Card structure: Portrait image (16:9 ratio), name, role/title, brief bio snippet
- Hover: Subtle lift effect (scale 1.02)
- Modal overlay for full profiles with larger image, complete biography, achievements, contact option

### Course Cards
- 2-column layout (desktop), single column (mobile)  
- Each card: Course title, duration badge, difficulty level, brief description, enrollment CTA
- Visual hierarchy emphasizing course name and action button

### Interactive Map
- Full-width embedded map section
- Pin markers for each referente with photo thumbnails
- Click to reveal mini-profile card overlay
- Filter controls above map (by region, field, expertise)

### Community Forum
- Clean message thread layout
- User avatar + name + timestamp header
- Message body with proper text formatting
- Reply and reaction options
- Compose area with rich text editor

### Chatbot Interface
- Fixed chat window: 400px height, scrollable message area
- Alternating message alignment (user right, bot left)
- Bot messages with Wanka Blue accent
- Input field with send button, typing indicator animation
- Welcome message with quick-action buttons (common questions)

## Images

**Hero Section**: 
Large, vibrant photograph of Huancayo landscape or Wanka cultural scene - mountains, traditional textiles, or community gathering. Image should convey warmth, heritage, and empowerment. Overlay gradient from bottom (dark) to transparent for text readability.

**Referente Profile Cards**: 
Professional headshots or candid photos of women leaders - warm, approachable, confident. Consistent aspect ratio across all cards (square or 3:4 portrait).

**Course Thumbnails**: 
Representative imagery for each course theme - classroom settings, cultural artifacts, technology tools, entrepreneurship scenes.

**Map Visualization**: 
Stylized geographic map of Huancayo region with illustrated or photo markers.

**Forum/Community**: 
User avatars (profile photos), background pattern with subtle Wanka textile motifs.

## Interaction Patterns

- Section transitions: Smooth fade-in (0.3s ease)
- Card hovers: Subtle elevation increase
- Modal: Fade-in overlay with scale animation for content
- Form focus states: Wanka Blue border highlight
- Chat messages: Slide-in animation from respective sides
- Loading states: Wanka-colored spinner or skeleton screens
- Navigation: Active section highlighted with Wanka Yellow underline

## Accessibility & Responsiveness

- All interactive elements minimum 44px touch target
- High contrast text (WCAG AA minimum)
- Keyboard navigation support throughout
- ARIA labels for all icons and interactive components
- Responsive breakpoints: 640px, 768px, 1024px, 1280px
- Mobile-first approach with progressive enhancement

## Special Considerations

**Cultural Authenticity**: Integrate subtle Wanka textile patterns as background textures in section dividers or card borders. Use iconography inspired by Andean motifs where appropriate (badges, decorative elements).

**Empowerment Focus**: Generous whitespace around profile content, prominent imagery of referentes, confident typography hierarchy that elevates women's stories.

**Community Warmth**: Rounded corners throughout (12-16px), soft shadows, welcoming color application creating approachable rather than corporate feel.