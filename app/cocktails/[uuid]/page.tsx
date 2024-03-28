"use client"
import get_cocktail from "@/api/cocktails/uuid/get"
import Cocktail from "@/api/models/cocktail"
import { Edit } from "@mui/icons-material"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { uuid: string } }) {
    const [cocktail, setCocktail] = useState<Cocktail | null>()
    const query = useSearchParams()
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

    if (query.has("edit")) {
        return (
            <main>
                <form className="flex flex-col">
                    <label>Name:</label>
                    <input type="text" defaultValue={cocktail.name} className="bg-white p-4" />
                    <label>Instructions:</label>
                    <textarea defaultValue={cocktail.instructions ?? ""} className="bg-white p-4" />
                    <label>Ingredients:</label>
                    <input type="text" className="bg-white p-4" />
                    <label>Image:</label>
                    <input type="file" className="bg-white p-4" />
                </form>
            </main>
        )
    } else {
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
            </main>
        )
    }
}
