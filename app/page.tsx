"use client"
import get_cocktails from "@/api/cocktails/get"
import Cocktail from "@/api/models/cocktail"
import { useEffect, useState } from "react"

export default function Home() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([])

    useEffect(() => {
        get_cocktails().then(setCocktails)
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {cocktails.map((cocktail) => (
                <div key={cocktail.id} className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-white">{cocktail.name}</h2>
                </div>
            ))}
        </main>
    )
}
