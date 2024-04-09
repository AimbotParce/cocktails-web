"use client"
import post_ingredient from "@/api/ingredients/post"
import Ingredient from "@/api/models/ingredient"
import IngredientAttributePicker from "@/components/IngredientAttributePicker"
import { Done } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page({ params }: { params: { uuid: string } }) {
    const [ingredient, setIngredient] = useState<Ingredient>({} as Ingredient)
    const router = useRouter()

    return (
        <main className="flex items-end w-full gap-4">
            <form className="flex flex-col w-full">
                <label>Name:</label>
                <input
                    type="text"
                    className="bg-white px-3 py-2 w-full"
                    onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
                />
                <label>Attributes:</label>
                <IngredientAttributePicker
                    className="bg-white px-3 py-2 w-full"
                    current={ingredient.attributes || []}
                    setCurrent={(atts) => setIngredient({ ...ingredient, attributes: atts })}
                />
                <label>Image:</label>
                <input type="file" className="bg-white px-3 py-2" />
            </form>
            <button
                className="bg-[var(--turquoise)] text-white p-2"
                onClick={() => {
                    post_ingredient(ingredient).then((i) => router.push(`/ingredients/${i.name}`))
                }}
            >
                <Done />
            </button>
        </main>
    )
}
