"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { donationApi, type Donation } from "@/lib/api/donation-api"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Heart, Package, Users, TrendingUp, MapPin, Calendar, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

function DashboardContent() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const { t } = useI18n()
  const [donations, setDonations] = useState<Donation[]>([])
  const [userDonations, setUserDonations] = useState<Donation[]>([])
  const [loadingDonations, setLoadingDonations] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchDonations()
    }
  }, [user])

  const fetchDonations = async () => {
    try {
      const [allDonations, myDonations] = await Promise.all([
        donationApi.getAllDonations(),
        donationApi.getUserDonations(user!._id)
      ])
      setDonations(allDonations)
      setUserDonations(myDonations)
    } catch (error) {
      console.error('Error fetching donations:', error)
    } finally {
      setLoadingDonations(false)
    }
  }

  if (loading || loadingDonations) {
    return <div>{t("loading")}</div>
  }

  if (!user) {
    return null
  }

  const stats = {
    totalDonations: userDonations.length,
    activeDonations: userDonations.filter(d => d.status === 'disponivel' || d.status === 'reservado').length,
    completedDonations: userDonations.filter(d => d.status === 'coletado').length,
    impactedPeople: userDonations.length * 10, // Simple estimate
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-balance mb-2">{t("welcomeUser", { name: user.nome.split(" ")[0] })}!</h1>
              <p className="text-lg text-muted-foreground">
                Manage your donations and see the impact you're making
              </p>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.nome} />
              <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Donations
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDonations}</div>
                <p className="text-xs text-muted-foreground">+2 since last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Donations
                </CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeDonations}</div>
                <p className="text-xs text-muted-foreground">Awaiting collection</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Donations
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedDonations}</div>
                <p className="text-xs text-muted-foreground">+58% since the beginning</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">People Impacted</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.impactedPeople}</div>
                <p className="text-xs text-muted-foreground">Estimate based on donations</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Donations List */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="active" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  <Button asChild>
                    <Link href="/doacoes/nova">New Donation</Link>
                  </Button>
                </div>

                <TabsContent value="active" className="space-y-4">
                  {userDonations
                    .filter((d) => d.status === "disponivel" || d.status === "reservado")
                    .slice(0, 5)
                    .map((donation) => (
                      <Card key={donation._id}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={donation.imagem || "/placeholder.svg"}
                                alt={donation.titulo}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-semibold text-balance">{donation.titulo}</h3>
                                <Badge variant={donation.status === "disponivel" ? "default" : "secondary"}>
                                  {donation.status === "disponivel" ? "Available" : "Reserved"}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{donation.localizacao}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>Expiry: {new Date(donation.dataValidade).toLocaleDateString("en-US")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Package className="h-3 w-3" />
                                  <span>{donation.quantidade}</span>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/doacoes/${donation._id}`}>View Details</Link>
                                </Button>
                                {donation.doador._id === user._id && (
                                  <>
                                    <Button size="sm" variant="ghost">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {userDonations
                    .filter((d) => d.status === "coletado")
                    .slice(0, 5)
                    .map((donation) => (
                      <Card key={donation._id}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={donation.imagem || "/placeholder.svg"}
                                alt={donation.titulo}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-semibold text-balance">{donation.titulo}</h3>
                                <Badge variant="outline">Collected</Badge>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{donation.localizacao}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Package className="h-3 w-3" />
                                  <span>{donation.quantidade}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.nome} />
                      <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.nome}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Account type</p>
                    <Badge variant="secondary" className="capitalize">
                      Donor
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-sm">São Paulo, SP</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/perfil">Edit Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Impact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                  <CardDescription>
                    See the difference you're making
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Goal</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Kg donated</span>
                      <span className="font-medium">127kg</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Estimated meals</span>
                      <span className="font-medium">423</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CO₂ saved</span>
                      <span className="font-medium">89kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/doacoes/nova">
                      <Package className="mr-2 h-4 w-4" />
                      New Donation
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/doacoes">
                      <Heart className="mr-2 h-4 w-4" />
                      View All Donations
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  )
}