"use client"

import type React from "react"

import { Bot, X, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function AIHelper() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your travel assistant. I can help you with tourist spots, emergency information, travel tips, and more. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      setIsListening(false)
      recognition.stop()
    }
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Emergency responses
    if (lowerMessage.includes("emergency") || lowerMessage.includes("help") || lowerMessage.includes("sos")) {
      return "For emergencies, press the SOS button on the main page or call: Police (100), Ambulance (108), Fire (101). I can also help you find the nearest emergency center."
    }

    // Tourist spots
    if (lowerMessage.includes("tourist") || lowerMessage.includes("places") || lowerMessage.includes("visit")) {
      return "Karnataka has amazing places! Popular spots include Mysore Palace, Coorg Hills, Hampi Ruins, and Gokarna Beach. Check the Tourist Spots section for more details and save your favorites!"
    }

    // Weather
    if (lowerMessage.includes("weather")) {
      return "You can check the current weather on the home page. Karnataka generally has pleasant weather, but monsoons (June-September) can affect travel plans."
    }

    // Transportation
    if (
      lowerMessage.includes("transport") ||
      lowerMessage.includes("travel") ||
      lowerMessage.includes("bus") ||
      lowerMessage.includes("train")
    ) {
      return "Karnataka has good connectivity via buses, trains, and flights. For local travel, you can use auto-rickshaws, taxis, or metro in Bangalore. Check the travel options in hotel details for specific routes."
    }

    // Documents
    if (lowerMessage.includes("document") || lowerMessage.includes("id") || lowerMessage.includes("passport")) {
      return "Keep your ID proof handy for hotel check-ins and tourist spots. You can store digital copies in the Documents section of the app for easy access."
    }

    // Food
    if (lowerMessage.includes("food") || lowerMessage.includes("restaurant") || lowerMessage.includes("eat")) {
      return "Karnataka offers delicious South Indian cuisine! Try dosa, idli, bisi bele bath, and Mysore pak. Check the restaurants category in Tourist Spots for local recommendations."
    }

    // Safety
    if (lowerMessage.includes("safe") || lowerMessage.includes("security")) {
      return "Stay safe by avoiding isolated areas at night, keeping emergency contacts handy, and sharing your location with family. The app has safety hazard warnings for tourist spots."
    }

    // Default responses
    const defaultResponses = [
      "I can help you with tourist information, emergency services, travel tips, and more. What would you like to know?",
      "Feel free to ask about places to visit, safety information, or any travel-related questions!",
      "I'm here to make your Karnataka travel experience better. How can I assist you today?",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const sendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])

      // Auto-speak AI response
      speak(aiResponse.text)
    }, 1000)

    setInputText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          style={{
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
          }}
        >
          <Bot className="h-8 w-8" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 w-80 h-96">
      <Card className="h-full flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">AI Travel Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={isSpeaking ? stopSpeaking : undefined}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  message.isUser ? "bg-blue-500 text-white rounded-br-md" : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 opacity-70 ${message.isUser ? "text-blue-100" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="pr-12 rounded-full border-border"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full ${
                  isListening ? "bg-red-500 text-white animate-pulse" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className="rounded-full bg-blue-500 hover:bg-blue-600 text-white h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
