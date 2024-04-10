"use client"
import delete_ingredient from "@/api/ingredients/name/delete"
import get_ingredient from "@/api/ingredients/name/get"
import Ingredient from "@/api/models/ingredient"
import IngredientAttributeTag from "@/components/IngredientAttributeTag"
import DeleteButton from "@/components/buttons/DeleteButton"
import EditButton from "@/components/buttons/EditButton"
import { Abril_Fatface } from "next/font/google"
import Image from "next/image"
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
        <main className="flex flex-col gap-2 bg-white p-4 relative">
            <section className="flex gap-2 absolute top-4 right-4">
                <EditButton href={`/ingredients/${params.name}?edit`} />
                <DeleteButton
                    onClick={() => {
                        delete_ingredient(params.name).then(() => {
                            router.push("/ingredients")
                        })
                    }}
                />
            </section>
            <h1 className={`text-center ${abril.className} text-3xl py-1`}>{ingredient.name}</h1>
            <div className="relative w-full h-96">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${ingredient.image.uuid}`}
                    unoptimized={true}
                    alt={ingredient.image.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <ul className="flex gap-1">
                {ingredient.attributes.map((attr) => (
                    <IngredientAttributeTag key={attr.id} {...attr} />
                ))}
            </ul>
            {ingredient.description && <p>{ingredient.description}</p>}
        </main>
    )
}
