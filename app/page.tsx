"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Heart, MapPin, Calendar, Cpu, HardDrive, Monitor, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { laptops } from "@/data/laptops"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [ramRange, setRamRange] = useState([0, 32])
  const [storageRange, setStorageRange] = useState([0, 2000])
  const [screenSizeRange, setScreenSizeRange] = useState([10, 20])
  const [sortBy, setSortBy] = useState("newest")
  const [favorites, setFavorites] = useState<number[]>([])

  const { addToCart } = useCart()

  // Get unique values for filters
  const brands = [...new Set(laptops.map((laptop) => laptop.brand))]
  const colors = [...new Set(laptops.map((laptop) => laptop.color))]
  const conditions = [...new Set(laptops.map((laptop) => laptop.condition))]

  // Show only first 6 laptops on homepage
  const featuredLaptops = useMemo(() => {
    const filtered = laptops.filter((laptop) => {
      const matchesSearch =
        laptop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = laptop.price >= priceRange[0] && laptop.price <= priceRange[1]
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(laptop.brand)
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(laptop.color)
      const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(laptop.condition)
      const matchesRam = laptop.ram >= ramRange[0] && laptop.ram <= ramRange[1]
      const matchesStorage = laptop.storage >= storageRange[0] && laptop.storage <= storageRange[1]
      const matchesScreenSize = laptop.screenSize >= screenSizeRange[0] && laptop.screenSize <= screenSizeRange[1]

      return (
        matchesSearch &&
        matchesPrice &&
        matchesBrand &&
        matchesColor &&
        matchesCondition &&
        matchesRam &&
        matchesStorage &&
        matchesScreenSize
      )
    })

    // Sort laptops
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime())
        break
    }

    return filtered.slice(0, 6)
  }, [
    searchQuery,
    priceRange,
    selectedBrands,
    selectedColors,
    selectedConditions,
    ramRange,
    storageRange,
    screenSizeRange,
    sortBy,
  ])

  const toggleFavorite = (laptopId: number) => {
    setFavorites((prev) => (prev.includes(laptopId) ? prev.filter((id) => id !== laptopId) : [...prev, laptopId]))
  }

  const handleAddToCart = (laptop: (typeof laptops)[0]) => {
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

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) => (checked ? [...prev, brand] : prev.filter((b) => b !== brand)))
  }

  const handleColorChange = (color: string, checked: boolean) => {
    setSelectedColors((prev) => (checked ? [...prev, color] : prev.filter((c) => c !== color)))
  }

  const handleConditionChange = (condition: string, checked: boolean) => {
    setSelectedConditions((prev) => (checked ? [...prev, condition] : prev.filter((c) => c !== condition)))
  }

  const clearAllFilters = () => {
    setPriceRange([0, 2000])
    setSelectedBrands([])
    setSelectedColors([])
    setSelectedConditions([])
    setRamRange([0, 32])
    setStorageRange([0, 2000])
    setScreenSizeRange([10, 20])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Eng yaxshi noutbuklarni toping</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Minglab noutbuk orasidan o'zingizga mos kelganini tanlang
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Barcha mahsulotlarni ko'rish
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Noutbuk qidirish... (masalan: Acer, HP, Lenovo)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Saralash" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Eng yangi</SelectItem>
                  <SelectItem value="oldest">Eng eski</SelectItem>
                  <SelectItem value="price-low">Arzon narx</SelectItem>
                  <SelectItem value="price-high">Qimmat narx</SelectItem>
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtr
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtrlar</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    {/* Price Range */}
                    <div>
                      <Label className="text-base font-medium">Narx ($)</Label>
                      <div className="mt-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={2000}
                          min={0}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Condition */}
                    <div>
                      <Label className="text-base font-medium">Holati</Label>
                      <div className="mt-2 space-y-2">
                        {conditions.map((condition) => (
                          <div key={condition} className="flex items-center space-x-2">
                            <Checkbox
                              id={`condition-${condition}`}
                              checked={selectedConditions.includes(condition)}
                              onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                            />
                            <Label htmlFor={`condition-${condition}`}>
                              {condition === "New" ? "Yangi" : "Ishlatilgan"}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Brand */}
                    <div>
                      <Label className="text-base font-medium">Brend</Label>
                      <div className="mt-2 space-y-2">
                        {brands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                            />
                            <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Color */}
                    <div>
                      <Label className="text-base font-medium">Rang</Label>
                      <div className="mt-2 space-y-2">
                        {colors.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox
                              id={`color-${color}`}
                              checked={selectedColors.includes(color)}
                              onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                            />
                            <Label htmlFor={`color-${color}`}>{color}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* RAM */}
                    <div>
                      <Label className="text-base font-medium">Operativ xotira (GB)</Label>
                      <div className="mt-2">
                        <Slider
                          value={ramRange}
                          onValueChange={setRamRange}
                          max={32}
                          min={0}
                          step={4}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>{ramRange[0]} GB</span>
                          <span>{ramRange[1]} GB</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Storage */}
                    <div>
                      <Label className="text-base font-medium">Xotira hajmi (GB)</Label>
                      <div className="mt-2">
                        <Slider
                          value={storageRange}
                          onValueChange={setStorageRange}
                          max={2000}
                          min={0}
                          step={128}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>{storageRange[0]} GB</span>
                          <span>{storageRange[1]} GB</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Screen Size */}
                    <div>
                      <Label className="text-base font-medium">Ekran diagonali (dyuym)</Label>
                      <div className="mt-2">
                        <Slider
                          value={screenSizeRange}
                          onValueChange={setScreenSizeRange}
                          max={20}
                          min={10}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>{screenSizeRange[0]}"</span>
                          <span>{screenSizeRange[1]}"</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <Button onClick={clearAllFilters} variant="outline" className="w-full bg-transparent">
                      Barcha filtrlarni tozalash
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tavsiya etilgan noutbuklar</h2>
          <Link href="/products">
            <Button variant="outline">
              Barchasini ko'rish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Laptop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLaptops.map((laptop) => (
            <Card key={laptop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={laptop.images[0] || "/placeholder.svg"}
                  alt={laptop.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(laptop.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(laptop.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </Button>
                <Badge
                  className={`absolute top-2 left-2 ${
                    laptop.condition === "New" ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {laptop.condition === "New" ? "Yangi" : "Ishlatilgan"}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{laptop.title}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-3">${laptop.price}</div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    <span className="truncate">{laptop.processor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    <span>
                      {laptop.ram}GB RAM • {laptop.storage}GB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <span>
                      {laptop.screenSize}" • {laptop.color}
                    </span>
                  </div>
                  {laptop.warranty > 0 && (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>{laptop.warranty} oy kafolat</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{laptop.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(laptop.postedDate).toLocaleDateString("uz-UZ")}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/laptop/${laptop.id}`} className="flex-1">
                    <Button className="w-full bg-transparent" variant="outline">
                      Batafsil
                    </Button>
                  </Link>
                  <Button onClick={() => handleAddToCart(laptop)} className="flex-1">
                    Savatga
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {featuredLaptops.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">Hech narsa topilmadi</div>
            <p className="text-gray-400">Qidiruv so'zini o'zgartiring yoki filtrlarni qayta sozlang</p>
          </div>
        )}
      </main>
    </div>
  )
}
