"use client"
import post_image from "@/api/attachments/images/post"
import delete_ingredient from "@/api/ingredients/name/delete"
import get_ingredient from "@/api/ingredients/name/get"
import patch_ingredient from "@/api/ingredients/name/post"
import Ingredient from "@/api/models/ingredient"
import IngredientAttributePicker from "@/components/IngredientAttributePicker"
import IngredientAttributeTag from "@/components/IngredientAttributeTag"
import DeleteButton from "@/components/buttons/DeleteButton"
import DoneButton from "@/components/buttons/DoneButton"
import EditButton from "@/components/buttons/EditButton"
import { Abril_Fatface } from "next/font/google"
import Image from "next/image"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] })

export default function Page({ params }: { params: { name: string } }) {
    const [ingredient, setIngredient] = useState<Ingredient | null>()
    const [image, setImage] = useState<File | null>(null)
    const router = useRouter()
    const edit = useSearchParams().has("edit")

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        // Store the image in the state
        setImage(file)
    }

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

    if (edit) {
        return (
            <main className="flex items-end w-full gap-4">
                <form className="flex flex-col w-full">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="bg-white px-3 py-2 w-full"
                        value={ingredient.name}
                        onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        className="bg-white px-3 py-2 w-full"
                        value={ingredient.description}
                        onChange={(e) => setIngredient({ ...ingredient, description: e.target.value })}
                    />
                    <label>Attributes:</label>
                    <IngredientAttributePicker
                        className="bg-white px-3 py-2 w-full"
                        current={ingredient.attributes}
                        setCurrent={(atts) => setIngredient({ ...ingredient, attributes: atts })}
                    />
                    <label>Image:</label>
                    <input type="file" accept="image/*" className="bg-white px-3 py-2" onChange={handleImageUpload} />
                </form>
                <DoneButton
                    className="bg-[var(--turquoise)] text-white p-2"
                    onClick={async () => {
                        if (image) {
                            ingredient.image = await post_image(image)
                        }
                        patch_ingredient(params.name, ingredient).then((i) => router.push(`/ingredients/${i.name}`))
                    }}
                />
            </main>
        )
    } else {
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
}
