"use client"
import get_cocktails from "@/api/cocktails/get"
import Cocktail from "@/api/models/cocktail"
import CocktailCard from "@/components/CocktailCard"
import { useEffect, useState } from "react"

export default function Home() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([])

    useEffect(() => {
        get_cocktails().then(setCocktails)
    }, [])

    return (
        <main className="flex min-h-screen flex-col gap-4">
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
        </main>
    )
}
