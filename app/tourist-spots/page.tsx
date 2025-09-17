"use client"

import {
  Search,
  Menu,
  MapPin,
  AlertTriangle,
  Star,
  UtensilsCrossed,
  Compass,
  Coffee,
  Hotel,
  Calendar,
  Activity,
  Bookmark,
  AlertCircle,
  Users,
  TrendingUp,
  Eye,
  Zap,
  Shield,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BottomNavigation from "@/components/bottom-navigation"
import LikeButton from "@/components/like-button"

const GoogleMap = () => {
  const [map, setMap] = useState<any>(null)
  const [places, setPlaces] = useState<any[]>([])
  const [liveStats, setLiveStats] = useState({
    visitors: 1247,
    trending: 8,
    activeNow: 342,
  })

  useEffect(() => {
    const statsInterval = setInterval(() => {
      setLiveStats((prev) => ({
        visitors: prev.visitors + Math.floor(Math.random() * 10) - 5,
        trending: prev.trending + Math.floor(Math.random() * 3) - 1,
        activeNow: prev.activeNow + Math.floor(Math.random() * 20) - 10,
      }))
    }, 3000)

    const initMap = () => {
      if (typeof window !== "undefined" && (window as any).google) {
        const mapInstance = new (window as any).google.maps.Map(document.getElementById("map"), {
          center: { lat: 12.9716, lng: 77.5946 }, // Bangalore coordinates
          zoom: 10,
          styles: [
            {
              featureType: "poi.attraction",
              elementType: "geometry",
              stylers: [{ color: "#3b82f6" }],
            },
          ],
        })

        const service = new (window as any).google.maps.places.PlacesService(mapInstance)

        // Search for tourist attractions in Karnataka
        const request = {
          location: { lat: 12.9716, lng: 77.5946 },
          radius: 50000,
          type: "tourist_attraction",
        }

        service.nearbySearch(request, (results: any[], status: any) => {
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && results) {
            setPlaces(results.slice(0, 10))

            results.slice(0, 10).forEach((place: any) => {
              const marker = new (window as any).google.maps.Marker({
                position: place.geometry.location,
                map: mapInstance,
                title: place.name,
                icon: {
                  url:
                    "data:image/svg+xml;base64," +
                    btoa(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                    </svg>
                  `),
                  scaledSize: new (window as any).google.maps.Size(24, 24),
                },
              })

              const infoWindow = new (window as any).google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px;">
                    <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${place.name}</h3>
                    <p style="margin: 0; font-size: 12px; color: #666;">${place.vicinity}</p>
                    <div style="display: flex; align-items: center; margin-top: 4px;">
                      <span style="color: #f59e0b;">★</span>
                      <span style="margin-left: 4px; font-size: 12px;">${place.rating || "N/A"}</span>
                    </div>
                  </div>
                `,
              })

              marker.addListener("click", () => {
                infoWindow.open(mapInstance, marker)
              })
            })
          }
        })

        setMap(mapInstance)
      }
    }

    // Load Google Maps API
    if (!(window as any).google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Zd7rDC2d0JlmkDdd3V_6Hp53PfkbeV4&libraries=places&callback=initMap`
      script.async = true
      script.defer = true
      ;(window as any).initMap = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }

    return () => {
      clearInterval(statsInterval)
    }
  }, [])

  return (
    <div className="w-full h-full">
      <div id="map" className="w-full h-full rounded-2xl"></div>
    </div>
  )
}

export default function TouristSpotsPage() {
  const router = useRouter()
  const [liveStats, setLiveStats] = useState({
    visitors: 1247,
    trending: 8,
    activeNow: 342,
  })
  const [preferences, setPreferences] = useState<any>(null)

  useEffect(() => {
    const statsInterval = setInterval(() => {
      setLiveStats((prev) => ({
        visitors: prev.visitors + Math.floor(Math.random() * 10) - 5,
        trending: prev.trending + Math.floor(Math.random() * 3) - 1,
        activeNow: prev.activeNow + Math.floor(Math.random() * 20) - 10,
      }))
    }, 3000)

    return () => clearInterval(statsInterval)
  }, [])

  useEffect(() => {
    const loadPrefs = async () => {
      const username = localStorage.getItem("username") || "guest"
      try {
        const res = await fetch(`/api/preferences?username=${encodeURIComponent(username)}`, { cache: "no-store" })
        const data = await res.json()
        setPreferences(data?.preferences || null)
      } catch {}
    }
    loadPrefs()
  }, [])

  const categories = [
    { icon: Hotel, label: "Stays", color: "from-blue-400 to-blue-600", href: "/stays" },
    { icon: UtensilsCrossed, label: "Restaurants", color: "from-green-400 to-green-600" },
    { icon: Coffee, label: "Cafes", color: "from-amber-400 to-amber-600" },
    { icon: Calendar, label: "Events", color: "from-pink-400 to-pink-600" },
    { icon: Activity, label: "Activities", color: "from-orange-400 to-orange-600" },
    { icon: Compass, label: "Explore", color: "from-indigo-400 to-indigo-600", href: "/explore" },
  ]

  const safetyHazards = [
    {
      name: "Jog Falls Trek Path",
      image: "/dynamic-safety-hazard-rain.jpg",
      reason: "Slippery rocks during monsoon",
      severity: "high",
      condition: "Heavy Rain",
    },
    {
      name: "Coorg Night Safari",
      image: "/dynamic-safety-hazard-dark.jpg",
      reason: "Wild animal encounters reported",
      severity: "medium",
      condition: "After Dark",
    },
    {
      name: "Hampi Cliff Areas",
      image: "/dynamic-safety-hazard-theft.jpg",
      reason: "Theft reports in isolated areas",
      severity: "high",
      condition: "Isolated Areas",
    },
    {
      name: "Landslide Zone",
      image: "/dynamic-safety-hazard-landslide.jpg",
      reason: "Recent landslide activity",
      severity: "high",
      condition: "Monsoon Season",
    },
  ]

  const recommendedSpots = [
    {
      name: "Mysore Palace",
      image: "/dynamic-mysore-palace-full.jpg",
      rating: "4.8",
      timing: "10 AM - 5:30 PM",
      entry: "₹70",
      description: "Magnificent royal architecture",
      safetyScore: 9.2,
      safetyLevel: "Very Safe",
      safetyColor: "text-green-500",
    },
    {
      name: "Coorg Hills",
      image: "/dynamic-coorg-hills-full.jpg",
      rating: "4.9",
      timing: "6 AM - 6 PM",
      entry: "Free",
      description: "Scenic coffee plantations",
      safetyScore: 8.7,
      safetyLevel: "Safe",
      safetyColor: "text-green-500",
    },
    {
      name: "Hampi Ruins",
      image: "/dynamic-hampi-ruins-full.jpg",
      rating: "4.7",
      timing: "6 AM - 6 PM",
      entry: "₹40",
      description: "Ancient Vijayanagara empire",
      safetyScore: 7.8,
      safetyLevel: "Moderate",
      safetyColor: "text-yellow-500",
    },
    {
      name: "Gokarna Beach",
      image: "/dynamic-gokarna-beach-full.jpg",
      rating: "4.6",
      timing: "24 Hours",
      entry: "Free",
      description: "Pristine coastal paradise",
      safetyScore: 8.1,
      safetyLevel: "Safe",
      safetyColor: "text-green-500",
    },
  ]

  const featuredThisMonth = [
    {
      name: "Chikmagalur Coffee Estates",
      image: "/dynamic-featured-chikmagalur.jpg",
      rating: "4.8",
      timing: "7 AM - 6 PM",
      entry: "₹200",
      description: "Aromatic coffee plantation tours",
      safetyScore: 8.9,
      safetyLevel: "Safe",
      safetyColor: "text-green-500",
    },
    {
      name: "Jog Falls",
      image: "/dynamic-featured-jog-falls.jpg",
      rating: "4.9",
      timing: "6 AM - 6 PM",
      entry: "₹30",
      description: "India's second highest waterfall",
      safetyScore: 6.5,
      safetyLevel: "Caution",
      safetyColor: "text-orange-500",
    },
    {
      name: "Bandipur National Park",
      image: "/dynamic-featured-bandipur.jpg",
      rating: "4.7",
      timing: "6 AM - 6 PM",
      entry: "₹300",
      description: "Wildlife safari adventure",
      safetyScore: 7.3,
      safetyLevel: "Moderate",
      safetyColor: "text-yellow-500",
    },
  ]

  const nearestToYou = [
    {
      name: "Lalbagh Botanical Garden",
      image: "/dynamic-nearest-lalbagh.jpg",
      rating: "4.5",
      timing: "6 AM - 7 PM",
      entry: "₹10",
      description: "Historic botanical paradise",
      safetyScore: 9.1,
      safetyLevel: "Very Safe",
      safetyColor: "text-green-500",
    },
    {
      name: "Bangalore Palace",
      image: "/dynamic-nearest-palace.jpg",
      rating: "4.6",
      timing: "10 AM - 5:30 PM",
      entry: "₹230",
      description: "Tudor-style royal residence",
      safetyScore: 8.8,
      safetyLevel: "Safe",
      safetyColor: "text-green-500",
    },
    {
      name: "Cubbon Park",
      image: "/dynamic-nearest-cubbon.jpg",
      rating: "4.4",
      timing: "6 AM - 6 PM",
      entry: "Free",
      description: "Urban green lung",
      safetyScore: 8.3,
      safetyLevel: "Safe",
      safetyColor: "text-green-500",
    },
  ]

  const baseForYou = [
    {
      name: "Nandi Hills",
      image: "/dynamic-foryou-nandi.jpg",
      rating: "4.7",
      timing: "6 AM - 10 PM",
      entry: "₹30",
      description: "Sunrise viewpoint paradise",
      safetyScore: 7.6,
      safetyLevel: "Moderate",
      safetyColor: "text-yellow-500",
    },
    {
      name: "Shivanasamudra Falls",
      image: "/dynamic-foryou-shivanasamudra.jpg",
      rating: "4.8",
      timing: "9 AM - 5 PM",
      entry: "₹20",
      description: "Twin waterfalls spectacle",
      safetyScore: 6.8,
      safetyLevel: "Caution",
      safetyColor: "text-orange-500",
    },
    {
      name: "Lepakshi Temple",
      image: "/dynamic-foryou-lepakshi.jpg",
      rating: "4.6",
      timing: "6 AM - 6 PM",
      entry: "Free",
      description: "Architectural marvel",
      safetyScore: 8.5,
      safetyLevel: "Safe",
      safetyColor: "text-green-500",
    },
  ]

  // Simple preference-based filtering/reordering
  const forYou = (() => {
    if (!preferences) return baseForYou
    const interests: string[] = preferences?.interests || []
    const travelType = preferences?.travelType
    let scored = baseForYou.map((spot) => ({ spot, score: 0 }))
    scored.forEach((s) => {
      if (interests.includes("heritage") && /palace|temple|ruins|heritage/i.test(s.spot.name + s.spot.description)) s.score += 2
      if (interests.includes("adventure") && /hills|trek|adventure/i.test(s.spot.name + s.spot.description)) s.score += 2
      if (interests.includes("food") && /food|cafe|restaurant/i.test(s.spot.description)) s.score += 1
      if (travelType === "Family" && /park|garden|temple|palace/i.test(s.spot.name + s.spot.description)) s.score += 1
      if (travelType === "Solo" && /trek|hills|beach/i.test(s.spot.name + s.spot.description)) s.score += 1
    })
    scored.sort((a, b) => b.score - a.score)
    return scored.map((s) => s.spot)
  })()

  const SpotCard = ({ spot }: { spot: any }) => (
    <Card
      className="placard-3d flex-shrink-0 w-52 rounded-3xl overflow-hidden shadow-md cursor-pointer bg-card border border-border"
      onClick={() => router.push(`/hotel/${encodeURIComponent(spot.name)}`)}
    >
      <div className="relative">
        <img src={spot.image || "/placeholder.svg"} alt={spot.name} className="w-full h-32 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-2 right-2">
          <LikeButton
            placeId={spot.name.toLowerCase().replace(/\s+/g, "-")}
            placeName={spot.name}
            placeData={{
              name: spot.name,
              location: "Karnataka, India",
              image: spot.image,
              rating: spot.rating,
              timing: spot.timing,
              entry: spot.entry,
              description: spot.description,
            }}
            size="sm"
            className="shadow-lg"
          />
        </div>
        <div className="absolute top-2 left-2">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
            <div
              className={`w-2 h-2 rounded-full ${spot.safetyColor === "text-green-500" ? "bg-green-500" : spot.safetyColor === "text-yellow-500" ? "bg-yellow-500" : "bg-orange-500"}`}
            ></div>
            <span className="text-xs font-medium text-gray-800">{spot.safetyScore}</span>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 text-white">
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs opacity-90">Open: {spot.timing}</p>
                <p className="text-xs opacity-90">Entry: {spot.entry}</p>
                <p className={`text-xs font-medium ${spot.safetyColor}`}>Safety: {spot.safetyLevel}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs">{spot.rating}</span>
              </div>
            </div>
            <p className="text-xs opacity-75 italic">{spot.description}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-card-foreground text-center">{spot.name}</h3>
      </div>
    </Card>
  )

  const SafetyHazardCard = ({ hazard }: { hazard: any }) => (
    <Card className="placard-3d flex-shrink-0 w-48 rounded-3xl overflow-hidden shadow-md bg-card border border-destructive/20">
      <div className="relative">
        <img src={hazard.image || "/placeholder.svg"} alt={hazard.name} className="w-full h-28 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/20 to-transparent" />
        <div className="absolute top-2 right-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              hazard.severity === "high" ? "bg-red-500 text-white" : "bg-amber-500 text-white"
            }`}
          >
            {hazard.condition}
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 text-white">
          <div className="flex items-center gap-1 mb-1">
            <AlertCircle className={`h-3 w-3 ${hazard.severity === "high" ? "text-red-400" : "text-amber-400"}`} />
            <span className="text-xs font-medium">{hazard.severity.toUpperCase()} RISK</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-card-foreground mb-1">{hazard.name}</h3>
        <p className="text-xs text-muted-foreground">{hazard.reason}</p>
      </div>
    </Card>
  )

  const handleCategoryClick = (category: any) => {
    if (category.href) {
      router.push(category.href)
    }
  }

  const handleMapClick = () => {
    router.push("/explore")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 pt-6">
        <h1 className="text-xl font-semibold text-foreground">Tourist Spots</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 shadow-lg h-10 w-10"
            onClick={() => router.push("/geofencing-alerts")}
          >
            <AlertTriangle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 shadow-lg h-10 w-10"
            onClick={() => router.push("/saved-places")}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground bg-blue-500 rounded-xl hover:bg-blue-600 shadow-lg h-10 w-10"
            onClick={() => router.push("/sos")}
          >
            <Shield className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground bg-card rounded-xl hover:bg-muted border border-border h-10 w-10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search tourist spots"
            className="pl-10 bg-input border border-border rounded-full h-12 text-center text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 px-4 pb-20">
        <Card className="placard-3d rounded-2xl overflow-hidden shadow-lg mb-4 h-48 relative cursor-pointer bg-card border border-border">
          <GoogleMap />
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-border">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Live Tourist Map</p>
                <p className="text-xs text-muted-foreground">Real-time attractions</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <Button
            onClick={() => router.push("/wishlist")}
            className="w-full p-4 bg-gradient-to-r from-accent to-primary text-accent-foreground rounded-2xl hover:from-accent/90 hover:to-primary/90 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Discover Your Wishlist</span>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="placard-3d p-3 text-center bg-card border border-border rounded-2xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-card-foreground">{liveStats.visitors}</span>
            </div>
            <p className="text-xs text-muted-foreground">Live Visitors</p>
          </Card>
          <Card className="placard-3d p-3 text-center bg-card border border-border rounded-2xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-lg font-bold text-card-foreground">{liveStats.trending}</span>
            </div>
            <p className="text-xs text-muted-foreground">Trending Now</p>
          </Card>
          <Card className="placard-3d p-3 text-center bg-card border border-border rounded-2xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="h-4 w-4 text-secondary" />
              <span className="text-lg font-bold text-card-foreground">{liveStats.activeNow}</span>
            </div>
            <p className="text-xs text-muted-foreground">Active Now</p>
          </Card>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {categories.map((category) => (
            <Card
              key={category.label}
              onClick={() => handleCategoryClick(category)}
              className={`placard-3d relative p-4 h-28 flex flex-col items-center justify-center cursor-pointer text-white border-0 rounded-2xl shadow-lg bg-gradient-to-br ${category.color}`}
            >
              <category.icon className="h-10 w-10 mb-2" />
              <span className="text-xs font-medium text-center leading-tight">{category.label}</span>
            </Card>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Places to Skip Due to Safety Hazards
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {safetyHazards.map((hazard, index) => (
              <SafetyHazardCard key={index} hazard={hazard} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Spots</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {recommendedSpots.map((spot, index) => (
              <SpotCard key={index} spot={spot} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Featured This Month</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {featuredThisMonth.map((spot, index) => (
              <SpotCard key={index} spot={spot} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Nearest to You</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {nearestToYou.map((spot, index) => (
              <SpotCard key={index} spot={spot} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">For You</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {forYou.map((spot, index) => (
              <SpotCard key={index} spot={spot} />
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
