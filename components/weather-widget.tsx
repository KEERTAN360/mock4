"use client"
import { Cloud, Sun, CloudRain, Wind, CloudDrizzle } from "lucide-react"
import { useState, useEffect } from "react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: "sun" | "cloud" | "rain" | "drizzle"
  hourlyForecast: Array<{
    time: string
    temp: number
    icon: "sun" | "cloud" | "rain" | "drizzle"
  }>
}

export default function WeatherWidget() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    location: "Bangalore",
    temperature: 23,
    condition: "Cloudy",
    humidity: 65,
    windSpeed: 12,
    icon: "cloud",
    hourlyForecast: [
      { time: "Now", temp: 23, icon: "cloud" },
      { time: "01:00", temp: 22, icon: "cloud" },
      { time: "03:00", temp: 21, icon: "cloud" },
      { time: "05:00", temp: 20, icon: "cloud" },
      { time: "07:00", temp: 22, icon: "sun" },
    ],
  })

  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const weatherOptions = [
      {
        location: "Bangalore",
        temperature: 23,
        condition: "Cloudy",
        humidity: 65,
        windSpeed: 12,
        icon: "cloud" as const,
        hourlyForecast: [
          { time: "Now", temp: 23, icon: "cloud" as const },
          { time: "01:00", temp: 22, icon: "cloud" as const },
          { time: "03:00", temp: 21, icon: "cloud" as const },
          { time: "05:00", temp: 20, icon: "cloud" as const },
          { time: "07:00", temp: 22, icon: "sun" as const },
        ],
      },
      {
        location: "Mysore",
        temperature: 28,
        condition: "Sunny",
        humidity: 45,
        windSpeed: 8,
        icon: "sun" as const,
        hourlyForecast: [
          { time: "Now", temp: 28, icon: "sun" as const },
          { time: "01:00", temp: 29, icon: "sun" as const },
          { time: "03:00", temp: 30, icon: "sun" as const },
          { time: "05:00", temp: 31, icon: "sun" as const },
          { time: "07:00", temp: 32, icon: "sun" as const },
        ],
      },
      {
        location: "Coorg",
        temperature: 19,
        condition: "Light Rain",
        humidity: 85,
        windSpeed: 15,
        icon: "rain" as const,
        hourlyForecast: [
          { time: "Now", temp: 19, icon: "rain" as const },
          { time: "01:00", temp: 18, icon: "rain" as const },
          { time: "03:00", temp: 17, icon: "drizzle" as const },
          { time: "05:00", temp: 18, icon: "drizzle" as const },
          { time: "07:00", temp: 20, icon: "cloud" as const },
        ],
      },
      {
        location: "Hampi",
        temperature: 32,
        condition: "Clear Sky",
        humidity: 35,
        windSpeed: 6,
        icon: "sun" as const,
        hourlyForecast: [
          { time: "Now", temp: 32, icon: "sun" as const },
          { time: "01:00", temp: 33, icon: "sun" as const },
          { time: "03:00", temp: 34, icon: "sun" as const },
          { time: "05:00", temp: 35, icon: "sun" as const },
          { time: "07:00", temp: 36, icon: "sun" as const },
        ],
      },
    ]

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)]
        setCurrentWeather(randomWeather)
        setIsAnimating(false)
      }, 300)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (iconType: string, size: "sm" | "lg" = "lg") => {
    const sizeClass = size === "sm" ? "h-6 w-6" : "h-8 w-8"
    switch (iconType) {
      case "sun":
        return <Sun className={`${sizeClass} text-orange-500`} />
      case "rain":
        return <CloudRain className={`${sizeClass} text-blue-600`} />
      case "drizzle":
        return <CloudDrizzle className={`${sizeClass} text-blue-500`} />
      default:
        return <Cloud className={`${sizeClass} text-gray-600`} />
    }
  }

  const getThemeColors = () => {
    switch (currentWeather.icon) {
      case "sun":
        return {
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)",
          textColor: "#92400e",
          accentColor: "#d97706",
        }
      case "rain":
        return {
          background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)",
          textColor: "#1e293b",
          accentColor: "#475569",
        }
      case "drizzle":
        return {
          background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)",
          textColor: "#1e40af",
          accentColor: "#3b82f6",
        }
      default:
        return {
          background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
          textColor: "#334155",
          accentColor: "#64748b",
        }
    }
  }

  const renderBackgroundElements = () => {
    const theme = getThemeColors()
    switch (currentWeather.icon) {
      case "sun":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-300/40 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-8 h-8 bg-orange-300/50 rounded-full animate-bounce"></div>
          </div>
        )
      case "rain":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-400/60 animate-pulse"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${10 + (i % 3) * 15}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        )
      case "drizzle":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-2 right-6 w-12 h-6 bg-gradient-to-r from-red-400/50 via-yellow-400/50 via-green-400/50 via-blue-400/50 to-purple-400/50 rounded-full opacity-80"></div>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-2 bg-blue-300/60 animate-pulse"
                style={{
                  left: `${30 + i * 15}%`,
                  top: `${20 + (i % 2) * 10}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              ></div>
            ))}
          </div>
        )
      default:
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-3 right-8 w-10 h-6 bg-gray-400/40 rounded-full animate-pulse"></div>
            <div
              className="absolute top-6 right-12 w-8 h-4 bg-gray-300/50 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-2 right-16 w-6 h-3 bg-gray-500/40 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        )
    }
  }

  const theme = getThemeColors()

  return (
    <div
      className={`weather-widget relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 ${
        isAnimating ? "scale-95 opacity-70" : "scale-100 opacity-100"
      }`}
      style={{
        background: `${theme.background} !important`,
        minHeight: "280px",
      }}
    >
      {renderBackgroundElements()}

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-5xl font-light mb-1" style={{ color: `${theme.textColor} !important` }}>
              {currentWeather.temperature}°
            </div>
            <div className="text-xl font-medium" style={{ color: `${theme.textColor} !important` }}>
              {currentWeather.condition}
            </div>
            <div className="text-lg" style={{ color: `${theme.accentColor} !important` }}>
              {currentWeather.location}
            </div>
          </div>
          <div className="transition-transform duration-300 hover:scale-110">{getWeatherIcon(currentWeather.icon)}</div>
        </div>

        <div className="relative mb-6">
          <svg className="w-full h-8" viewBox="0 0 300 32" fill="none">
            <path
              d="M0 16 Q75 8 150 12 T300 16"
              stroke={theme.accentColor}
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.6"
            />
            <circle cx="20" cy="16" r="4" fill={theme.textColor} />
          </svg>
        </div>

        <div
          className="flex justify-between items-center rounded-lg p-3 mb-4"
          style={{
            backgroundColor: `${theme.accentColor}20`,
          }}
        >
          {currentWeather.hourlyForecast.map((hour, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {getWeatherIcon(hour.icon, "sm")}
              <div className="text-sm font-medium" style={{ color: `${theme.textColor} !important` }}>
                {hour.time}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-center gap-4 text-xs"
          style={{ color: `${theme.accentColor} !important` }}
        >
          <span>💧 {currentWeather.humidity}%</span>
          <div className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            <span>{currentWeather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
