"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, Truck, Clock, CheckCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import { Header } from "@/components/header"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

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
  const { user } = useAuth()
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()

  const [deliveryType, setDeliveryType] = useState("standard")
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    region: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const deliveryCost = deliveryType === "express" ? 30 : 20
  const subtotal = getTotalPrice()
  const total = subtotal + deliveryCost

  const handleQuantityChange = (id: number, change: number) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity >= 1 && newQuantity <= 10) {
        updateQuantity(id, newQuantity)
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitOrder = async () => {
    if (!user) {
      toast({
        title: "Kirish talab qilinadi",
        description: "Buyurtma berish uchun tizimga kiring",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

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
      setOrderSubmitted(true)
      clearCart()
      toast({
        title: "Buyurtma qabul qilindi!",
        description: "Tez orada siz bilan bog'lanamiz",
        className: "bg-green-50 border-green-200",
      })
    }, 1500)
  }

  if (items.length === 0 && !orderSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Savat bo'sh</h2>
              <p className="text-gray-600 mb-6">Hozircha savatda hech qanday mahsulot yo'q</p>
              <Link href="/products">
                <Button className="w-full">Mahsulotlarni ko'rish</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Buyurtma qabul qilindi!</h2>
              <p className="text-gray-600 mb-6">
                Buyurtma raqami: #{Math.floor(Math.random() * 100000)}
                <br />
                Tez orada siz bilan bog'lanamiz
              </p>
              <div className="space-y-2">
                <Button onClick={() => router.push("/")} className="w-full">
                  Bosh sahifaga qaytish
                </Button>
                <Button variant="outline" onClick={() => setOrderSubmitted(false)} className="w-full">
                  Yana buyurtma berish
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2 p-0">
            <ArrowLeft className="h-4 w-4" />
            Orqaga
          </Button>
          <span>/</span>
          <span className="text-gray-900">Savat</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Buyurtma berish</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Savat ({items.length} mahsulot)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={60}
                      className="w-20 h-15 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <div className="text-xl font-bold text-blue-600">${item.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= 10}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
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
                  <span>Mahsulotlar:</span>
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
