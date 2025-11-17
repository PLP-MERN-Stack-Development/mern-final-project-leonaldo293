"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { Heart, MapPin, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 w-full">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Heart className="h-4 w-4 fill-current" />
                  Fighting hunger together
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl">
                  Transform surplus into hope
                </h1>

                <p className="mb-8 text-lg text-muted-foreground text-pretty leading-relaxed md:text-xl">
                  We connect people, restaurants and supermarkets with surplus food to shelters, NGOs and families in need.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button asChild size="lg" className="text-base">
                    <Link href="/registro">
                      Start Donating
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                    <Link href="/mapa">
                      <MapPin className="mr-2 h-5 w-5" />
                      View Donation Map
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="border-y bg-muted/30 py-12">
            <div className="container">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">1.2M+</div>
                  <div className="text-sm text-muted-foreground">Meals Donated</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">850+</div>
                  <div className="text-sm text-muted-foreground">Active Donors</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">320+</div>
                  <div className="text-sm text-muted-foreground">Partner Shelters</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">45</div>
                  <div className="text-sm text-muted-foreground">Cities Served</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="container">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
                  A simple and efficient platform to connect those who can donate with those in need
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Register your donation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Restaurants, supermarkets and individuals can register available food donations quickly and easily.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Find nearby donations</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Shelters and NGOs view available donations on an interactive map, filtering by food type and distance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Reserve and collect</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Reserve the donation with one click and coordinate collection directly with the donor through the platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-muted/30 py-20">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">For donors</h2>
                  <ul className="space-y-4">
                    {[
                      "Reduce food waste",
                      "Contribute to your community",
                      "Simple and fast process",
                      "Track the impact of your donations",
                      "Tax incentives for businesses",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="mt-8">
                    <Link href="/registro">Start Donating</Link>
                  </Button>
                </div>

                <div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">For shelters and NGOs</h2>
                  <ul className="space-y-4">
                    {[
                      "Free access to quality food",
                      "Real-time view of donations",
                      "Simple reservation system",
                      "New donation notifications",
                      "Dedicated support for organizations",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                        <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" variant="secondary" className="mt-8">
                    <Link href="/registro">Register Organization</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container">
              <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-8 md:p-12">
                  <div className="mx-auto max-w-2xl text-center">
                    <TrendingUp className="mx-auto mb-6 h-12 w-12 text-primary" />
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                      Be part of this transformation
                    </h2>
                    <p className="mb-8 text-lg text-muted-foreground text-pretty leading-relaxed">
                      Join thousands of people and organizations already making a difference in the fight against hunger.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                      <Button asChild size="lg">
                        <Link href="/registro">Create Free Account</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href="/sobre">Learn More</Link>
                      </Button>
                    </div>
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