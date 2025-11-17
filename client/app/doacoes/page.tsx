"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { mockDonations, categoryLabels, type Donation } from "@/lib/donations-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Package, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function DonationsContent() {
  const [donations, setDonations] = useState<Donation[]>(mockDonations)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || donation.category === categoryFilter
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: Donation["status"]) => {
    const variants = {
      disponivel: "default",
      reservado: "secondary",
      coletado: "outline",
    } as const

    const labels = {
      disponivel: "Available",
      reservado: "Reserved",
      coletado: "Collected",
    }

    return (
      <Badge variant={variants[status]} className="capitalize">
        {labels[status]}
      </Badge>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-balance mb-3">Available Donations</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Find available food donations in your area
            </p>
          </div>

          {/* Filters Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="frutas">Fruits</SelectItem>
                    <SelectItem value="vegetais">Vegetables</SelectItem>
                    <SelectItem value="graos">Grains</SelectItem>
                    <SelectItem value="laticinios">Dairy</SelectItem>
                    <SelectItem value="proteinas">Proteins</SelectItem>
                    <SelectItem value="padaria">Bakery</SelectItem>
                    <SelectItem value="outros">Others</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectItem value="disponivel">Available</SelectItem>
                    <SelectItem value="reservado">Reserved</SelectItem>
                    <SelectItem value="coletado">Collected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredDonations.length} {filteredDonations.length === 1 ? "donation found" : "donations found"}
            </p>
            <Button asChild>
              <Link href="/doacoes/nova">New Donation</Link>
            </Button>
          </div>

          {/* Donations Grid */}
          {filteredDonations.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center">
                <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No donations found</h3>
                <p className="text-muted-foreground">Try adjusting the filters or search for other terms</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDonations.map((donation) => (
                <Card key={donation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={donation.image || "/placeholder.svg"}
                      alt={donation.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl text-balance">{donation.title}</CardTitle>
                      {getStatusBadge(donation.status)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {donation.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{donation.quantity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Expiry: {new Date(donation.expiryDate).toLocaleDateString("en-US")}</span>
                      </div>
                    </div>
                    <div>
                      <Badge variant="secondary">{categoryLabels[donation.category]}</Badge>
                    </div>
                    {donation.reservedBy && (
                      <p className="text-sm text-muted-foreground">Reserved by: {donation.reservedBy}</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" disabled={donation.status !== "disponivel"}>
                      <Link href={`/doacoes/${donation.id}`}>
                        {donation.status === "disponivel" ? "View Details" : "Unavailable"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function DonationsPage() {
  return (
    <AuthProvider>
      <DonationsContent />
    </AuthProvider>
  )
}