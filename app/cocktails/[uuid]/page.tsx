"use client"
import get_cocktail from "@/api/cocktails/uuid/get"
import Cocktail from "@/api/models/cocktail"
import { Edit } from "@mui/icons-material"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { uuid: string } }) {
    const [cocktail, setCocktail] = useState<Cocktail | null>()
    const router = useRouter()

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
        <main className="flex flex-col gap-4 bg-white p-4">
            <section className="flex items-center justify-between">
                <h1>{cocktail.name}</h1>
                <button
                    className="border p-2 w-fit"
                    onClick={() => {
                        router.push(`/cocktails/${params.uuid}?edit`)
                    }}
                >
                    <Edit />
                </button>
            </section>
            {cocktail.ingredients.length > 0 && (
                <>
                    <h2>Ingredients:</h2>
                    <ul>
                        {cocktail.ingredients.map((ingredient) => (
                            <li key={ingredient.uuid}>{ingredient.name}</li>
                        ))}
                    </ul>
                </>
            )}
            {cocktail.instructions && (
                <>
                    <h2 className="text-lg font-bold">Instructions:</h2>
                    <p>{cocktail.instructions}</p>
                </>
            )}
        </main>
    )
}
