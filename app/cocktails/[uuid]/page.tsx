"use client"
import post_image from "@/api/attachments/images/post"
import delete_cocktail from "@/api/cocktails/uuid/delete"
import get_cocktail from "@/api/cocktails/uuid/get"
import patch_cocktail from "@/api/cocktails/uuid/patch"
import Cocktail from "@/api/models/cocktail"
import DeleteButton from "@/components/buttons/DeleteButton"
import DoneButton from "@/components/buttons/DoneButton"
import EditButton from "@/components/buttons/EditButton"
import IngredientPicker from "@/components/IngredientPicker"
import IngredientTag from "@/components/IngredientTag"
import { Abril_Fatface } from "next/font/google"
import Image from "next/image"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] })

export default function Page({ params }: { params: { uuid: string } }) {
    const [cocktail, setCocktail] = useState<Cocktail | null>()
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
        get_cocktail(params.uuid)
            .then(setCocktail)
            .catch((e) => {
                setCocktail(null)
                console.error(e)
            })
    }, [params.uuid])

    if (cocktail === null) return notFound()
    if (!cocktail) return <h1>Loading...</h1>

    if (edit) {
        return (
            <main className="flex items-end w-full gap-4">
                <form className="flex flex-col w-full">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="bg-white px-3 py-2 w-full"
                        value={cocktail.name || ""}
                        onChange={(e) => setCocktail({ ...cocktail, name: e.target.value })}
                    />

                    <label>Instructions:</label>
                    <textarea
                        className="bg-whitepx-3 py-2"
                        value={cocktail.instructions || ""}
                        onChange={(e) => setCocktail({ ...cocktail, instructions: e.target.value })}
                    />
                    <label>Ingredients:</label>
                    <IngredientPicker
                        className="bg-white px-3 py-2 w-full"
                        current={cocktail.ingredients}
                        setCurrent={(ings) => setCocktail({ ...cocktail, ingredients: ings })}
                    />
                    <label>Image:</label>
                    <input type="file" accept="image/*" className="bg-white px-3 py-2" onChange={handleImageUpload} />
                </form>
                <DoneButton
                    className="bg-[var(--turquoise)] text-white p-2"
                    onClick={async () => {
                        if (image) {
                            cocktail.image = await post_image(image)
                        }
                        patch_cocktail(cocktail).then((c) => router.push(`/cocktails/${c.uuid}`))
                    }}
                />
            </main>
        )
    } else {
        return (
            <main className="flex flex-col gap-2 bg-white p-4 relative">
                <section className="flex gap-2 absolute top-4 right-4">
                    <EditButton href={`/cocktails/${params.uuid}?edit`} />
                    <DeleteButton
                        onClick={() => {
                            delete_cocktail(params.uuid).then(() => {
                                router.push("/")
                            })
                        }}
                    />
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
}
