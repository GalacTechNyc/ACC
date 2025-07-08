import { Music, Users, Film, Palette, Award, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'

// Services Section Component
function ServicesSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const services = [
    {
      title: "Custom Drumline Arrangements",
      description: "Tailored percussion arrangements for your marching band or drumline ensemble",
      icon: <Music className="h-8 w-8 text-primary" />,
      features: ["Any skill level", "Custom instrumentation", "Performance notes included"]
    },
    {
      title: "Full Band Compositions",
      description: "Complete orchestral and concert band pieces for any occasion",
      icon: <Users className="h-8 w-8 text-secondary" />,
      features: ["Concert performances", "Competition pieces", "Educational arrangements"]
    },
    {
      title: "Media & Film Scoring",
      description: "Professional compositions for gaming, film, and multimedia projects",
      icon: <Film className="h-8 w-8 text-accent" />,
      features: ["Cinematic quality", "Multiple formats", "Commercial licensing"]
    },
    {
      title: "Arrangement Services",
      description: "Transform existing pieces into new arrangements for your ensemble",
      icon: <Palette className="h-8 w-8 text-green-600" />,
      features: ["Popular songs", "Classical adaptations", "Modern arrangements"]
    },
    {
      title: "Competition Pieces",
      description: "High-impact arrangements designed specifically for competitive performance",
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      features: ["Contest-ready", "Judge-approved", "Performance coaching"]
    },
    {
      title: "Rush Orders",
      description: "Expedited composition services for time-sensitive projects",
      icon: <Clock className="h-8 w-8 text-red-600" />,
      features: ["48-hour turnaround", "Priority support", "Quality guaranteed"]
    }
  ]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional music composition and arrangement services tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  {service.icon}
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full btn-primary"
                  onClick={() => scrollToSection('contact')}
                >
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us today to discuss your project requirements and get a personalized quote. 
              We work with educational institutions, professional ensembles, and commercial projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-accent"
                onClick={() => scrollToSection('contact')}
              >
                Start Your Project
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('featured')}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

