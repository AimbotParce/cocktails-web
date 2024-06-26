"use client"
import get_ingredients from "@/api/ingredients/get"
import Ingredient from "@/api/models/ingredient"
import AddButton from "@/components/buttons/AddButton"
import SearchButton from "@/components/buttons/SearchButton"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    useEffect(() => {
        get_ingredients().then(setIngredients)
    }, [])

    return (
        <main className="flex flex-col gap-4">
            <section className="w-full flex gap-2">
                <input type="text" className="w-full p-2 border" placeholder="Search for an ingredient" />
                <SearchButton />
                <AddButton href="/ingredients/new" />
            </section>
            <ol className="flex flex-col gap-2">
                {ingredients.map((ingredient, j) => (
                    <a
                        key={ingredient.id}
                        className="cursor-pointer flex w-full items-center gap-2 hover:bg-gray-50 bg-white p-2"
                        href={`/ingredients/${ingredient.name}`}
                    >
                        <div className="object-cover h-8 w-8 rounded-full border relative overflow-hidden">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${ingredient.image.uuid}`}
                                alt={ingredient.name}
                                unoptimized={true}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
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
