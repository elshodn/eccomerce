"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Minus, Plus, Truck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

// Sample laptop data
const laptops = [
  {
    id: 1,
    title: "Acer Aspire 5 A515-57",
    price: 850,
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    title: "HP Pavilion Gaming 15",
    price: 1200,
    image: "/placeholder.svg?height=100&width=150",
  },
]

const regions = [
  "Toshkent",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Farg'ona",
  "Jizzax",
  "Sirdaryo",
  "Navoiy",
  "Xorazm",
  "Qoraqalpog'iston",
]

export default function CartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const laptopId = Number.parseInt(searchParams.get("laptop") || "1")

  const [quantity, setQuantity] = useState(1)
  const [deliveryType, setDeliveryType] = useState("standard")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    region: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const laptop = laptops.find((l) => l.id === laptopId) || laptops[0]
  const deliveryCost = deliveryType === "express" ? 30 : 20
  const subtotal = laptop.price * quantity
  const total = subtotal + deliveryCost

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitOrder = async () => {
    // Validate form
    if (!formData.fullName || !formData.phone || !formData.region || !formData.address) {
      toast({
        title: "Xatolik",
        description: "Iltimos, barcha maydonlarni to'ldiring",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Buyurtma qabul qilindi!",
        description: "Tez orada siz bilan bog'lanamiz",
        className: "bg-green-50 border-green-200",
      })

      // Redirect to success page or home
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Orqaga
              </Button>
              <h1 className="text-2xl font-bold text-blue-600">LaptopBazar</h1>
            </div>
            <div className="text-lg font-semibold text-gray-700">Buyurtma berish</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Card */}
            <Card>
              <CardHeader>
                <CardTitle>Savat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Image
                    src={laptop.image || "/placeholder.svg"}
                    alt={laptop.title}
                    width={150}
                    height={100}
                    className="w-24 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{laptop.title}</h3>
                    <div className="text-2xl font-bold text-blue-600">${laptop.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address Form */}
            <Card>
              <CardHeader>
                <CardTitle>Yetkazib berish manzili</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">F.I.Sh *</Label>
                    <Input
                      id="fullName"
                      placeholder="To'liq ismingizni kiriting"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon raqami *</Label>
                    <Input
                      id="phone"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="region">Viloyat/Tuman *</Label>
                  <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Viloyatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address">Ko'cha/uy raqami *</Label>
                  <Input
                    id="address"
                    placeholder="To'liq manzilni kiriting"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Type */}
            <Card>
              <CardHeader>
                <CardTitle>Yetkazib berish turi</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Standart yetkazib berish</div>
                            <div className="text-sm text-gray-500">3-5 kun ichida</div>
                          </div>
                        </div>
                        <div className="font-medium">$20</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">Tezkor yetkazib berish</div>
                            <div className="text-sm text-gray-500">1 kun ichida</div>
                          </div>
                        </div>
                        <div className="font-medium">$30</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Buyurtma xulosasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Mahsulot ({quantity} dona):</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span>${deliveryCost}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Jami:</span>
                  <span className="text-blue-600">${total}</span>
                </div>
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Yuborilmoqda..." : "Buyurtma berish"}
                </Button>
                <div className="text-xs text-gray-500 text-center">
                  Buyurtma berishda siz bizning{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    shartlarimiz
                  </a>{" "}
                  bilan rozisiz
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
