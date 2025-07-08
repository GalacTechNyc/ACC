import { useState } from 'react'
import { Mail, Phone, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'

const ContactForm = ({ songTitle = '', isModal = false, onClose = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    songTitle: songTitle,
    intendedUse: '',
    contactMethod: 'email',
    message: '',
    licenseType: 'standard'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateEmailTemplate = () => {
    return `Subject: Music Purchase Inquiry - ${formData.songTitle || 'Alliance Collective Compositions'}

Hello Alliance Collective Compositions,

I'm looking to purchase: ${formData.songTitle || 'music arrangement'}

Contact Information:
- Name: ${formData.name}
- Organization: ${formData.organization || 'Individual'}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}

Project Details:
- Intended Use: ${formData.intendedUse}
- License Type: ${formData.licenseType === 'exclusive' ? 'Exclusive License' : 'Standard Non-Exclusive License'}
- Preferred Contact Method: ${formData.contactMethod === 'phone' ? 'Phone' : 'Email'}

Additional Message:
${formData.message || 'No additional message'}

Thank you for your time. I look forward to hearing from you.

Best regards,
${formData.name}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      const emailTemplate = generateEmailTemplate()
      
      // Create mailto link
      const mailtoLink = `mailto:newyorkalliancemas@gmail.com?subject=${encodeURIComponent(`Music Purchase Inquiry - ${formData.songTitle || 'Alliance Collective Compositions'}`)}&body=${encodeURIComponent(emailTemplate)}`
      
      // Open email client
      window.location.href = mailtoLink
      
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <Card className={isModal ? "w-full" : "max-w-2xl mx-auto"}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your email client should have opened with a pre-filled message. 
            If it didn't open automatically, please copy the information below and send it to:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="font-semibold">newyorkalliancemas@gmail.com</p>
          </div>
          <div className="text-left bg-muted/50 p-4 rounded-lg mb-6">
            <pre className="text-sm whitespace-pre-wrap">{generateEmailTemplate()}</pre>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Send Another Inquiry
            </Button>
            {isModal && onClose && (
              <Button onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={isModal ? "w-full" : "max-w-2xl mx-auto"}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-primary" />
          <span>Purchase Inquiry</span>
        </CardTitle>
        <CardDescription>
          Fill out this form to inquire about purchasing music arrangements. 
          We'll respond within 24 hours with pricing and availability.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="organization">Organization/School</Label>
              <Input
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="School, band, or organization name"
              />
            </div>
          </div>

          {/* Song Information */}
          <div>
            <Label htmlFor="songTitle">Song/Arrangement Title *</Label>
            <Input
              id="songTitle"
              name="songTitle"
              value={formData.songTitle}
              onChange={handleInputChange}
              required
              placeholder="Enter the title of the arrangement you're interested in"
            />
          </div>

          <div>
            <Label htmlFor="intendedUse">Intended Use *</Label>
            <Textarea
              id="intendedUse"
              name="intendedUse"
              value={formData.intendedUse}
              onChange={handleInputChange}
              required
              placeholder="Describe how you plan to use this arrangement (e.g., school concert, competition, recording, etc.)"
              rows={3}
            />
          </div>

          {/* License Type */}
          <div>
            <Label>License Type *</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="licenseType"
                  value="standard"
                  checked={formData.licenseType === 'standard'}
                  onChange={handleInputChange}
                  className="text-primary"
                />
                <span>Standard Non-Exclusive License</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="licenseType"
                  value="exclusive"
                  checked={formData.licenseType === 'exclusive'}
                  onChange={handleInputChange}
                  className="text-primary"
                />
                <span>Exclusive License</span>
              </label>
            </div>
          </div>

          {/* Contact Preference */}
          <div>
            <Label>Preferred Contact Method *</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === 'email'}
                  onChange={handleInputChange}
                  className="text-primary"
                />
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === 'phone'}
                  onChange={handleInputChange}
                  className="text-primary"
                />
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </label>
            </div>
          </div>

          {/* Additional Message */}
          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any additional questions or special requirements..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Inquiry
                </>
              )}
            </Button>
            {isModal && onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm text-muted-foreground border-t pt-4">
            <p>Or contact us directly at:</p>
            <p className="font-semibold">newyorkalliancemas@gmail.com</p>
            <p>We typically respond within 24 hours</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm

