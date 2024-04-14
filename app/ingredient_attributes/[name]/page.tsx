"use client"
import delete_ingredient_attribute from "@/api/ingredient_attributes/name/delete"
import get_ingredient_attribute from "@/api/ingredient_attributes/name/get"
import patch_ingredient_attribute from "@/api/ingredient_attributes/name/post"
import IngredientAttribute from "@/api/models/ingredient_attribute"
import DeleteButton from "@/components/buttons/DeleteButton"
import DoneButton from "@/components/buttons/DoneButton"
import EditButton from "@/components/buttons/EditButton"
import { Abril_Fatface } from "next/font/google"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] })

export default function Page({ params }: { params: { name: string } }) {
    const [attribute, setAttribute] = useState<IngredientAttribute | null>()
    const router = useRouter()
    const edit = useSearchParams().has("edit")

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

    if (edit) {
        return (
            <main className="flex items-end w-full gap-4">
                <form className="flex flex-col w-full">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="bg-white px-3 py-2 w-full"
                        value={attribute.name}
                        onChange={(e) => setAttribute({ ...attribute, name: e.target.value })}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        className="bg-white px-3 py-2 w-full"
                        value={attribute.description}
                        onChange={(e) => setAttribute({ ...attribute, description: e.target.value })}
                    />
                </form>
                <DoneButton
                    className="bg-[var(--turquoise)] text-white p-2"
                    onClick={() => {
                        patch_ingredient_attribute(params.name, attribute).then((a) =>
                            router.push(`/ingredient_attributes/${a.name}`)
                        )
                    }}
                />
            </main>
        )
    } else {
        return (
            <main className="flex flex-col gap-2 bg-white p-4 relative">
                <section className="flex gap-2 absolute top-4 right-4">
                    <EditButton href={`/ingredient_attributes/${params.name}?edit`} />
                    <DeleteButton
                        onClick={() => {
                            delete_ingredient_attribute(params.name).then(() => {
                                router.push("/ingredient_attributes")
                            })
                        }}
                    />
                </section>
                <h1 className={`text-center ${abril.className} text-3xl py-1`}>{attribute.name}</h1>
                {attribute.description && <p>{attribute.description}</p>}
            </main>
        )
    }
}
