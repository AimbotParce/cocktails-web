"use client"
import get_ingredient_attribute from "@/api/ingredient_attributes/name/get"
import IngredientAttribute from "@/api/models/ingredient_attribute"
import DeleteButton from "@/components/buttons/DeleteButton"
import EditButton from "@/components/buttons/EditButton"
import { Abril_Fatface } from "next/font/google"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] })

export default function Page({ params }: { params: { name: string } }) {
    const [attribute, setAttribute] = useState<IngredientAttribute | null>()
    const router = useRouter()

    useEffect(() => {
        get_ingredient_attribute(params.name)
            .then(setAttribute)
            .catch((e) => {
                setAttribute(null)
                console.error(e)
            })
    }, [params.name])

    if (attribute === null) return notFound()
    if (!attribute) return <h1>Loading...</h1>

    return (
        <main className="flex flex-col gap-2 bg-white p-4 relative">
            <section className="flex gap-2 absolute top-4 right-4">
                <EditButton href={`/ingredient_attributes/${params.name}?edit`} />
                <DeleteButton href={`/ingredient_attributes/${params.name}?edit`} />
            </section>
            <h1 className={`text-center ${abril.className} text-3xl py-1`}>{attribute.name}</h1>
            {attribute.description && <p>{attribute.description}</p>}
        </main>
    )
}
