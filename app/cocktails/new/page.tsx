"use client"
import post_cocktail from "@/api/cocktails/post"
import Cocktail from "@/api/models/cocktail"
import IngredientPicker from "@/components/IngredientPicker"
import { Done } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { uuid: string } }) {
    const [cocktail, setCocktail] = useState<Cocktail>({} as Cocktail)
    const router = useRouter()

    useEffect(() => {
        console.log(cocktail)
    }, [cocktail])

    return (
        <main className="flex items-end w-full gap-4">
            <form className="flex flex-col w-full">
                <label>Name:</label>
                <input
                    type="text"
                    className="bg-white p-4 w-full"
                    onChange={(e) => setCocktail({ ...cocktail, name: e.target.value })}
                />

                <label>Instructions:</label>
                <textarea
                    className="bg-white p-4"
                    onChange={(e) => setCocktail({ ...cocktail, instructions: e.target.value })}
                />
                <label>Ingredients:</label>
                <IngredientPicker
                    className="bg-white p-4"
                    current={cocktail.ingredients}
                    setCurrent={(ings) => setCocktail({ ...cocktail, ingredients: ings })}
                />
                <label>Image:</label>
                <input type="file" className="bg-white p-4" />
            </form>
            <button
                className="bg-[var(--turquoise)] text-white p-2"
                onClick={() => {
                    post_cocktail(cocktail).then((c) => router.push(`/cocktails/${c.uuid}`))
                }}
            >
                <Done />
            </button>
        </main>
    )
}
