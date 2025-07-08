import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your music assistant. I can help you find the perfect arrangement, answer questions about our catalog, or connect you with our team. What can I help you with today?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Classify user intent
  const classifyIntent = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('drumline') || lowerMessage.includes('cadence') || lowerMessage.includes('percussion')) {
      return 'drumline_inquiry'
    }
    if (lowerMessage.includes('full band') || lowerMessage.includes('orchestra') || lowerMessage.includes('concert band')) {
      return 'fullband_inquiry'
    }
    if (lowerMessage.includes('media') || lowerMessage.includes('film') || lowerMessage.includes('gaming') || lowerMessage.includes('soundtrack')) {
      return 'media_inquiry'
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('purchase') || lowerMessage.includes('buy')) {
      return 'pricing_inquiry'
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return 'contact_inquiry'
    }
    if (lowerMessage.includes('custom') || lowerMessage.includes('arrangement') || lowerMessage.includes('commission')) {
      return 'custom_inquiry'
    }
    if (lowerMessage.includes('license') || lowerMessage.includes('licensing') || lowerMessage.includes('exclusive')) {
      return 'licensing_inquiry'
    }
    
    return 'general_inquiry'
  }

  // Generate contextual responses
  const generateResponse = (message, intent) => {
    const responses = {
      drumline_inquiry: [
        "Great choice! Our drumline cadences are high-energy percussion arrangements perfect for marching bands. We have 25+ arrangements ranging from beginner to advanced levels. Would you like me to recommend some based on your ensemble size or skill level?",
        "Our drumline collection features powerful cadences with complex polyrhythms and dynamic builds. Popular pieces include 'Thunder Strike Cadence' by Marcus Johnson. What type of drumline arrangement are you looking for?"
      ],
      fullband_inquiry: [
        "Excellent! Our full band scores include complete orchestral and concert band arrangements for all skill levels. We have 40+ scores available. Are you looking for a specific genre or difficulty level?",
        "Our full band collection ranges from classical arrangements to contemporary pieces. 'Cinematic Overture' by Sarah Chen is very popular. What style of music interests your ensemble?"
      ],
      media_inquiry: [
        "Perfect for multimedia projects! Our media and film compositions are designed for gaming, film, and multimedia productions. We have 15+ professional-quality tracks. What type of project are you working on?",
        "Our media collection includes cinematic compositions like 'Digital Dreams' by Alex Rivera. These are perfect for soundtracks and multimedia. What mood or style are you looking for?"
      ],
      pricing_inquiry: [
        "We offer competitive pricing for both individual arrangements and package deals. We also provide exclusive and standard non-exclusive licensing options. For specific pricing, please contact us at newyorkalliancemas@gmail.com with details about your intended use.",
        "Pricing varies based on the arrangement complexity and licensing type. We offer both exclusive and non-exclusive licenses. I'd be happy to connect you with our team for a personalized quote!"
      ],
      contact_inquiry: [
        "You can reach us at newyorkalliancemas@gmail.com for all inquiries. Our team typically responds within 24 hours. Would you like me to help you draft a message or provide more specific contact information?",
        "For purchases and custom arrangements, email newyorkalliancemas@gmail.com. Include details about your project and preferred contact method (phone or email). How can I help you get started?"
      ],
      custom_inquiry: [
        "We'd love to create a custom arrangement for you! Our collective includes both student and professional arrangers. Please contact newyorkalliancemas@gmail.com with details about your project, ensemble size, difficulty level, and timeline.",
        "Custom arrangements are one of our specialties! We work with you to create the perfect piece for your ensemble. What type of custom arrangement are you interested in?"
      ],
      licensing_inquiry: [
        "We offer both exclusive and standard non-exclusive licensing options. Exclusive licenses give you sole rights to the arrangement, while non-exclusive allows multiple users. Contact newyorkalliancemas@gmail.com for detailed licensing information.",
        "Licensing terms depend on your intended use and distribution needs. We're flexible and work with educational institutions, professional ensembles, and commercial projects. What's your intended use?"
      ],
      general_inquiry: [
        "I'm here to help with any questions about Alliance Collective Compositions! We specialize in professional music arrangements across drumline, full band, and media productions. What would you like to know more about?",
        "Welcome to Alliance Collective Compositions! We're a group of talented arrangers creating exceptional music. I can help you find arrangements, answer questions, or connect you with our team. What interests you most?"
      ]
    }

    const responseArray = responses[intent] || responses.general_inquiry
    return responseArray[Math.floor(Math.random() * responseArray.length)]
  }

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const intent = classifyIntent(input)
      const response = generateResponse(input, intent)
      
      const botMessage = {
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      }

      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 flex flex-col shadow-xl">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg">Music Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our arrangements..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatBot

