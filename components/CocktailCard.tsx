"use client"
import Cocktail from "@/api/models/cocktail"
import { motion } from "framer-motion"

const CocktailCard = ({ id, uuid, name, instructions, ingredients, image, creation_datetime }: Cocktail) => {
    const src = `${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${image.uuid}`
    const ingredientNames = ingredients.map((ingredient) => ingredient.name).join(", ")
    return (
        <motion.a
            className="flex gap-4 p-2 bg-white items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            href={`/cocktails/${uuid}`}
        >
            <img src={src} alt={name} width={100} height={100} />
            <div>
                <h1 className="font-bold">{name}</h1>
                <ul className="text-gray-500">{ingredientNames}</ul>
            </div>
        </motion.a>
    )
}

export default CocktailCard
