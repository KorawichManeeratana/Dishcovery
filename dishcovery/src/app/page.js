import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MapPin, Clock, Star } from "lucide-react";
import Link from "next/link"
import { FOOD_DATA } from "@/lib/data"

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - ตอบโจทย์ Component-based */}
      <header className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-orange-600">Dishcovery</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <span className="text-black border-b-2 border-black pb-1">
              Discover
            </span>
            <span>Favorites</span>
            <span>Orders</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" /> San Francisco
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
            User
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filter - ตอบโจทย์ CSS Positioning & Flexbox */}
        <aside className="w-64 p-6 border-r hidden md:block">
          <h2 className="font-bold mb-4">Filters</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                <Input placeholder="Search dishes..." className="pl-8" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-3 block">
                Cuisine
              </label>
              {["Japanese", "American", "Italian", "Mexican", "Thai"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <Checkbox id={item} />
                    <label htmlFor={item} className="text-sm">
                      {item}
                    </label>
                  </div>
                ),
              )}
            </div>

            <div>
              <label className="text-sm font-semibold mb-3 block">
                Price Range
              </label>
              <Slider defaultValue={[50]} max={100} step={1} />
              <div className="flex justify-between text-xs mt-2 text-gray-500">
                <span>$</span>
                <span>$$$$</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - ตอบโจทย์ CSS Grid & Responsive */}
        <main className="flex-1 p-6 bg-gray-50/30">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Discover Food</h2>
            <p className="text-gray-500">9 dishes available near you</p>
          </div>

          {/* Responsive Grid System: 1 col on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOOD_DATA.map((food) => (
              <Link href={`/detail/${food.id}`} key={food.id} className="block">
              <Card
                key={food.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* ส่วน Badge ด้านบนรูปยังคงเดิม */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm"
                    >
                      {food.category}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm"
                    >
                      {food.price}
                    </Badge>
                  </div>
                  {food.tag && (
                    <Badge className="absolute bottom-3 left-3 bg-orange-500 text-white hover:bg-orange-600 border-none">
                      {food.tag}
                    </Badge>
                  )}
                </div>
                <CardHeader className="p-4 pb-0">
                  <h3 className="font-bold text-lg">{food.name}</h3>
                  <p className="text-sm text-gray-500">{food.restaurant}</p>
                </CardHeader>
                <CardFooter className="p-4 pt-4 border-t flex justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-black">
                      {food.rating}
                    </span>{" "}
                    ({food.reviews})
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {food.time}
                    </span>
                    <span>{food.dist}</span>
                  </div>
                </CardFooter>
              </Card>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
