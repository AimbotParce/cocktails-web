"use client"
import get_ingredient from "@/api/ingredients/name/get"
import Ingredient from "@/api/models/ingredient"
import DeleteButton from "@/components/buttons/DeleteButton"
import EditButton from "@/components/buttons/EditButton"
import IngredientAttributeTag from "@/components/IngredientAttributeTag"
import { Abril_Fatface } from "next/font/google"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] })

export default function Page({ params }: { params: { name: string } }) {
    const [ingredient, setIngredient] = useState<Ingredient | null>()
    const router = useRouter()

    useEffect(() => {
        get_ingredient(params.name)
            .then(setIngredient)
            .catch((e) => {
                setIngredient(null)
                console.error(e)
            })
    }, [params.name])

    if (ingredient === null) return notFound()
    if (!ingredient) return <h1>Loading...</h1>

    return (
        <main className="flex flex-col gap-4 bg-white p-4 relative">
            <section className="flex gap-2 absolute top-4 right-4">
                <EditButton href={`/ingredients/${params.name}?edit`} />
                <DeleteButton href={`/ingredients/${params.name}?edit`} />
            </section>
            <h1 className={`text-center ${abril.className} text-3xl`}>{ingredient.name}</h1>
            {ingredient.attributes.map((attr) => (
                <IngredientAttributeTag key={attr.id} {...attr} />
            ))}
            {ingredient.description && <p>{ingredient.description}</p>}
        </main>
    )
}
