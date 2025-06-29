export interface Laptop {
  id: number
  title: string
  brand: string
  price: number
  condition: "New" | "Old"
  color: string
  processor: string
  ram: number
  storage: number
  screenSize: number
  warranty: number
  location: string
  postedDate: string
  images: string[]
  description: string
  features: string[]
  specifications: {
    model: string
    os: string
    graphics: string
    display: string
    weight: string
    dimensions: string
    battery: string
    webcam: string
    audio: string
  }
  seller: {
    name: string
    rating: number
    reviews: number
    phone: string
    verified: boolean
    memberSince: string
  }
}

export const laptops: Laptop[] = [
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
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Zamonaviy dizayn va yuqori unumdorlik bilan jihozlangan Acer Aspire 5 noutbuki. Ish va o'yin uchun ideal tanlov. Tezkor Intel Core i5 protsessori va 8GB operativ xotira bilan barcha vazifalarni oson bajaradi.",
    features: [
      "Intel Core i5-12450H protsessori (2.0 GHz, 4.4 GHz gacha)",
      "8GB DDR4 operativ xotira (32GB gacha kengaytirish mumkin)",
      "512GB PCIe NVMe SSD xotira",
      "15.6 dyuymli Full HD (1920x1080) IPS ekran",
      "Intel Iris Xe grafik karta",
      "Wi-Fi 6 va Bluetooth 5.1 ulanish",
      "USB-C, USB 3.2, HDMI 2.1 portlari",
      "Backlit klaviatura",
      "Fingerprint skaner",
      "4-hujayra litiy-ion batareya (50Wh)",
    ],
    specifications: {
      model: "A515-57-53MN",
      os: "Windows 11 Home",
      graphics: "Intel Iris Xe Graphics",
      display: '15.6" Full HD (1920 x 1080) IPS',
      weight: "1.7 kg",
      dimensions: "36.3 x 23.8 x 1.79 sm",
      battery: "50Wh Li-ion, 7 soat gacha",
      webcam: "HD (720p) kamera",
      audio: "Stereo dinamiklar, DTS Audio",
    },
    seller: {
      name: "TechStore Toshkent",
      rating: 4.8,
      reviews: 156,
      phone: "+998 90 123 45 67",
      verified: true,
      memberSince: "2020",
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
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Gaming uchun maxsus ishlab chiqilgan HP Pavilion noutbuki. Yuqori grafik imkoniyatlari va tezkor protsessori bilan eng qiyin o'yinlarni ham oson ishga tushiradi.",
    features: [
      "AMD Ryzen 5 5600H protsessori (3.3 GHz, 4.2 GHz gacha)",
      "16GB DDR4 operativ xotira",
      "1TB PCIe NVMe SSD xotira",
      "15.6 dyuymli Full HD 144Hz gaming ekran",
      "NVIDIA GeForce GTX 1650 4GB grafik karta",
      "RGB backlit klaviatura",
      "Bang & Olufsen audio tizimi",
      "Dual fan sovutish tizimi",
      "Wi-Fi 6 va Bluetooth 5.2",
      "USB-C, USB 3.1, HDMI 2.1 portlari",
    ],
    specifications: {
      model: "15-dk2070wm",
      os: "Windows 11 Home",
      graphics: "NVIDIA GeForce GTX 1650 4GB",
      display: '15.6" Full HD (1920 x 1080) 144Hz IPS',
      weight: "2.3 kg",
      dimensions: "36.0 x 26.0 x 2.3 sm",
      battery: "52.5Wh Li-ion, 5 soat gacha",
      webcam: "HD (720p) kamera",
      audio: "Bang & Olufsen stereo dinamiklar",
    },
    seller: {
      name: "GameZone Samarqand",
      rating: 4.9,
      reviews: 89,
      phone: "+998 91 234 56 78",
      verified: true,
      memberSince: "2019",
    },
  },
  {
    id: 3,
    title: "Lenovo ThinkPad E14",
    brand: "Lenovo",
    price: 650,
    condition: "Old",
    color: "Black",
    processor: "Intel Core i3-1115G4",
    ram: 8,
    storage: 256,
    screenSize: 14,
    warranty: 6,
    location: "Buxoro",
    postedDate: "2024-01-13",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Ishbilarmonlar uchun ideal Lenovo ThinkPad. Ishonchli va bardoshli dizayn bilan uzoq muddat xizmat qiladi.",
    features: [
      "Intel Core i3-1115G4 protsessori",
      "8GB DDR4 operativ xotira",
      "256GB SSD xotira",
      "14 dyuymli Full HD ekran",
      "Intel UHD Graphics",
      "ThinkPad klaviaturasi",
      "Fingerprint skaner",
      "Wi-Fi 6 va Bluetooth 5.1",
    ],
    specifications: {
      model: "20T6000RUS",
      os: "Windows 11 Pro",
      graphics: "Intel UHD Graphics",
      display: '14" Full HD (1920 x 1080) IPS',
      weight: "1.59 kg",
      dimensions: "32.4 x 23.6 x 1.79 sm",
      battery: "45Wh Li-ion, 8 soat gacha",
      webcam: "HD (720p) kamera",
      audio: "Dolby Audio stereo dinamiklar",
    },
    seller: {
      name: "Business Laptops Buxoro",
      rating: 4.6,
      reviews: 67,
      phone: "+998 93 345 67 89",
      verified: true,
      memberSince: "2021",
    },
  },
  {
    id: 4,
    title: "ASUS VivoBook 15",
    brand: "ASUS",
    price: 750,
    condition: "New",
    color: "Blue",
    processor: "Intel Core i5-1135G7",
    ram: 8,
    storage: 512,
    screenSize: 15.6,
    warranty: 12,
    location: "Namangan",
    postedDate: "2024-01-12",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Zamonaviy dizayn va yaxshi narx-sifat nisbati bilan ASUS VivoBook 15. Har kungi ishlar uchun mukammal.",
    features: [
      "Intel Core i5-1135G7 protsessori",
      "8GB DDR4 operativ xotira",
      "512GB PCIe SSD xotira",
      "15.6 dyuymli Full HD ekran",
      "Intel Iris Xe Graphics",
      "Backlit klaviatura",
      "NumberPad 2.0",
      "Wi-Fi 6 va Bluetooth 5.0",
    ],
    specifications: {
      model: "X515EA-EJ3456W",
      os: "Windows 11 Home",
      graphics: "Intel Iris Xe Graphics",
      display: '15.6" Full HD (1920 x 1080) IPS',
      weight: "1.8 kg",
      dimensions: "35.4 x 23.0 x 1.99 sm",
      battery: "42Wh Li-ion, 6 soat gacha",
      webcam: "HD (720p) kamera",
      audio: "SonicMaster stereo dinamiklar",
    },
    seller: {
      name: "ASUS Store Namangan",
      rating: 4.7,
      reviews: 123,
      phone: "+998 94 456 78 90",
      verified: true,
      memberSince: "2020",
    },
  },
  {
    id: 5,
    title: "MacBook Air M2",
    brand: "Apple",
    price: 1500,
    condition: "New",
    color: "Space Gray",
    processor: "Apple M2",
    ram: 8,
    storage: 256,
    screenSize: 13.6,
    warranty: 12,
    location: "Toshkent",
    postedDate: "2024-01-11",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description: "Eng yangi Apple MacBook Air M2 chipi bilan. Noyob unumdorlik va uzoq batareya muddati.",
    features: [
      "Apple M2 8-yadroli protsessor",
      "8GB birlashtirulgan xotira",
      "256GB SSD xotira",
      "13.6 dyuymli Liquid Retina ekran",
      "10-yadroli GPU",
      "Magic Keyboard",
      "Touch ID",
      "2x Thunderbolt portlari",
    ],
    specifications: {
      model: "MLY33",
      os: "macOS Ventura",
      graphics: "Apple M2 10-core GPU",
      display: '13.6" Liquid Retina (2560 x 1664)',
      weight: "1.24 kg",
      dimensions: "30.41 x 21.5 x 1.13 sm",
      battery: "52.6Wh Li-polymer, 18 soat gacha",
      webcam: "1080p FaceTime HD kamera",
      audio: "4-dinamikli audio tizimi",
    },
    seller: {
      name: "Apple Premium Reseller",
      rating: 4.9,
      reviews: 234,
      phone: "+998 95 567 89 01",
      verified: true,
      memberSince: "2018",
    },
  },
  {
    id: 6,
    title: "MSI Gaming Laptop GF63",
    brand: "MSI",
    price: 1800,
    condition: "New",
    color: "Black",
    processor: "Intel Core i7-12700H",
    ram: 32,
    storage: 1000,
    screenSize: 15.6,
    warranty: 24,
    location: "Samarqand",
    postedDate: "2024-01-10",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Professional gaming uchun MSI noutbuki. Yuqori grafik va tezkor protsessor bilan eng qiyin o'yinlarni oson ishga tushiradi.",
    features: [
      "Intel Core i7-12700H protsessori",
      "32GB DDR4 operativ xotira",
      "1TB NVMe SSD xotira",
      "15.6 dyuymli Full HD 144Hz ekran",
      "NVIDIA GeForce RTX 3060 6GB",
      "RGB backlit klaviatura",
      "Cooler Boost 5 sovutish",
      "Wi-Fi 6E va Bluetooth 5.3",
    ],
    specifications: {
      model: "GF63 Thin 11UC",
      os: "Windows 11 Home",
      graphics: "NVIDIA GeForce RTX 3060 6GB",
      display: '15.6" Full HD (1920 x 1080) 144Hz',
      weight: "1.86 kg",
      dimensions: "35.9 x 25.4 x 2.15 sm",
      battery: "51Wh Li-polymer, 4 soat gacha",
      webcam: "HD (720p) kamera",
      audio: "Nahimic 3 audio tizimi",
    },
    seller: {
      name: "MSI Gaming Center",
      rating: 4.8,
      reviews: 178,
      phone: "+998 96 678 90 12",
      verified: true,
      memberSince: "2019",
    },
  },
]
