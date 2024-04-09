"use client"
import post_image from "@/api/attachments/images/post"
import post_ingredient from "@/api/ingredients/post"
import Ingredient from "@/api/models/ingredient"
import IngredientAttributePicker from "@/components/IngredientAttributePicker"
import { Done } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const [ingredient, setIngredient] = useState<Ingredient>({} as Ingredient)
    const [image, setImage] = useState<File | null>(null)
    const router = useRouter()

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        // Store the image in the state
        setImage(file)
    }

    return (
        <main className="flex items-end w-full gap-4">
            <form className="flex flex-col w-full">
                <label>Name:</label>
                <input
                    type="text"
                    className="bg-white px-3 py-2 w-full"
                    onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
                />
                <label>Description:</label>
                <input
                    type="text"
                    className="bg-white px-3 py-2 w-full"
                    onChange={(e) => setIngredient({ ...ingredient, description: e.target.value })}
                />
                <label>Attributes:</label>
                <IngredientAttributePicker
                    className="bg-white px-3 py-2 w-full"
                    current={ingredient.attributes || []}
                    setCurrent={(atts) => setIngredient({ ...ingredient, attributes: atts })}
                />
                <label>Image:</label>
                <input type="file" accept="image/*" className="bg-white px-3 py-2" onChange={handleImageUpload} />
            </form>
            <button
                className="bg-[var(--turquoise)] text-white p-2"
                onClick={async () => {
                    if (image) {
                        ingredient.image = await post_image(image)
                    }
                    post_ingredient(ingredient).then((i) => router.push(`/ingredients/${i.name}`))
                }}
            >
                <Done />
            </button>
        </main>
    )
}
