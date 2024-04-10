"use client"
import post_ingredient_attribute from "@/api/ingredient_attributes/post"
import IngredientAttribute from "@/api/models/ingredient_attribute"
import DoneButton from "@/components/buttons/DoneButton"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
    const [attribute, setAttribute] = useState<IngredientAttribute>({} as IngredientAttribute)
    const router = useRouter()

    return (
        <main className="flex items-end w-full gap-4">
            <form className="flex flex-col w-full">
                <label>Name:</label>
                <input
                    type="text"
                    className="bg-white px-3 py-2 w-full"
                    onChange={(e) => setAttribute({ ...attribute, name: e.target.value })}
                />
                <label>Description:</label>
                <input
                    type="text"
                    className="bg-white px-3 py-2 w-full"
                    onChange={(e) => setAttribute({ ...attribute, description: e.target.value })}
                />
            </form>
            <DoneButton
                className="bg-[var(--turquoise)] text-white p-2"
                onClick={() => {
                    post_ingredient_attribute(attribute).then((a) => router.push(`/ingredient_attributes/${a.name}`))
                }}
            />
        </main>
    )
}
