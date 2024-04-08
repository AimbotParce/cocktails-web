import Image from "./image"
import IngredientAttribute from "./ingredient_attribute"

export default interface Ingredient {
    id: number
    name: string
    description: string
    image: Image
    creation_datetime: string
    attributes: IngredientAttribute[]
}
