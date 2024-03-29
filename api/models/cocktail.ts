import Ingredient from "./ingredient"

export default interface Cocktail {
    id: number
    uuid: string
    name: string
    instructions: string | null
    ingredients: Ingredient[]
    image_uuid: string | null
    creation_datetime: string
}
