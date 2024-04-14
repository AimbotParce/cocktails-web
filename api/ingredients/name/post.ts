import api_endpoint from "../../endpoint"
import Ingredient from "../../models/ingredient"

const patch_ingredient = (name: string, ingredient: Ingredient) => {
    return api_endpoint(`ingredients/${name}`).PATCH({ json: ingredient }) as Promise<Ingredient>
}

export default patch_ingredient
