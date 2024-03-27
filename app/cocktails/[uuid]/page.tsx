import get_cocktail from "@/api/cocktails/uuid/get"

export default async function Page({ params }: { params: { uuid: string } }) {
    const cocktail = await get_cocktail(params.uuid)
    return <p>Post: {cocktail.name}</p>
}
