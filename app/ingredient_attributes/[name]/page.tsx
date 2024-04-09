"use client"
import get_ingredient_attribute from "@/api/ingredient_attributes/name/get"
import IngredientAttribute from "@/api/models/ingredient_attribute"
import { Edit } from "@mui/icons-material"
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
        <main className="flex flex-col gap-4 bg-white p-4 relative">
            <button
                className="border p-2 w-fit absolute top-4 right-4"
                onClick={() => {
                    router.push(`/ingredient_attributes/${params.name}?edit`)
                }}
            >
                <Edit />
            </button>
            <h1 className={`text-center ${abril.className} text-3xl`}>{attribute.name}</h1>
            {attribute.description && <p>{attribute.description}</p>}
        </main>
    )
}