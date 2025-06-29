"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Heart, MapPin, Calendar, Cpu, HardDrive, Monitor, Shield, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

// Sample laptop data (in real app, this would come from API/database)
const laptops = [
  {
    id: 1,
    title: "Acer Aspire 5 A515-57",
    brand: "Acer",
    price: 850,
    condition: "New",
    color: "Silver",
    processor: "Intel Core i5-12450H",
    ram: 8,
    storage: 512,
    screenSize: 15.6,
    warranty: 12,
    location: "Toshkent",
    postedDate: "2024-01-15",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Zamonaviy dizayn va yuqori unumdorlik bilan jihozlangan Acer Aspire 5 noutbuki. Ish va o'yin uchun ideal tanlov. Tezkor Intel Core i5 protsessori va 8GB operativ xotira bilan barcha vazifalarni oson bajaradi.",
    features: [
      "Intel Core i5-12450H protsessori",
      "8GB DDR4 operativ xotira",
      "512GB SSD xotira",
      "15.6 dyuymli Full HD ekran",
      "Intel Iris Xe grafik karta",
      "Wi-Fi 6 va Bluetooth 5.1",
      "USB-C, USB 3.2, HDMI portlari",
      "Backlit klaviatura",
    ],
    seller: {
      name: "TechStore Toshkent",
      rating: 4.8,
      reviews: 156,
      phone: "+998 90 123 45 67",
    },
  },
  {
    id: 2,
    title: "HP Pavilion Gaming 15",
    brand: "HP",
    price: 1200,
    condition: "New",
    color: "Black",
    processor: "AMD Ryzen 5 5600H",
    ram: 16,
    storage: 1000,
    screenSize: 15.6,
    warranty: 24,
    location: "Samarqand",
    postedDate: "2024-01-14",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Gaming uchun maxsus ishlab chiqilgan HP Pavilion noutbuki. Yuqori grafik imkoniyatlari va tezkor protsessori bilan eng qiyin o'yinlarni ham oson ishga tushiradi.",
    features: [
      "AMD Ryzen 5 5600H protsessori",
      "16GB DDR4 operativ xotira",
      "1TB SSD xotira",
      "15.6 dyuymli Full HD 144Hz ekran",
      "NVIDIA GTX 1650 grafik karta",
      "RGB backlit klaviatura",
      "Bang & Olufsen audio",
      "Sovutish tizimi",
    ],
    seller: {
      name: "GameZone Samarqand",
      rating: 4.9,
      reviews: 89,
      phone: "+998 91 234 56 78",
    },
  },
]

export default function LaptopDetails() {
  const router = useRouter()
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const laptopId = Number.parseInt(params.id as string)
  const laptop = laptops.find((l) => l.id === laptopId)

  if (!laptop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Noutbuk topilmadi</h1>
          <Button onClick={() => router.push("/")}>Bosh sahifaga qaytish</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    router.push(`/cart?laptop=${laptop.id}`)
  }

  const images = [laptop.image, laptop.image, laptop.image] // In real app, multiple images

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
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Bosh sahifa
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Kategoriyalar
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                E'lon berish
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
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
              {images.map((image, index) => (
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

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Texnik xususiyatlari</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Protsessor:</span>
                    </div>
                    <span className="font-medium">{laptop.processor}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Operativ xotira:</span>
                    </div>
                    <span className="font-medium">{laptop.ram}GB</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Xotira hajmi:</span>
                    </div>
                    <span className="font-medium">{laptop.storage}GB</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Ekran:</span>
                    </div>
                    <span className="font-medium">
                      {laptop.screenSize}" {laptop.color}
                    </span>
                  </div>
                  <Separator />
                  {laptop.warranty > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Kafolat:</span>
                        </div>
                        <span className="font-medium">{laptop.warranty} oy</span>
                      </div>
                      <Separator />
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Joylashuv:</span>
                    </div>
                    <span className="font-medium">{laptop.location}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">E'lon sanasi:</span>
                    </div>
                    <span className="font-medium">{new Date(laptop.postedDate).toLocaleDateString("uz-UZ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sotuvchi ma'lumotlari</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nomi:</span>
                    <span className="font-medium">{laptop.seller.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Reyting:</span>
                    <span className="font-medium">
                      ⭐ {laptop.seller.rating} ({laptop.seller.reviews} sharh)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Telefon:</span>
                    <span className="font-medium">{laptop.seller.phone}</span>
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
      </main>
    </div>
  )
}
