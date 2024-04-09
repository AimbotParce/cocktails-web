"use client"
import get_ingredient_attributes from "@/api/ingredient_attributes/get"
import IngredientAttribute from "@/api/models/ingredient_attribute"
import { Add, Search } from "@mui/icons-material"
import { useEffect, useState } from "react"

export default function Home() {
    const [attributes, setAttributes] = useState<IngredientAttribute[]>([])

    useEffect(() => {
        get_ingredient_attributes().then(setAttributes)
    }, [])

    return (
        <main className="flex flex-col gap-4">
            <section className="w-full flex gap-2">
                <input type="text" className="w-full p-2" placeholder="Search for an attribute" />
                <button className="bg-white p-2">
                    <Search />
                </button>
                <a className="bg-[var(--turquoise)] text-white p-2" href="/ingredient_attributes/new">
                    <Add />
                </a>
            </section>
            <ol className="flex flex-col gap-2">
                {attributes.map((attribute, j) => (
                    <a
                        key={attribute.id}
                        className="cursor-pointer w-full hover:bg-gray-50 bg-white p-2"
                        href={`/ingredient_attributes/${attribute.name}`}
                    >
                        <h2 className="font-bold text-sm">{attribute.name}</h2>
                        <p className="text-xs">{attribute.description}</p>
                    </a>
                ))}
            </ol>
        </main>
    )
}
