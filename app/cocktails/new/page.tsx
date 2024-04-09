"use client"
import post_image from "@/api/attachments/images/post"
import post_cocktail from "@/api/cocktails/post"
import Cocktail from "@/api/models/cocktail"
import IngredientPicker from "@/components/IngredientPicker"
import { Done } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const [cocktail, setCocktail] = useState<Cocktail>({} as Cocktail)
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
                    onChange={(e) => setCocktail({ ...cocktail, name: e.target.value })}
                />

                <label>Instructions:</label>
                <textarea
                    className="bg-whitepx-3 py-2"
                    onChange={(e) => setCocktail({ ...cocktail, instructions: e.target.value })}
                />
                <label>Ingredients:</label>
                <IngredientPicker
                    className="bg-white px-3 py-2 w-full"
                    current={cocktail.ingredients || []}
                    setCurrent={(ings) => setCocktail({ ...cocktail, ingredients: ings })}
                />
                <label>Image:</label>
                <input type="file" accept="image/*" className="bg-white px-3 py-2" onChange={handleImageUpload} />
            </form>
            <button
                className="bg-[var(--turquoise)] text-white p-2"
                onClick={async () => {
                    if (image) {
                        cocktail.image = await post_image(image)
                    }
                    post_cocktail(cocktail).then((c) => router.push(`/cocktails/${c.uuid}`))
                }}
            >
                <Done />
            </button>
        </main>
    )
}
