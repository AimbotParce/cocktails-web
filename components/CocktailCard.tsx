"use client"
import Cocktail from "@/api/models/cocktail"
import { motion } from "framer-motion"
import Image from "next/image"

const CocktailCard = ({ id, uuid, name, instructions, ingredients, image, creation_datetime }: Cocktail) => {
    const src = `${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${image.uuid}`
    const ingredientNames = ingredients.map((ingredient) => ingredient.name).join(", ")
    return (
        <motion.a
            className="flex gap-4 p-2 bg-white items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            href={`/cocktails/${uuid}`}
        >
            <div className="relative h-24 w-48">
                <Image src={src} alt={name} layout="fill" objectFit="cover" unoptimized />
            </div>
            <div>
                <h1 className="font-bold">{name}</h1>
                <ul className="text-gray-500">{ingredientNames}</ul>
            </div>
        </motion.a>
    )
}

export default CocktailCard
