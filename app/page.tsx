"use client"
import get_cocktails from "@/api/cocktails/get"
import Cocktail from "@/api/models/cocktail"
import CocktailCard from "@/components/CocktailCard"
import AddButton from "@/components/buttons/AddButton"
import SearchButton from "@/components/buttons/SearchButton"
import { useEffect, useState } from "react"

export default function Home() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([])

    useEffect(() => {
        get_cocktails().then(setCocktails)
    }, [])

    return (
        <main className="flex flex-col gap-4">
            <section className="w-full flex gap-2">
                <input type="text" className="w-full p-2 border" placeholder="Search for a cocktail" />
                <SearchButton />
                <AddButton href="/cocktails/new" />
            </section>
            <ol className="flex flex-col gap-4">
                {cocktails.map((cocktail) => (
                    <CocktailCard key={cocktail.uuid} {...cocktail} />
                ))}
            </ol>
        </main>
    )
}
