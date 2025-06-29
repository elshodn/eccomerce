"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  MapPin,
  Calendar,
  Cpu,
  HardDrive,
  Monitor,
  Shield,
  ShoppingCart,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Header } from "@/components/header"
import { laptops } from "@/data/laptops"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

export default function LaptopDetails() {
  const router = useRouter()
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  const laptopId = Number.parseInt(params.id as string)
  const laptop = laptops.find((l) => l.id === laptopId)

  if (!laptop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Noutbuk topilmadi</h1>
            <Button onClick={() => router.push("/")}>Bosh sahifaga qaytish</Button>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: laptop.id,
      title: laptop.title,
      price: laptop.price,
      image: laptop.images[0],
    })
    toast({
      title: "Savatga qo'shildi!",
      description: `${laptop.title} savatga qo'shildi`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2 p-0">
            <ArrowLeft className="h-4 w-4" />
            Orqaga
          </Button>
          <span>/</span>
          <span>Mahsulotlar</span>
          <span>/</span>
          <span className="text-gray-900">{laptop.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={laptop.images[selectedImage] || "/placeholder.svg"}
                alt={laptop.title}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 h-10 w-10 p-0 bg-white/80 hover:bg-white"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
              <Badge
                className={`absolute top-4 left-4 ${
                  laptop.condition === "New" ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {laptop.condition === "New" ? "Yangi" : "Ishlatilgan"}
              </Badge>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {laptop.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${laptop.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{laptop.title}</h1>
              <div className="text-4xl font-bold text-blue-600 mb-4">${laptop.price}</div>
            </div>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Asosiy ma'lumotlar</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Protsessor:</span>
                  </div>
                  <span className="font-medium">{laptop.processor}</span>

                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">RAM:</span>
                  </div>
                  <span className="font-medium">{laptop.ram}GB</span>

                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Xotira:</span>
                  </div>
                  <span className="font-medium">{laptop.storage}GB</span>

                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Ekran:</span>
                  </div>
                  <span className="font-medium">
                    {laptop.screenSize}" {laptop.color}
                  </span>

                  {laptop.warranty > 0 && (
                    <>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Kafolat:</span>
                      </div>
                      <span className="font-medium">{laptop.warranty} oy</span>
                    </>
                  )}

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Joylashuv:</span>
                  </div>
                  <span className="font-medium">{laptop.location}</span>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">E'lon sanasi:</span>
                  </div>
                  <span className="font-medium">{new Date(laptop.postedDate).toLocaleDateString("uz-UZ")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sotuvchi ma'lumotlari</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nomi:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{laptop.seller.name}</span>
                      {laptop.seller.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Tasdiqlangan
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Reyting:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{laptop.seller.rating}</span>
                      <span className="text-gray-500">({laptop.seller.reviews} sharh)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">A'zo bo'lgan:</span>
                    <span className="font-medium">{laptop.seller.memberSince} yildan</span>
                  </div>
                  <Separator />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Qo'ng'iroq qilish
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Xabar yuborish
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart Button */}
            <Button onClick={handleAddToCart} className="w-full h-12 text-lg bg-black hover:bg-gray-800">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Savatga qo'shish
            </Button>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tavsif</h3>
              <p className="text-gray-600 leading-relaxed">{laptop.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Asosiy xususiyatlari</h3>
              <ul className="space-y-2">
                {laptop.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Texnik xususiyatlari</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(laptop.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
