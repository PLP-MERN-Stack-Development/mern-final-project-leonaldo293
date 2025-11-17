"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Leaf, Target, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Solidarity",
      description: "We believe in the power of community to fight hunger and food waste.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We reduce food waste and environmental impact through redistribution.",
    },
    {
      icon: Users,
      title: "Inclusion",
      description: "We connect people, businesses and organizations for a common goal.",
    },
    {
      icon: Target,
      title: "Transparency",
      description: "We maintain clear and traceable processes to ensure trust and efficiency.",
    },
  ]

  const stats = [
    { value: "10,000+", label: "Kg of food donated" },
    { value: "500+", label: "Active donors" },
    { value: "150+", label: "Partner NGOs and shelters" },
    { value: "30,000+", label: "People impacted" },
  ]

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary mb-6">
                <Heart className="h-8 w-8 text-primary-foreground fill-current" />
              </div>
              <h1 className="text-5xl font-bold text-balance mb-6">About Food Share</h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                We are a solidarity platform that connects people, restaurants and supermarkets with surplus food to 
                shelters, NGOs and families in vulnerable situations. Our mission is to combat hunger and reduce food 
                waste through technology and community collaboration.
              </p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4 border-y bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-balance mb-6">Our Mission</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Food Share was born from the need to create a bridge between those who have excess food and those 
                      who need it. In Brazil, millions of tons of food are wasted annually, while millions of people go hungry.
                    </p>
                    <p>
                      Our platform facilitates food donation in a fast, safe and efficient way, using geolocation 
                      technology to connect nearby donors and beneficiaries, reducing transportation time and ensuring 
                      food quality.
                    </p>
                    <p>
                      We believe that together we can build a fairer and more sustainable society, where no food is 
                      wasted and no one goes hungry.
                    </p>
                  </div>
                </div>
                <div className="grid gap-6">
                  <Card className="border-primary/20">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Social Impact</h3>
                        <p className="text-sm text-muted-foreground">
                          Every donation represents meals for families in vulnerable situations and reduction of waste.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/20">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Sustainable Growth</h3>
                        <p className="text-sm text-muted-foreground">
                          We continuously expand our network of donors and beneficiaries, increasing our positive impact.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-balance mb-4">Our Values</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  The principles that guide our work and our community
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl font-bold text-balance mb-4">Be Part of This Change</h2>
                  <p className="text-lg text-primary-foreground/90 text-pretty mb-8">
                    Join thousands of people and organizations that are making a difference in the fight against hunger and food waste.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/registro">Get Started</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      <Link href="/doacoes">View Donations</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  )
}