"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, User, MapPin, Phone, Mail, Calendar, Edit3 } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Keertan",
    email: "keertan@example.com",
    phone: "+91 9876543210",
    location: "Bangalore, Karnataka",
    joinDate: "January 2024",
  })

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (!storedUsername) {
      router.push("/login")
    } else {
      setUsername(storedUsername)
    }
  }, [router])

  const travelHistory = [
    { place: "Mysore Palace", date: "Dec 2023", rating: 5 },
    { place: "Coorg Hills", date: "Nov 2023", rating: 4 },
    { place: "Hampi Ruins", date: "Oct 2023", rating: 5 },
  ]

  const emergencyContacts = [
    { name: "John Doe", relation: "Brother", phone: "+91 9876543211" },
    { name: "Jane Smith", relation: "Friend", phone: "+91 9876543212" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex items-center gap-4 p-4 pt-6 bg-white shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
      </div>

      <div className="p-4 pb-20 space-y-6">
        {/* Profile Header */}
        <Card
          className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl border-0"
          style={{
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-blue-100">Karnataka Explorer</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
              className="text-white hover:bg-white/20"
            >
              <Edit3 className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="p-6 rounded-3xl border-0 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-500" />
              {isEditing ? (
                <Input
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700">{profileData.email}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-500" />
              {isEditing ? (
                <Input
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="flex-1"
                />
              ) : (
                <span className="text-gray-700">{profileData.phone}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-red-500" />
              <span className="text-gray-700">{profileData.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="text-gray-700">Member since {profileData.joinDate}</span>
            </div>
          </div>
        </Card>

        {/* Travel History */}
        <Card className="p-6 rounded-3xl border-0 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Travel History</h3>
          <div className="space-y-3">
            {travelHistory.map((trip, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-medium text-gray-800">{trip.place}</p>
                  <p className="text-sm text-gray-600">{trip.date}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < trip.rating ? "text-yellow-400" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-6 rounded-3xl border-0 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-2xl">
                <div>
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.relation}</p>
                </div>
                <p className="text-sm font-medium text-red-600">{contact.phone}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
