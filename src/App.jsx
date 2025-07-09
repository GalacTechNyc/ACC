import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search, Music, Users, Film, Phone, Mail, MapPin, Clock, Settings } from 'lucide-react'
import ChatBot from './components/ChatBot.jsx'
import ContactForm from './components/ContactForm.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import MusicCatalog from './components/MusicCatalog.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import logo from './assets/logo.png'
import './App.css'

// Header Component
function Header({ onAdminClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
    setIsDropdownOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Scroll to catalog and trigger search
      scrollToSection('music-catalog')
      // You could also pass the search query to the catalog component
    }
  }

  return (
    <header className="header-enhanced bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer float-animation" onClick={() => scrollToSection('home')}>
            <img src={logo} alt="Alliance Collective Compositions" className="h-12 w-12 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-vibrant-purple">Alliance Collective</h1>
              <p className="text-sm text-vibrant-blue">Compositions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Home
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
              >
                Catalog
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="dropdown-enhanced absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50">
                  <button 
                    onClick={() => {
                      scrollToSection('music-catalog')
                      setIsDropdownOpen(false)
                    }}
                    className="dropdown-item block w-full text-left"
                  >
                    All Music
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('music-catalog')
                      setIsDropdownOpen(false)
                    }}
                    className="dropdown-item block w-full text-left"
                  >
                    Drumline Cadences
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('music-catalog')
                      setIsDropdownOpen(false)
                    }}
                    className="dropdown-item block w-full text-left"
                  >
                    Full Band Scores
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('music-catalog')
                      setIsDropdownOpen(false)
                    }}
                    className="dropdown-item block w-full text-left"
                  >
                    Media & Film
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Search and Admin */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search arrangements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
              </div>
            </form>
            
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
              title="Admin Access"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('music-catalog')}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors"
              >
                Music Catalog
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors"
              >
                Contact
              </button>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search arrangements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// Hero Section Component
function HeroSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Professional Music Arrangements
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Discover exceptional compositions from our collective of student and professional arrangers. 
          From drumline cadences to full orchestral scores.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('music-catalog')}
            className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Browse Catalog
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="btn-accent px-8 py-4 text-lg font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Custom Arrangements
          </button>
        </div>
      </div>
    </section>
  )
}

// Category Cards Component
function CategoryCards() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const categories = [
    {
      icon: <Music className="h-12 w-12" />,
      title: "Drumline Cadences",
      description: "High-energy percussion arrangements perfect for marching bands and drumlines",
      count: "25+ Arrangements"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Full Band Scores", 
      description: "Complete orchestral and concert band arrangements for all skill levels",
      count: "40+ Scores"
    },
    {
      icon: <Film className="h-12 w-12" />,
      title: "Media & Film",
      description: "Cinematic compositions for gaming, film, and multimedia productions",
      count: "15+ Productions"
    }
  ]

  return (
    <section id="catalog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Catalog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of professional music arrangements across multiple genres and ensembles
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="category-card bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-primary mb-6 flex justify-center">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
              <p className="text-muted-foreground mb-6">{category.description}</p>
              <div className="text-sm font-semibold text-primary mb-6">{category.count}</div>
              <button 
                onClick={() => scrollToSection('music-catalog')}
                className="btn-outline w-full py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section Component
function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Alliance Collective Compositions</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We are a dynamic group of student and professional arrangers dedicated to creating exceptional 
            music arrangements across all genres and ensembles. Our mission is to provide high-quality, 
            accessible compositions that inspire performers and audiences alike.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To bridge the gap between emerging talent and professional music creation, fostering a 
                collaborative environment where creativity thrives and exceptional arrangements are born.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
              <p className="text-muted-foreground">
                We combine traditional composition techniques with modern innovation, ensuring each 
                arrangement meets the highest standards while remaining accessible to performers of all levels.
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
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to purchase arrangements or discuss custom compositions? Fill out our inquiry form below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ContactForm />
          
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg p-6 inline-block">
              <p className="text-muted-foreground mb-2">Or contact us directly at:</p>
              <a href="mailto:newyorkalliancemas@gmail.com" className="text-primary font-semibold text-lg hover:underline">
                newyorkalliancemas@gmail.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main App Component
function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  // Check for existing admin session
  useEffect(() => {
    const adminAuth = localStorage.getItem('accAdminAuth')
    if (adminAuth === 'true') {
      setIsAdmin(true)
    }
  }, [])

  const handleAdminLogin = (success) => {
    if (success) {
      setIsAdmin(true)
      setShowAdminLogin(false)
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem('accAdminAuth')
  }

  const handleAdminClick = () => {
    if (isAdmin) {
      // If already logged in, go to dashboard
      return
    } else {
      // Show login
      setShowAdminLogin(true)
    }
  }

  // Show admin login if requested
  if (showAdminLogin && !isAdmin) {
    return <AdminLogin onLogin={handleAdminLogin} />
  }

  // Show admin dashboard if logged in
  if (isAdmin) {
    return <AdminDashboard onLogout={handleAdminLogout} />
  }

  // Show main website
  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={handleAdminClick} />
      <HeroSection />
      <CategoryCards />
      <MusicCatalog />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <ChatBot />
    </div>
  )
}

export default App

