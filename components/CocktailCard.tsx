import Cocktail from "@/api/models/cocktail"
import Image from "next/image"

const CocktailCard = ({ id, uuid, name, instructions, ingredients, image_uuid, creation_datetime }: Cocktail) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{instructions}</p>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.uuid}>{ingredient.name}</li>
                ))}
            </ul>
            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${image_uuid}`} alt={name} width={30} />
            <p>{creation_datetime}</p>
        </div>
    )
}

export default CocktailCard
