import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Upload, FileAudio, FileText, Sparkles, Bot } from 'lucide-react'

function AdminChatBot({ onFieldSuggestion }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your AI assistant. I can help you auto-generate metadata by analyzing your audio files, sheet music PDFs, or text descriptions. Just upload a file or describe your music piece!',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const analyzeFile = async (file) => {
    setIsAnalyzing(true)
    
    // Add user message about file upload
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: `Uploaded file: ${file.name} (${file.type})`,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Simulate AI analysis (in real implementation, this would call an AI service)
    setTimeout(() => {
      let analysisResult = {}
      let botResponse = ''

      if (file.type.startsWith('audio/')) {
        // Audio file analysis
        analysisResult = {
          title: extractTitleFromFilename(file.name),
          tempo: Math.floor(Math.random() * 60) + 120, // 120-180 BPM
          keySignature: getRandomKey(),
          duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          category: detectCategoryFromFilename(file.name),
          difficulty: getRandomDifficulty(),
          tags: generateTagsFromFilename(file.name)
        }
        botResponse = `🎵 Audio Analysis Complete!\n\nI've analyzed your audio file and detected:\n• Estimated tempo: ${analysisResult.tempo} BPM\n• Suggested key: ${analysisResult.keySignature}\n• Duration: ${analysisResult.duration}\n• Category: ${analysisResult.category}\n• Difficulty: ${analysisResult.difficulty}\n\nWould you like me to auto-fill these fields in your form?`
      } else if (file.type === 'application/pdf') {
        // PDF analysis
        analysisResult = {
          title: extractTitleFromFilename(file.name),
          category: detectCategoryFromFilename(file.name),
          difficulty: getRandomDifficulty(),
          instrumentation: generateInstrumentationFromFilename(file.name),
          tags: generateTagsFromFilename(file.name)
        }
        botResponse = `📄 Sheet Music Analysis Complete!\n\nBased on the PDF filename and structure:\n• Title: ${analysisResult.title}\n• Category: ${analysisResult.category}\n• Suggested difficulty: ${analysisResult.difficulty}\n• Instrumentation: ${analysisResult.instrumentation}\n\nShall I populate these fields for you?`
      } else {
        botResponse = `I can analyze audio files (MP3, WAV) and PDF sheet music. Please upload a supported file type for automatic metadata generation.`
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        suggestions: analysisResult
      }

      setMessages(prev => [...prev, botMessage])
      setIsAnalyzing(false)
    }, 2000)
  }

  const extractTitleFromFilename = (filename) => {
    return filename
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
      .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
  }

  const detectCategoryFromFilename = (filename) => {
    const lower = filename.toLowerCase()
    if (lower.includes('drumline') || lower.includes('cadence') || lower.includes('snare') || lower.includes('bass')) {
      return 'Drumline'
    } else if (lower.includes('band') || lower.includes('orchestra') || lower.includes('symphony')) {
      return 'Full Band'
    } else if (lower.includes('film') || lower.includes('movie') || lower.includes('cinema')) {
      return 'Media/Film'
    } else if (lower.includes('game') || lower.includes('gaming') || lower.includes('video')) {
      return 'Media/Gaming'
    } else if (lower.includes('warmup') || lower.includes('warm-up') || lower.includes('exercise')) {
      return 'Warmups'
    } else if (lower.includes('beat') || lower.includes('rhythm') || lower.includes('pattern')) {
      return 'Beats'
    }
    return 'Full Band'
  }

  const getRandomKey = () => {
    const keys = ['C Major', 'G Major', 'D Major', 'A Major', 'E Major', 'B Major', 'F# Major',
                  'C# Major', 'F Major', 'Bb Major', 'Eb Major', 'Ab Major', 'Db Major', 'Gb Major',
                  'A Minor', 'E Minor', 'B Minor', 'F# Minor', 'C# Minor', 'G# Minor', 'D# Minor',
                  'A# Minor', 'D Minor', 'G Minor', 'C Minor', 'F Minor', 'Bb Minor', 'Eb Minor']
    return keys[Math.floor(Math.random() * keys.length)]
  }

  const getRandomDifficulty = () => {
    const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Professional']
    return difficulties[Math.floor(Math.random() * difficulties.length)]
  }

  const generateTagsFromFilename = (filename) => {
    const lower = filename.toLowerCase()
    const tags = []
    
    if (lower.includes('march')) tags.push('marching')
    if (lower.includes('jazz')) tags.push('jazz')
    if (lower.includes('rock')) tags.push('rock')
    if (lower.includes('classical')) tags.push('classical')
    if (lower.includes('pop')) tags.push('pop')
    if (lower.includes('fast')) tags.push('uptempo')
    if (lower.includes('slow')) tags.push('ballad')
    if (lower.includes('competition')) tags.push('competition')
    if (lower.includes('concert')) tags.push('concert')
    
    return tags.length > 0 ? tags : ['original', 'arrangement']
  }

  const generateInstrumentationFromFilename = (filename) => {
    const lower = filename.toLowerCase()
    if (lower.includes('drumline')) return 'Snare Drums, Bass Drums, Tenor Drums, Cymbals'
    if (lower.includes('band')) return 'Full Concert Band'
    if (lower.includes('orchestra')) return 'Full Orchestra'
    if (lower.includes('brass')) return 'Brass Ensemble'
    if (lower.includes('woodwind')) return 'Woodwind Ensemble'
    return 'Mixed Ensemble'
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate AI response for text-based queries
    setTimeout(() => {
      let botResponse = ''
      const lower = inputMessage.toLowerCase()

      if (lower.includes('help') || lower.includes('what can you do')) {
        botResponse = `I can help you with:\n\n🎵 **Audio Analysis**: Upload MP3/WAV files and I'll detect tempo, key, duration, and suggest metadata\n\n📄 **PDF Analysis**: Upload sheet music PDFs for title and instrumentation suggestions\n\n💬 **Text Analysis**: Describe your piece and I'll suggest appropriate categories, difficulty levels, and tags\n\n📝 **Auto-Fill**: I can populate form fields based on my analysis\n\nJust upload a file or tell me about your music!`
      } else if (lower.includes('tempo') || lower.includes('bpm')) {
        botResponse = `For tempo suggestions:\n• **Ballad**: 60-80 BPM\n• **Moderate**: 90-120 BPM\n• **Allegro**: 120-160 BPM\n• **Presto**: 160+ BPM\n\nDescribe your piece's energy level and I can suggest a specific tempo!`
      } else if (lower.includes('difficulty')) {
        botResponse = `Difficulty levels:\n• **Beginner**: Simple rhythms, limited range\n• **Intermediate**: Moderate complexity, some technical challenges\n• **Advanced**: Complex rhythms, extended techniques\n• **Professional**: Virtuosic demands, advanced musicianship\n\nTell me about the technical demands and I'll suggest the right level!`
      } else if (lower.includes('category') || lower.includes('genre')) {
        botResponse = `Available categories:\n• **Drumline**: Cadences, exercises, competition pieces\n• **Full Band**: Concert band, orchestra, wind ensemble\n• **Media/Film**: Cinematic, soundtrack, atmospheric\n• **Media/Gaming**: Video game, interactive, electronic\n• **Warmups**: Technical exercises, scales, chorales\n• **Beats**: Rhythm patterns, loops, backing tracks\n\nWhat style is your piece?`
      } else {
        // Try to extract metadata from text description
        const suggestions = analyzeTextDescription(inputMessage)
        if (Object.keys(suggestions).length > 0) {
          botResponse = `Based on your description, I suggest:\n\n${Object.entries(suggestions).map(([key, value]) => `• ${key}: ${value}`).join('\n')}\n\nWould you like me to auto-fill these suggestions?`
        } else {
          botResponse = `I'd be happy to help! You can:\n\n1. Upload an audio file for automatic analysis\n2. Upload a PDF for sheet music analysis\n3. Describe your piece in detail for suggestions\n4. Ask specific questions about tempo, difficulty, or categories\n\nWhat would you like to do?`
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        suggestions: lower.includes('description') ? analyzeTextDescription(inputMessage) : {}
      }

      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const analyzeTextDescription = (text) => {
    const lower = text.toLowerCase()
    const suggestions = {}

    // Detect category from description
    if (lower.includes('drumline') || lower.includes('percussion') || lower.includes('cadence')) {
      suggestions.category = 'Drumline'
    } else if (lower.includes('orchestra') || lower.includes('symphony')) {
      suggestions.category = 'Full Band'
    } else if (lower.includes('film') || lower.includes('movie') || lower.includes('cinematic')) {
      suggestions.category = 'Media/Film'
    }

    // Detect difficulty
    if (lower.includes('beginner') || lower.includes('easy') || lower.includes('simple')) {
      suggestions.difficulty = 'Beginner'
    } else if (lower.includes('advanced') || lower.includes('difficult') || lower.includes('complex')) {
      suggestions.difficulty = 'Advanced'
    } else if (lower.includes('professional') || lower.includes('virtuosic')) {
      suggestions.difficulty = 'Professional'
    }

    // Detect tempo indicators
    if (lower.includes('fast') || lower.includes('quick') || lower.includes('energetic')) {
      suggestions.tempo = '140'
    } else if (lower.includes('slow') || lower.includes('ballad') || lower.includes('gentle')) {
      suggestions.tempo = '70'
    } else if (lower.includes('moderate') || lower.includes('medium')) {
      suggestions.tempo = '120'
    }

    return suggestions
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      analyzeFile(file)
    }
  }

  const applySuggestions = (suggestions) => {
    if (onFieldSuggestion) {
      onFieldSuggestion(suggestions)
    }
    
    const confirmMessage = {
      id: Date.now(),
      type: 'bot',
      content: '✅ Great! I\'ve auto-filled the form fields with my suggestions. You can review and modify them as needed.',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, confirmMessage])
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        title="AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-semibold">AI Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-1 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-line text-sm">{message.content}</div>
              {message.suggestions && Object.keys(message.suggestions).length > 0 && (
                <button
                  onClick={() => applySuggestions(message.suggestions)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                >
                  Apply Suggestions
                </button>
              )}
            </div>
          </div>
        ))}
        {isAnalyzing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span className="text-sm">Analyzing file...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2 mb-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors"
          >
            <Upload className="h-3 w-3" />
            Upload File
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your music or ask for help..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminChatBot

