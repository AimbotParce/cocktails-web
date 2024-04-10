"use client"
import get_ingredients from "@/api/ingredients/get"
import Ingredient from "@/api/models/ingredient"
import AddButton from "@/components/buttons/AddButton"
import { Search } from "@mui/icons-material"
import { useEffect, useState } from "react"

export default function Home() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    useEffect(() => {
        get_ingredients().then(setIngredients)
    }, [])

    return (
        <main className="flex flex-col gap-4">
            <section className="w-full flex gap-2">
                <input type="text" className="w-full p-2" placeholder="Search for an ingredient" />
                <button className="bg-white p-2">
                    <Search />
                </button>
                <AddButton href="/ingredients/new" />
            </section>
            <ol className="flex flex-col gap-2">
                {ingredients.map((ingredient, j) => (
                    <a
                        key={ingredient.id}
                        className="cursor-pointer flex w-full items-center gap-2 hover:bg-gray-50 bg-white p-2"
                        href={`/ingredients/${ingredient.name}`}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${ingredient.image.uuid}`}
                            alt={ingredient.name}
                            className="object-cover h-8 w-8 rounded-full border"
                        />
                        <div>
                            <h2 className="font-bold text-sm">{ingredient.name}</h2>
                            <p className="text-xs">{ingredient.description}</p>
                        </div>
                    </a>
                ))}
            </ol>
        </main>
    )
}
