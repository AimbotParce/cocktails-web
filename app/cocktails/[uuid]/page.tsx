"use client"
import get_cocktail from "@/api/cocktails/uuid/get"
import Cocktail from "@/api/models/cocktail"
import { Edit } from "@mui/icons-material"
import { Abril_Fatface } from "next/font/google"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] })

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
        <main className="flex flex-col gap-4 bg-white p-4 relative">
            <button
                className="border p-2 w-fit absolute top-4 right-4"
                onClick={() => {
                    router.push(`/cocktails/${params.uuid}?edit`)
                }}
            >
                <Edit />
            </button>
            <h1 className={`text-center ${abril.className} text-3xl`}>{cocktail.name}</h1>
            {cocktail.ingredients.length > 0 && (
                <>
                    <h2 className="text-lg font-bold">Ingredients:</h2>
                    <ul>
                        {cocktail.ingredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.name}</li>
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
