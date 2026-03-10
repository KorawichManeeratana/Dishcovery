import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  Clock,
  Flame,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FOOD_DATA } from "@/lib/data";

export default async function FoodDetailPage({ params }) {
  const { id } = await params;
  const food = FOOD_DATA.find((f) => f.id === parseInt(id));
  console.log("Food Detail Params:", params);
  console.log("Food Detail Data:", food);

  if (!food) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 via-white to-white">
      {/* Navigation Bar - CSS Flexbox */}
      <nav className="flex items-center justify-between p-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <Link
          href="/"
          className="flex items-center text-sm font-medium hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Discover
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {/* Main Layout - CSS Grid (Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Image Section - CSS Positioning */}
          <div className="relative group">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Column: Info Section - CSS Flexbox */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-extrabold">{food.name}</h1>
              <p className="text-xl text-gray-500">{food.restaurant}</p>
            </div>

            <div className="flex items-center gap-6 py-2 border-y text-sm font-medium text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />{" "}
                {food.rating} ({food.reviews} reviews)
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {food.time}
              </div>
              <div className="flex items-center gap-1">
                <Utensils className="w-4 h-4" /> {food.dist}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Fresh Atlantic salmon delicately sliced and served over perfectly
              seasoned sushi rice. Our nigiri platter includes 8 pieces of
              premium salmon, accompanied by pickled ginger, wasabi, and
              house-made soy sauce.
            </p>

            {/* Nutrition Cards - CSS Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="font-bold">{food.calories} kcal</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Prep Time</p>
                  <p className="font-bold">{food.prepTime} min</p>
                </div>
              </div>
            </div>

            {/* Ingredients - CSS Flexbox (Wrap) */}
            <div>
              <h3 className="font-bold mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {food?.ingredients?.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Section - CSS Box Model & Positioning */}
            <div className="mt-auto p-6 rounded-3xl bg-gray-50 border flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-3xl font-black">${Number(food?.price || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
