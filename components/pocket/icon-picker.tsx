'use client'

import {
  Wallet, Banknote, PiggyBank, Coins, TrendingUp, TrendingDown, Landmark, Receipt,
  Utensils, Coffee, Cookie, Apple, Wine, Beer, Cake, Croissant, Pizza, IceCream, Milk,
  Car, Train, Bike, Plane, Bus, Navigation, Ship, Truck, Scooter, Rocket,
  ShoppingCart, ShoppingBag, ShoppingBasket, Gift, Tag, Package, Store, Barcode, QrCode,
  Gamepad2, Music, Film, Tv, Ticket, Headphones, Clapperboard, Radio, Mic, Guitar, Palette, Sparkles, Piano,
  Home, Wifi, Zap, Droplets, Lightbulb, Fan, Plug, Key, Trash2, Bath, Sofa, Brush,
  Heart, Pill, Dumbbell, Activity, Stethoscope, Thermometer, Eye, Ear, Baby, Ambulance, Bone,
  Book, BookOpen, BookMarked, GraduationCap, School, Pen, Pencil, Scroll, Quote, Sword,
  Phone, MessageCircle, MessageSquare, Mail, Send, Inbox, AtSign, Bell, PhoneCall, Contact,
  Tent, Compass, Map, MapPin, Mountain, Sun, Moon, Globe, Luggage, Backpack, Umbrella,
  Trophy, Medal, Target, Swords, Flame, Footprints, Star,
  Monitor, Laptop, Smartphone, Tablet, Printer, Keyboard, Mouse, HardDrive, Cpu, Camera, Watch,
  Shirt, Glasses,
  Calendar, Clock, PartyPopper, Crown, Ribbon,
  CreditCard, DollarSign, Percent, BarChart3, Calculator,
  ChefHat, Microwave, Refrigerator, CookingPot, CupSoda, Martini,
  Trees, Flower2, Cloud, Leaf, CloudSun, CloudRain, TreePine, Sprout, Cat,
  type LucideIcon,
} from 'lucide-react'

interface IconOption {
  name: string
  component: LucideIcon
}

interface IconCategory {
  label: string
  icons: IconOption[]
}

const categories: IconCategory[] = [
  {
    label: 'Keuangan',
    icons: [
      { name: 'Wallet', component: Wallet },
      { name: 'Banknote', component: Banknote },
      { name: 'PiggyBank', component: PiggyBank },
      { name: 'Coins', component: Coins },
      { name: 'Landmark', component: Landmark },
      { name: 'Receipt', component: Receipt },
      { name: 'TrendingUp', component: TrendingUp },
      { name: 'TrendingDown', component: TrendingDown },
    ],
  },
  {
    label: 'Makanan & Minuman',
    icons: [
      { name: 'Utensils', component: Utensils },
      { name: 'Coffee', component: Coffee },
      { name: 'Cookie', component: Cookie },
      { name: 'Apple', component: Apple },
      { name: 'Croissant', component: Croissant },
      { name: 'Pizza', component: Pizza },
      { name: 'Cake', component: Cake },
      { name: 'IceCream', component: IceCream },
      { name: 'Wine', component: Wine },
      { name: 'Beer', component: Beer },
      { name: 'Milk', component: Milk },
      { name: 'CupSoda', component: CupSoda },
    ],
  },
  {
    label: 'Transportasi',
    icons: [
      { name: 'Car', component: Car },
      { name: 'Train', component: Train },
      { name: 'Bike', component: Bike },
      { name: 'Plane', component: Plane },
      { name: 'Bus', component: Bus },
      { name: 'Ship', component: Ship },
      { name: 'Truck', component: Truck },
      { name: 'Scooter', component: Scooter },
      { name: 'Navigation', component: Navigation },
      { name: 'Rocket', component: Rocket },
    ],
  },
  {
    label: 'Belanja',
    icons: [
      { name: 'ShoppingCart', component: ShoppingCart },
      { name: 'ShoppingBag', component: ShoppingBag },
      { name: 'ShoppingBasket', component: ShoppingBasket },
      { name: 'Store', component: Store },
      { name: 'Tag', component: Tag },
      { name: 'Package', component: Package },
      { name: 'Gift', component: Gift },
      { name: 'Barcode', component: Barcode },
    ],
  },
  {
    label: 'Hiburan',
    icons: [
      { name: 'Gamepad2', component: Gamepad2 },
      { name: 'Piano', component: Piano },
      { name: 'Guitar', component: Guitar },
      { name: 'Music', component: Music },
      { name: 'Mic', component: Mic },
      { name: 'Radio', component: Radio },
      { name: 'Headphones', component: Headphones },
      { name: 'Film', component: Film },
      { name: 'Clapperboard', component: Clapperboard },
      { name: 'Tv', component: Tv },
      { name: 'Ticket', component: Ticket },
      { name: 'Palette', component: Palette },
      { name: 'Sparkles', component: Sparkles },
    ],
  },
  {
    label: 'Rumah & Utilitas',
    icons: [
      { name: 'Home', component: Home },
      { name: 'Sofa', component: Sofa },
      { name: 'Key', component: Key },
      { name: 'Lightbulb', component: Lightbulb },
      { name: 'Fan', component: Fan },
      { name: 'Wifi', component: Wifi },
      { name: 'Plug', component: Plug },
      { name: 'Zap', component: Zap },
      { name: 'Droplets', component: Droplets },
      { name: 'Trash2', component: Trash2 },
      { name: 'Bath', component: Bath },
      { name: 'Brush', component: Brush },
    ],
  },
  {
    label: 'Kesehatan',
    icons: [
      { name: 'Heart', component: Heart },
      { name: 'Activity', component: Activity },
      { name: 'Stethoscope', component: Stethoscope },
      { name: 'Thermometer', component: Thermometer },
      { name: 'Pill', component: Pill },
      { name: 'Eye', component: Eye },
      { name: 'Ear', component: Ear },

      { name: 'Bone', component: Bone },
      { name: 'Baby', component: Baby },
      { name: 'Ambulance', component: Ambulance },
      { name: 'Dumbbell', component: Dumbbell },
    ],
  },
  {
    label: 'Pendidikan',
    icons: [
      { name: 'Book', component: Book },
      { name: 'BookOpen', component: BookOpen },
      { name: 'BookMarked', component: BookMarked },
      { name: 'Pen', component: Pen },
      { name: 'Pencil', component: Pencil },
      { name: 'Scroll', component: Scroll },
      { name: 'GraduationCap', component: GraduationCap },
      { name: 'School', component: School },
      { name: 'Quote', component: Quote },
      { name: 'Sword', component: Sword },
    ],
  },
  {
    label: 'Komunikasi',
    icons: [
      { name: 'Phone', component: Phone },
      { name: 'PhoneCall', component: PhoneCall },
      { name: 'MessageCircle', component: MessageCircle },
      { name: 'MessageSquare', component: MessageSquare },
      { name: 'Mail', component: Mail },
      { name: 'Send', component: Send },
      { name: 'Inbox', component: Inbox },
      { name: 'Bell', component: Bell },
      { name: 'AtSign', component: AtSign },
      { name: 'Contact', component: Contact },
    ],
  },
  {
    label: 'Travel & Liburan',
    icons: [
      { name: 'Luggage', component: Luggage },
      { name: 'Backpack', component: Backpack },
      { name: 'Tent', component: Tent },
      { name: 'Compass', component: Compass },
      { name: 'Map', component: Map },
      { name: 'MapPin', component: MapPin },
      { name: 'Globe', component: Globe },
      { name: 'Mountain', component: Mountain },
      { name: 'Sun', component: Sun },
      { name: 'Moon', component: Moon },
      { name: 'Umbrella', component: Umbrella },
    ],
  },
  {
    label: 'Olahraga',
    icons: [
      { name: 'Trophy', component: Trophy },
      { name: 'Medal', component: Medal },
      { name: 'Star', component: Star },
      { name: 'Flame', component: Flame },
      { name: 'Target', component: Target },
      { name: 'Swords', component: Swords },
      { name: 'Footprints', component: Footprints },
      { name: 'Crown', component: Crown },
    ],
  },
  {
    label: 'Teknologi',
    icons: [
      { name: 'Monitor', component: Monitor },
      { name: 'Laptop', component: Laptop },
      { name: 'Smartphone', component: Smartphone },
      { name: 'Tablet', component: Tablet },
      { name: 'Camera', component: Camera },
      { name: 'Watch', component: Watch },
      { name: 'Printer', component: Printer },
      { name: 'Keyboard', component: Keyboard },
      { name: 'Mouse', component: Mouse },
      { name: 'HardDrive', component: HardDrive },
      { name: 'Cpu', component: Cpu },
      { name: 'QrCode', component: QrCode },
    ],
  },
  {
    label: 'Fashion',
    icons: [
      { name: 'Shirt', component: Shirt },
      { name: 'Glasses', component: Glasses },
    ],
  },
  {
    label: 'Pembayaran',
    icons: [
      { name: 'CreditCard', component: CreditCard },
      { name: 'DollarSign', component: DollarSign },
      { name: 'Percent', component: Percent },
      { name: 'BarChart3', component: BarChart3 },
      { name: 'Calculator', component: Calculator },
    ],
  },
  {
    label: 'Dapur',
    icons: [
      { name: 'ChefHat', component: ChefHat },
      { name: 'Microwave', component: Microwave },
      { name: 'Refrigerator', component: Refrigerator },
      { name: 'CookingPot', component: CookingPot },
      { name: 'Martini', component: Martini },
    ],
  },
  {
    label: 'Hewan',
    icons: [
      { name: 'Cat', component: Cat },
    ],
  },
  {
    label: 'Alam',
    icons: [
      { name: 'Trees', component: Trees },
      { name: 'TreePine', component: TreePine },
      { name: 'Flower2', component: Flower2 },
      { name: 'Leaf', component: Leaf },
      { name: 'Sprout', component: Sprout },
      { name: 'Cloud', component: Cloud },
      { name: 'CloudSun', component: CloudSun },
      { name: 'CloudRain', component: CloudRain },
    ],
  },
  {
    label: 'Lainnya',
    icons: [
      { name: 'Calendar', component: Calendar },
      { name: 'Clock', component: Clock },
      { name: 'PartyPopper', component: PartyPopper },
      { name: 'Ribbon', component: Ribbon },
    ],
  },
]

export const defaultIcon = 'Wallet'

interface IconPickerProps {
  value: string
  onChange: (name: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div>
      <p className="text-sm font-medium text-text-primary mb-2">Icon</p>
      <div className="max-h-44 overflow-y-auto rounded-sm border border-border-subtle p-1.5 space-y-2 scroll-smooth">
        {categories.map((cat) => (
          <div key={cat.label}>
            <p className="text-caption font-medium text-text-muted mb-1 px-1">{cat.label}</p>
            <div className="grid grid-cols-8 gap-0.5">
              {cat.icons.map((icon) => {
                const Icon = icon.component
                const selected = value === icon.name
                return (
                  <button
                    key={icon.name}
                    type="button"
                    onClick={() => onChange(icon.name)}
                    className={`flex items-center justify-center h-8 w-8 rounded-sm transition-all ${
                      selected
                        ? 'bg-primary-50 text-primary-600 ring-1 ring-primary-400'
                        : 'text-text-muted hover:bg-surface-secondary hover:text-text-secondary'
                    }`}
                    aria-label={icon.name}
                    style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
