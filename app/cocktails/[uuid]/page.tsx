"use client"
import get_cocktail from "@/api/cocktails/uuid/get"
import Cocktail from "@/api/models/cocktail"
import DeleteButton from "@/components/buttons/DeleteButton"
import EditButton from "@/components/buttons/EditButton"
import IngredientTag from "@/components/IngredientTag"
import { Abril_Fatface } from "next/font/google"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] })

export default function Page({ params }: { params: { uuid: string } }) {
    const [cocktail, setCocktail] = useState<Cocktail | null>()

    useEffect(() => {
        get_cocktail(params.uuid)
            .then(setCocktail)
            .catch((e) => {
                setCocktail(null)
                console.error(e)
            })
    }, [params.uuid])

    if (cocktail === null) return notFound()
    if (!cocktail) return <h1>Loading...</h1>

    return (
        <main className="flex flex-col gap-2 bg-white p-4 relative">
            <section className="flex gap-2 absolute top-4 right-4">
                <EditButton href={`/cocktails/${params.uuid}?edit`} />
                <DeleteButton href={`/cocktails/${params.uuid}?edit`} />
            </section>

            <h1 className={`text-center ${abril.className} text-3xl py-1`}>{cocktail.name}</h1>
            <div className="relative w-full h-96">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${cocktail.image.uuid}`}
                    unoptimized={true}
                    alt={cocktail.image.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <ul className="flex gap-1">
                {cocktail.ingredients.map((ingredient) => (
                    <IngredientTag key={ingredient.id} {...ingredient} />
                ))}
            </ul>
            {cocktail.instructions && (
                <>
                    <h2 className="text-lg font-bold">Instructions:</h2>
                    <p>{cocktail.instructions}</p>
                </>
            )}
        </main>
    )
}
