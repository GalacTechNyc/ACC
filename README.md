# Alliance Collective Compositions Website

A professional music arrangement showcase website built with React, featuring AI-powered chatbot assistance and comprehensive contact functionality.

## 🎵 Live Website
**Deployed URL**: https://kksdavob.manus.space

## 🚀 Features

### Core Functionality
- **Professional Music Catalog**: Organized into three main categories
  - Drumline Cadences (25+ arrangements)
  - Full Band Scores (40+ scores)
  - Media, Gaming & Film Productions (15+ productions)

### AI-Powered Assistance
- **Intelligent Chatbot**: Context-aware music assistant that helps with:
  - Song selection and recommendations
  - Catalog navigation assistance
  - FAQ responses
  - Contact information routing
  - Intent classification for different inquiry types

### Contact & Purchase System
- **Professional Contact Form**: Complete with email template generation
- **Licensing Options**: Both exclusive and standard non-exclusive licensing
- **Automatic Email Integration**: Pre-filled mailto links with structured templates
- **Contact Method Preferences**: Email or phone contact options

### Design & User Experience
- **Vibrant Professional Design**: Inspired by NY Alliance Drumline aesthetic
- **Responsive Layout**: Mobile-first design that works on all devices
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **Smooth Animations**: Hover effects and transitions throughout
- **Accessibility**: WCAG compliant design patterns

## 🛠 Technology Stack

### Frontend
- **React 19**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React component library
- **Lucide Icons**: Beautiful, customizable icons
- **Framer Motion**: Smooth animations and transitions

### Development Tools
- **pnpm**: Fast, disk space efficient package manager
- **ESLint**: Code linting and quality assurance
- **Git**: Version control with GitHub integration

## 📁 Project Structure

```
alliance-collective-compositions/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and media files
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── ChatBot.jsx   # AI chatbot component
│   │   └── ContactForm.jsx # Contact form component
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.css           # Global styles and custom CSS
│   ├── App.jsx           # Main application component
│   ├── index.css         # Base styles
│   └── main.jsx          # Application entry point
├── components.json       # shadcn/ui configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite build configuration
└── README.md            # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Purple (#4A148C) - Professional and musical
- **Secondary**: Electric Blue (#2196F3) - Modern and vibrant
- **Accent**: Vibrant Orange (#FF5722) - Call-to-action elements
- **Supporting**: Teal (#009688), Light Gray (#F5F5F5)

### Typography
- **Headers**: Modern sans-serif fonts (Inter/Poppins style)
- **Body**: Clean, readable typography
- **Hierarchy**: Clear 3-level system for content organization

### Layout Principles
- **Card-based Design**: Consistent component styling
- **Responsive Grid**: CSS Grid with Flexbox fallback
- **Visual Hierarchy**: Proper spacing and content organization
- **Mobile-first**: Optimized for all screen sizes

## 🤖 AI Chatbot Features

### Intent Classification
The chatbot intelligently classifies user queries into categories:
- **Drumline Inquiries**: Percussion and cadence-related questions
- **Full Band Inquiries**: Orchestral and concert band questions
- **Media Inquiries**: Film, gaming, and multimedia projects
- **Pricing Inquiries**: Cost and licensing questions
- **Contact Inquiries**: Getting in touch with the team
- **Custom Inquiries**: Bespoke arrangement requests
- **Licensing Inquiries**: Rights and usage questions

### Contextual Responses
- Dynamic response generation based on user intent
- Music-specific knowledge and recommendations
- Professional tone with helpful guidance
- Seamless handoff to human contact when needed

## 📧 Contact System

### Email Template Generation
The contact form automatically generates professional email templates including:
- Subject line with song title
- Contact information section
- Project details and intended use
- License type preference
- Preferred contact method
- Additional message space

### Integration
- **Mailto Links**: Automatic email client integration
- **Fallback Display**: Template shown if email client doesn't open
- **Professional Format**: Structured, easy-to-read email format

## 🚀 Development

### Getting Started
```bash
# Clone the repository
git clone https://github.com/GalacTechNyc/ACC.git
cd ACC

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Available Scripts
```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Lint code
pnpm run lint
```

### Development Server
The development server runs on `http://localhost:5173` with hot module replacement for instant updates during development.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

### Mobile Features
- Hamburger navigation menu
- Touch-friendly controls
- Optimized chatbot interface
- Compressed images for faster loading
- Swipe-friendly catalog browsing

## 🎯 Business Features

### Catalog Organization
- **Clear Categories**: Three distinct music arrangement types
- **Professional Presentation**: High-quality layout and imagery
- **Easy Navigation**: Intuitive browsing experience
- **Search Functionality**: Quick arrangement discovery

### Purchase Workflow
1. **Discovery**: Browse catalog or use search
2. **Preview**: View arrangement details and audio previews
3. **Inquiry**: Fill out contact form with specific requirements
4. **Contact**: Automatic email generation to business email
5. **Follow-up**: Professional response within 24 hours

### Licensing Options
- **Standard Non-Exclusive**: Multiple users allowed
- **Exclusive License**: Sole rights to the arrangement
- **Custom Arrangements**: Bespoke composition services
- **Package Deals**: Multiple arrangements at discounted rates

## 📞 Contact Information

**Business Email**: newyorkalliancemas@gmail.com
**Response Time**: Within 24 hours
**Services**: Music arrangements, custom compositions, licensing

## 🔧 Deployment

### Production Build
```bash
pnpm run build
```

### Deployment Platforms
- **Current**: Manus hosting platform
- **Compatible**: Netlify, Vercel, AWS S3, GitHub Pages
- **Requirements**: Static hosting with SPA support

## 🤝 Contributing

This website was built collaboratively using AI assistance:
- **Claude**: Strategic planning and architecture design
- **Gemini**: Technical implementation and feature recommendations
- **Manus**: Full-stack development and deployment

## 📄 License

© 2025 Alliance Collective Compositions. All rights reserved.

## 🎵 About Alliance Collective Compositions

Alliance Collective Compositions is a dynamic group of student and professional arrangers dedicated to creating exceptional music arrangements across all genres and ensembles. Our mission is to provide high-quality, accessible compositions that inspire performers and audiences alike.

### Our Services
- **Drumline Cadences**: High-energy percussion arrangements
- **Full Band Scores**: Complete orchestral and concert band pieces
- **Media Productions**: Cinematic compositions for film and gaming
- **Custom Arrangements**: Bespoke compositions for any ensemble
- **Licensing**: Flexible licensing options for all needs

### Our Approach
We combine traditional composition techniques with modern innovation, ensuring each arrangement meets the highest standards while remaining accessible to performers of all levels.

---

**Built with ❤️ and AI collaboration for the music community**

