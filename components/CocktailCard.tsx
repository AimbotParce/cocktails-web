import Cocktail from "@/api/models/cocktail"
import { motion } from "framer-motion"
import Image from "next/image"

const CocktailCard = ({ id, uuid, name, instructions, ingredients, image_uuid, creation_datetime }: Cocktail) => {
    const src = image_uuid ? `${process.env.NEXT_PUBLIC_API_URL}/${image_uuid}` : "/cocktail_not_found.jpg"
    return (
        <motion.a
            className="flex gap-4 p-2 bg-white items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            href={`/cocktails/${uuid}`}
        >
            <Image src={src} alt={name} width={100} height={100} />
            <div>
                <h1>{name}</h1>
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.uuid}>{ingredient.name}</li>
                    ))}
                </ul>
            </div>
        </motion.a>
    )
}

export default CocktailCard
