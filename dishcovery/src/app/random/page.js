"use client"

import React, { useState } from "react"
import Link from "next/link"
import { CardContent, Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Star, Clock, Dice5} from "lucide-react"
import { FOOD_DATA } from "@/lib/data"

export default function RandomPage() {

    const [randomItem, setRandomItem] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleRandom = () => {

        setLoading(true)

        setTimeout(() => {
            const index = Math.floor(Math.random() * FOOD_DATA.length)
            setRandomItem(FOOD_DATA[index])
            setLoading(false)
        }, 700)

    }

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-orange-50 via-white to-white">

            <header className="px-6 py-4 border-b bg-white">
                <Link
                    href="/"
                    className="flex items-center text-sm font-medium hover:text-orange-600 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Back to Discover
                </Link>
            </header>

            <main className="flex-1 p-6 flex flex-col items-center justify-center">

                <h2 className="text-3xl font-bold mb-6">Random Food</h2>
                <p className="text-gray-500 mb-8 text-center">
                    Not sure what to eat? Let us decide for you.
                </p>

                <button
                    onClick={handleRandom}
                    className="flex items-center gap-2 bg-orange-500 text-white px-7 py-3 rounded-xl
          hover:bg-orange-600 hover:scale-105
          active:scale-95
          shadow-lg
          transition-all duration-200"
                >
                    <Dice5 className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    Random Menu
                </button>
                {loading && (
                    <p className="mt-6 text-gray-500 animate-pulse">
                        Finding delicious food...
                    </p>
                )}
                

                {randomItem && !loading && (
                    <Link href={`/detail/${randomItem.id}`} className="block">

                        <Card className="w-80 mt-8 overflow-hidden shadow-lg
          animate-in fade-in zoom-in-95 duration-300 hover:-translate-y-1 hover:shadow-2xl">

                            <div className="h-48 overflow-hidden ">
                                <img
                                    src={randomItem.image}
                                    alt={randomItem.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 "
                                />
                            </div>

                            <CardHeader className="p-4 pb-0">
                                <h3 className="font-bold text-lg">{randomItem.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {randomItem.restaurant}
                                </p>
                            </CardHeader>

                            <div className="px-4 pb-2 flex gap-2">
                                <Badge>{randomItem.category}</Badge>
                                <Badge>{randomItem.price}</Badge>
                            </div>

                            <CardFooter className="p-4 border-t flex justify-between text-xs text-gray-500">

                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-black">
                                        {randomItem.rating}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {randomItem.time}
                                    </span>

                                    <span>{randomItem.dist}</span>
                                </div>

                            </CardFooter>

                        </Card>
                    </Link>

                )}

            </main>
        </div>
    )
}