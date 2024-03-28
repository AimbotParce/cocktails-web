import get_cocktail from "@/api/cocktails/uuid/get"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { uuid: string } }) {
    try {
        const cocktail = await get_cocktail(params.uuid)
        return (
            <main>
                <h1>{cocktail.name}</h1>
                <ul>
                    {cocktail.ingredients.map((ingredient) => (
                        <li key={ingredient.uuid}>{ingredient.name}</li>
                    ))}
                </ul>
            </main>
        )
    } catch (e) {
        return notFound()
    }
}
