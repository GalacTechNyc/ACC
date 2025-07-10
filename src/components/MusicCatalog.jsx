import React, { useState, useEffect, useMemo } from 'react'
import { Play, Download, Mail, Search, Filter, Music, Users, Film, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { getUploadedMusic, difficultyLevels } from '../data/musicCatalog.js'

function MusicCatalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [sortBy, setSortBy] = useState('title')
  const [allMusic, setAllMusic] = useState([])

  // Load uploaded music on component mount and when localStorage changes
  useEffect(() => {
    const loadMusic = () => {
      const uploadedMusic = getUploadedMusic()
      setAllMusic(uploadedMusic)
    }
    
    loadMusic()
    
    // Listen for storage changes (when admin uploads new music)
    const handleStorageChange = () => {
      loadMusic()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also check periodically for updates
    const interval = setInterval(loadMusic, 1000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePreview = (title) => {
    alert(`Playing preview for: ${title}`)
  }

  const handleDownload = (title) => {
    alert(`Downloading sheet music for: ${title}`)
  }

  const filteredMusic = useMemo(() => {
    let filtered = allMusic

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.composer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty)
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'composer':
          return a.composer.localeCompare(b.composer)
        case 'difficulty':
          return difficultyLevels.indexOf(a.difficulty) - difficultyLevels.indexOf(b.difficulty)
        case 'price':
          return a.price.standard - b.price.standard
        case 'newest':
          return b.yearComposed - a.yearComposed
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Drumline':
        return <Music className="h-5 w-5" />
      case 'Full Band':
        return <Users className="h-5 w-5" />
      case 'Media/Gaming':
      case 'Media/Film':
        return <Film className="h-5 w-5" />
      case 'Warmups':
        return <Zap className="h-5 w-5" />
      case 'Beats':
        return <Target className="h-5 w-5" />
      default:
        return <Music className="h-5 w-5" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'Advanced':
        return 'bg-orange-100 text-orange-800'
      case 'Professional':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section id="music-catalog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Complete Music Catalog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive collection of professional music arrangements, beats, and educational materials
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search music, composers, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Drumline">Drumline Cadences</SelectItem>
                <SelectItem value="Full Band">Full Band Scores</SelectItem>
                <SelectItem value="Media/Gaming">Media & Gaming</SelectItem>
                <SelectItem value="Media/Film">Film Scores</SelectItem>
                <SelectItem value="Warmups">Warmups</SelectItem>
                <SelectItem value="Beats">Beats & Patterns</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {difficultyLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="composer">Composer</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredMusic.length} of {allMusic.length} arrangements
          </div>
        </div>

        {/* Music Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusic.map((item) => (
            <Card key={item.id} className="catalog-card hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-card flex items-center justify-center relative">
                <Play className="h-16 w-16 text-white opacity-80" />
                <div className="absolute top-3 left-3">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className={getDifficultyColor(item.difficulty)}>
                    {item.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>by {item.composer}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {item.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <div>Duration: {item.duration}</div>
                  <div>Year: {item.yearComposed}</div>
                  {item.tempo !== 'Variable' && (
                    <>
                      <div>Tempo: {item.tempo}</div>
                      <div>Key: {item.keySignature}</div>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <div className="font-semibold">Standard: ${item.price.standard}</div>
                    <div className="text-muted-foreground">Exclusive: ${item.price.exclusive}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handlePreview(item.title)}
                    className="text-xs"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownload(item.title)}
                    className="text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Sample
                  </Button>
                  <Button 
                    size="sm" 
                    className="btn-primary text-xs"
                    onClick={() => scrollToSection('contact')}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMusic.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No arrangements found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedDifficulty('all')
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card text-black rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-black">Can't Find What You're Looking For?</h3>
            <p className="text-lg mb-6 text-black">
              We offer custom arrangement services for any ensemble, style, or occasion. 
              Let us create something unique for your group.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                className="text-black border-black hover:bg-black hover:text-white"
                onClick={() => scrollToSection('services')}
              >
                Custom Arrangements
              </Button>
              <Button 
                size="lg" 
                className="btn-accent"
                onClick={() => scrollToSection('contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MusicCatalog

