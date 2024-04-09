"use client"
import get_ingredients from "@/api/ingredients/get"
import Ingredient from "@/api/models/ingredient"
import IngredientTag from "@/components/IngredientTag"
import { Add, Search } from "@mui/icons-material"
import { useEffect, useState } from "react"

export default function Home() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    useEffect(() => {
        get_ingredients().then(setIngredients)
    }, [])

    return (
        <main className="flex flex-col gap-4">
            <section className="w-full flex gap-2">
                <input type="text" className="w-full p-2" placeholder="Search for a cocktail" />
                <button className="bg-white p-2">
                    <Search />
                </button>
                <a className="bg-[var(--turquoise)] text-white p-2" href="/ingredients/new">
                    <Add />
                </a>
            </section>
            <ol className="flex flex-col gap-4">
                {ingredients.map((ingredient) => (
                    <IngredientTag key={ingredient.id} {...ingredient} href={`/ingredients/${ingredient.name}`} />
                ))}
            </ol>
        </main>
    )
}
