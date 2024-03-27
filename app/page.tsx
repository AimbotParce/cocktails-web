import get_cocktails from "@/api/cocktails/get"
import CocktailCard from "@/components/CocktailCard"

export default async function Home() {
    const cocktails = await get_cocktails()

    return (
        <main className="flex flex-col gap-4">
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.uuid} {...cocktail} />
            ))}
        </main>
    )
}
