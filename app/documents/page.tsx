"use client"
import {
  FileText,
  Shield,
  Plane,
  Menu,
  Home,
  MapPin,
  CreditCard,
  AlertTriangle,
  Upload,
  Camera,
  ArrowLeft,
  Check,
  X,
  Bot,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DocumentsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([])
  const [showInsuranceSummary, setShowInsuranceSummary] = useState(false)
  const [selectedInsurance, setSelectedInsurance] = useState<any>(null)
  const [importInsuranceText, setImportInsuranceText] = useState("")
  const [importInsuranceResult, setImportInsuranceResult] = useState<any>(null)

  const documentCategories = [
    {
      icon: FileText,
      label: "Government Documents",
      bgColor: "from-blue-500 to-blue-600",
      id: "government",
    },
    {
      icon: Shield,
      label: "Insurance",
      bgColor: "from-green-500 to-green-600",
      id: "insurance",
    },
    {
      icon: Plane,
      label: "Import Insurance",
      bgColor: "from-purple-500 to-purple-600",
      id: "import",
    },
  ]

  const governmentDocTypes = [
    { id: "passport", label: "Passport", icon: "🛂", required: true },
    { id: "license", label: "Driving License", icon: "🚗", required: false },
    { id: "student", label: "Student ID", icon: "🎓", required: false, condition: "If applicable" },
    { id: "visa", label: "Visa", icon: "✈️", required: false, condition: "If applicable" },
  ]

  const insuranceOptions = [
    {
      id: "travel",
      name: "Travel Insurance",
      icon: "🛡️",
      provider: "HDFC ERGO",
      coverage: ["Medical emergencies", "Trip cancellation", "Lost baggage", "Flight delays"],
      doesNotCover: ["Pre-existing conditions", "Adventure sports", "War/terrorism"],
      premium: "₹2,500/year",
    },
    {
      id: "health",
      name: "Health Insurance",
      icon: "🏥",
      provider: "Star Health",
      coverage: ["Hospitalization", "Day care procedures", "Pre/post hospitalization", "Ambulance"],
      doesNotCover: ["Cosmetic surgery", "Dental treatment", "Maternity (first year)"],
      premium: "₹15,000/year",
    },
    {
      id: "vehicle",
      name: "Vehicle Insurance",
      icon: "🚗",
      provider: "ICICI Lombard",
      coverage: ["Third party liability", "Own damage", "Theft protection", "Natural disasters"],
      doesNotCover: ["Normal wear and tear", "Mechanical breakdown", "Drunk driving"],
      premium: "₹8,500/year",
    },
    {
      id: "life",
      name: "Life Insurance",
      icon: "❤️",
      provider: "LIC India",
      coverage: ["Death benefit", "Maturity benefit", "Tax benefits", "Loan facility"],
      doesNotCover: ["Suicide (first year)", "War", "Self-inflicted injuries"],
      premium: "₹25,000/year",
    },
  ]

  const handleDocumentUpload = (docType: string) => {
    // Simulate file upload
    const newDoc = {
      id: Date.now(),
      type: docType,
      name: `${docType}_document.pdf`,
      uploadDate: new Date().toLocaleDateString(),
      status: "verified",
    }
    setUploadedDocuments([...uploadedDocuments, newDoc])
  }

  const handleInsuranceAnalysis = (insurance: any) => {
    setSelectedInsurance(insurance)
    setShowInsuranceSummary(true)
  }

  const handleImportInsurance = () => {
    // Simulate AI analysis of imported insurance
    const isValidInIndia = Math.random() > 0.3 // 70% chance of being valid

    setImportInsuranceResult({
      isValid: isValidInIndia,
      provider: "International Insurance Co.",
      coverage: ["Emergency medical", "Repatriation"],
      validInIndia: isValidInIndia,
      recommendation: isValidInIndia
        ? "This insurance is valid in India and provides adequate coverage for your travel."
        : "This insurance is NOT valid in India. We recommend purchasing local travel insurance.",
    })
  }

  if (selectedCategory === "government") {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center gap-3 p-4 pt-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCategory(null)}
            className="text-foreground bg-card border border-border rounded-xl hover:bg-muted shadow-md"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground text-center">Government Documents</h1>
          </div>
        </div>

        <div className="px-4 pb-20">
          <div className="space-y-4">
            {governmentDocTypes.map((docType) => (
              <Card key={docType.id} className="placard-3d p-4 bg-card border border-border rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{docType.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{docType.label}</h3>
                      {docType.condition && <p className="text-xs text-muted-foreground">{docType.condition}</p>}
                      {docType.required && <p className="text-xs text-destructive">Required</p>}
                    </div>
                  </div>
                  {uploadedDocuments.find((doc) => doc.type === docType.id) ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="h-5 w-5" />
                      <span className="text-sm font-medium">Uploaded</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDocumentUpload(docType.id)}
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                      <Button
                        onClick={() => handleDocumentUpload(docType.id)}
                        size="sm"
                        variant="outline"
                        className="border-border hover:bg-muted rounded-xl"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {uploadedDocuments.find((doc) => doc.type === docType.id) && (
                  <div className="bg-muted p-3 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {uploadedDocuments.find((doc) => doc.type === docType.id)?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {uploadedDocuments.find((doc) => doc.type === docType.id)?.uploadDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <Shield className="h-4 w-4" />
                        <span className="text-xs">Verified</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Card className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-border rounded-2xl">
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">Secure Document Storage</h3>
              <p className="text-sm text-muted-foreground">
                All documents are encrypted and stored securely with blockchain verification
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedCategory === "insurance") {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center gap-3 p-4 pt-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCategory(null)}
            className="text-foreground bg-card border border-border rounded-xl hover:bg-muted shadow-md"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground text-center">Insurance Management</h1>
          </div>
        </div>

        <div className="px-4 pb-20">
          <div className="space-y-4">
            {insuranceOptions.map((insurance) => (
              <Card key={insurance.id} className="placard-3d p-4 bg-card border border-border rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{insurance.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{insurance.name}</h3>
                      <p className="text-sm text-muted-foreground">{insurance.provider}</p>
                      <p className="text-xs text-accent font-medium">{insurance.premium}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleInsuranceAnalysis(insurance)}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl"
                  >
                    <Bot className="h-4 w-4 mr-1" />
                    Summarize with AI
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Covers</span>
                    </div>
                    <ul className="space-y-1">
                      {insurance.coverage.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-xs text-green-700">
                          • {item}
                        </li>
                      ))}
                      {insurance.coverage.length > 2 && (
                        <li className="text-xs text-green-600">+{insurance.coverage.length - 2} more</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <X className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Doesn't Cover</span>
                    </div>
                    <ul className="space-y-1">
                      {insurance.doesNotCover.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-xs text-red-700">
                          • {item}
                        </li>
                      ))}
                      {insurance.doesNotCover.length > 2 && (
                        <li className="text-xs text-red-600">+{insurance.doesNotCover.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-border rounded-2xl">
            <h3 className="font-semibold text-foreground mb-3">Recommended Insurance</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Based on your travel patterns and profile, we recommend:
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                Travel Insurance
              </Button>
              <Button size="sm" variant="outline" className="border-border hover:bg-muted rounded-xl bg-transparent">
                Health Insurance
              </Button>
            </div>
          </Card>
        </div>

        {/* AI Insurance Summary Modal */}
        {showInsuranceSummary && selectedInsurance && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">AI Insurance Summary</h3>
                  </div>
                  <Button
                    onClick={() => setShowInsuranceSummary(false)}
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">{selectedInsurance.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      This {selectedInsurance.name.toLowerCase()} policy from {selectedInsurance.provider} offers
                      comprehensive coverage for {selectedInsurance.premium} annually. It's particularly strong in
                      emergency situations and provides good value for money.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-xl">
                      <h5 className="text-sm font-medium text-green-800 mb-2">✅ What's Covered</h5>
                      <ul className="space-y-1">
                        {selectedInsurance.coverage.map((item: string, idx: number) => (
                          <li key={idx} className="text-xs text-green-700">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 p-3 rounded-xl">
                      <h5 className="text-sm font-medium text-red-800 mb-2">❌ Not Covered</h5>
                      <ul className="space-y-1">
                        {selectedInsurance.doesNotCover.map((item: string, idx: number) => (
                          <li key={idx} className="text-xs text-red-700">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-xl">
                    <h5 className="text-sm font-medium text-blue-800 mb-1">💡 AI Recommendation</h5>
                    <p className="text-xs text-blue-700">
                      This policy is well-suited for frequent travelers and provides excellent emergency coverage.
                      Consider upgrading if you engage in adventure activities.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setShowInsuranceSummary(false)}
                  className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                >
                  Got it
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  if (selectedCategory === "import") {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center gap-3 p-4 pt-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCategory(null)}
            className="text-foreground bg-card border border-border rounded-xl hover:bg-muted shadow-md"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground text-center">Import Insurance</h1>
          </div>
        </div>

        <div className="px-4 pb-20">
          <Card className="placard-3d p-6 bg-card border border-border rounded-2xl shadow-md mb-6">
            <h3 className="font-semibold text-foreground mb-4">Check Insurance Validity in India</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Paste your international insurance policy details below to check if it's valid in India.
            </p>

            <textarea
              value={importInsuranceText}
              onChange={(e) => setImportInsuranceText(e.target.value)}
              placeholder="Paste your insurance policy details here..."
              className="w-full h-32 p-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground resize-none"
            />

            <Button
              onClick={handleImportInsurance}
              disabled={!importInsuranceText.trim()}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 rounded-xl"
            >
              <Bot className="h-4 w-4 mr-2" />
              Analyze with AI
            </Button>
          </Card>

          {importInsuranceResult && (
            <Card
              className={`placard-3d p-6 border rounded-2xl shadow-md ${
                importInsuranceResult.isValid ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {importInsuranceResult.isValid ? (
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                )}
                <div>
                  <h3 className={`font-semibold ${importInsuranceResult.isValid ? "text-green-800" : "text-red-800"}`}>
                    {importInsuranceResult.isValid ? "Valid in India ✅" : "Not Valid in India ❌"}
                  </h3>
                  <p className="text-sm text-muted-foreground">{importInsuranceResult.provider}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Coverage Analysis</h4>
                  <ul className="space-y-1">
                    {importInsuranceResult.coverage.map((item: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-4 rounded-xl ${importInsuranceResult.isValid ? "bg-green-100" : "bg-red-100"}`}>
                  <h4
                    className={`font-medium mb-2 ${importInsuranceResult.isValid ? "text-green-800" : "text-red-800"}`}
                  >
                    AI Recommendation
                  </h4>
                  <p className={`text-sm ${importInsuranceResult.isValid ? "text-green-700" : "text-red-700"}`}>
                    {importInsuranceResult.recommendation}
                  </p>
                </div>

                {!importInsuranceResult.isValid && (
                  <Button
                    onClick={() => setSelectedCategory("insurance")}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                  >
                    Browse Indian Insurance Options
                  </Button>
                )}
              </div>
            </Card>
          )}

          <Card className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-border rounded-2xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-foreground">Important Note</h3>
                <p className="text-sm text-muted-foreground">
                  International insurance policies may have limited coverage in India. Always verify with your provider
                  before traveling.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-4 p-4 pt-6 bg-background border-b border-border shadow-sm">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground text-center">Documents</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted rounded-xl">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="px-4 pb-20">
        <div className="grid grid-cols-1 gap-4 mb-8">
          {documentCategories.map((category, index) => (
            <Card
              key={category.label}
              onClick={() => setSelectedCategory(category.id)}
              className={`placard-3d p-6 h-24 flex items-center justify-center cursor-pointer
                rounded-2xl text-white bg-gradient-to-r ${category.bgColor}
                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0`}
            >
              <category.icon className="h-8 w-8 mr-4 text-white" />
              <span className="text-lg font-semibold text-center text-white">{category.label}</span>
            </Card>
          ))}
        </div>

        {/* Insurance Recommendations */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Insurance Access</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {insuranceOptions.map((insurance, index) => (
              <Card
                key={index}
                onClick={() => handleInsuranceAnalysis(insurance)}
                className="placard-3d flex-shrink-0 w-48 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-card border border-border"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{insurance.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{insurance.name}</h3>
                  <p className="text-sm text-muted-foreground">{insurance.provider}</p>
                  <Button size="sm" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                    <Bot className="h-3 w-3 mr-1" />
                    AI Summary
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Secure Storage Info */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-muted/50 to-accent/10 rounded-2xl border border-border shadow-sm">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Blockchain Secured</h3>
            <p className="text-sm text-muted-foreground">
              Your documents are encrypted and stored securely using blockchain technology
            </p>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 shadow-lg">
        <div className="flex justify-around items-center">
          {[
            { icon: Home, label: "Home", href: "/" },
            { icon: MapPin, label: "Tourist Spots", href: "/tourist-spots" },
            { icon: CreditCard, label: "Pay", href: "/pay" },
            { icon: FileText, label: "Documents", active: true, href: "/documents" },
            { icon: AlertTriangle, label: "SOS", href: "/sos" },
          ].map((item, index) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => item.href && router.push(item.href)}
              className={`flex flex-col items-center gap-1 p-2 h-auto rounded-xl transition-all duration-300 ${
                item.active
                  ? "text-primary-foreground bg-gradient-to-r from-primary to-primary/80 shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>

        <div className="text-center mt-2 pb-2">
          <p className="text-xs text-muted-foreground">Made in Bangalore, India</p>
        </div>
      </div>
    </div>
  )
}
