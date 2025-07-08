import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Music, Users, Film, Play, Mail, Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import ChatBot from './components/ChatBot.jsx'
import ContactForm from './components/ContactForm.jsx'
import './App.css'

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Alliance Collective</h1>
              <p className="text-sm text-muted-foreground">Compositions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
                <span>Catalog</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#drumline" className="block px-4 py-3 text-sm hover:bg-muted transition-colors">Drumline Cadences</a>
                <a href="#fullband" className="block px-4 py-3 text-sm hover:bg-muted transition-colors">Full Band Scores</a>
                <a href="#media" className="block px-4 py-3 text-sm hover:bg-muted transition-colors">Media, Gaming & Film</a>
              </div>
            </div>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Input placeholder="Search arrangements..." className="w-64" />
              <Button size="sm" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#drumline" className="text-foreground hover:text-primary transition-colors">Drumline Cadences</a>
              <a href="#fullband" className="text-foreground hover:text-primary transition-colors">Full Band Scores</a>
              <a href="#media" className="text-foreground hover:text-primary transition-colors">Media, Gaming & Film</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
              <div className="flex items-center space-x-2 pt-2">
                <Input placeholder="Search..." className="flex-1" />
                <Button size="sm" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <section id="home" className="gradient-hero text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Professional Music Arrangements
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Discover exceptional compositions from our collective of student and professional arrangers. 
          From drumline cadences to full orchestral scores.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="btn-accent">
            Browse Catalog
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
            Custom Arrangements
          </Button>
        </div>
      </div>
    </section>
  )
}

// Category Cards Component
function CategoryCards() {
  const categories = [
    {
      title: "Drumline Cadences",
      description: "High-energy percussion arrangements perfect for marching bands and drumlines",
      icon: <Music className="h-12 w-12 text-primary" />,
      count: "25+ Arrangements"
    },
    {
      title: "Full Band Scores",
      description: "Complete orchestral and concert band arrangements for all skill levels",
      icon: <Users className="h-12 w-12 text-secondary" />,
      count: "40+ Scores"
    },
    {
      title: "Media & Film",
      description: "Cinematic compositions for gaming, film, and multimedia productions",
      icon: <Film className="h-12 w-12 text-accent" />,
      count: "15+ Productions"
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Catalog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of professional music arrangements across multiple genres and ensembles
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="category-card">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <CardDescription className="text-base">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm font-semibold text-primary mb-4">{category.count}</p>
                <Button className="w-full btn-primary">
                  <Play className="h-4 w-4 mr-2" />
                  Browse Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Featured Arrangements Component
function FeaturedArrangements() {
  const arrangements = [
    {
      title: "Thunder Strike Cadence",
      composer: "Marcus Johnson",
      category: "Drumline",
      duration: "3:45",
      difficulty: "Advanced",
      description: "A powerful cadence featuring complex polyrhythms and dynamic builds"
    },
    {
      title: "Cinematic Overture",
      composer: "Sarah Chen",
      category: "Full Band",
      duration: "6:20",
      difficulty: "Intermediate",
      description: "Epic orchestral piece perfect for concert performances"
    },
    {
      title: "Digital Dreams",
      composer: "Alex Rivera",
      category: "Media/Gaming",
      duration: "4:15",
      difficulty: "Professional",
      description: "Futuristic soundtrack composition for gaming and media"
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Arrangements</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and recently added compositions
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {arrangements.map((arrangement, index) => (
            <Card key={index} className="catalog-card">
              <div className="aspect-video bg-gradient-card flex items-center justify-center">
                <Play className="h-16 w-16 text-white opacity-80" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{arrangement.title}</CardTitle>
                    <CardDescription>by {arrangement.composer}</CardDescription>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {arrangement.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{arrangement.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Duration: {arrangement.duration}</span>
                  <span>Level: {arrangement.difficulty}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 btn-primary">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Inquire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section Component
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Alliance Collective Compositions</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We are a dynamic group of student and professional arrangers dedicated to creating 
            exceptional music arrangements across all genres and ensembles. Our mission is to 
            provide high-quality, accessible compositions that inspire performers and audiences alike.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To bridge the gap between emerging talent and professional music creation, 
                fostering a collaborative environment where creativity thrives and exceptional 
                arrangements are born.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Approach</h3>
              <p className="text-muted-foreground">
                We combine traditional composition techniques with modern innovation, 
                ensuring each arrangement meets the highest standards while remaining 
                accessible to performers of all levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to purchase arrangements or discuss custom compositions? 
            Fill out our inquiry form below.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-6 w-6" />
              <span className="font-bold">Alliance Collective</span>
            </div>
            <p className="text-sm opacity-80">
              Professional music arrangements from talented student and professional composers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Catalog</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#drumline" className="hover:opacity-100 transition-opacity">Drumline Cadences</a></li>
              <li><a href="#fullband" className="hover:opacity-100 transition-opacity">Full Band Scores</a></li>
              <li><a href="#media" className="hover:opacity-100 transition-opacity">Media & Film</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Custom Arrangements</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Licensing</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Consultation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm opacity-80 mb-2">newyorkalliancemas@gmail.com</p>
            <p className="text-sm opacity-80">Professional music arrangements and custom compositions</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 Alliance Collective Compositions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoryCards />
        <FeaturedArrangements />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default App

