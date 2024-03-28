"use client"
import get_cocktail from "@/api/cocktails/uuid/get"
import Cocktail from "@/api/models/cocktail"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { uuid: string } }) {
    const [cocktail, setCocktail] = useState<Cocktail | null>()
    useEffect(() => {
        get_cocktail(params.uuid)
            .then(setCocktail)
            .catch((e) => {
                setCocktail(null)
                console.error(e)
            })
    }, [params.uuid])

    if (cocktail === null) return notFound()
    if (!cocktail) return <h1>Loading...</h1>

    return (
        <main>
            <h1>{cocktail.name}</h1>
            <ul>
                {cocktail.ingredients.map((ingredient) => (
                    <li key={ingredient.uuid}>{ingredient.name}</li>
                ))}
            </ul>
        </main>
    )
}
