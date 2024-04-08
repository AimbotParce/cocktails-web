import Image from "./image"
import Ingredient from "./ingredient"

export default interface Cocktail {
    id: number
    uuid: string
    name: string
    instructions: string
    ingredients: Ingredient[]
    image: Image
    creation_datetime: string
}
