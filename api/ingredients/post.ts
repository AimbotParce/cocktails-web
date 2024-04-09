import api_endpoint from "../endpoint"
import Ingredient from "../models/ingredient"

const post_ingredient = (ingredient: Ingredient) => {
    return api_endpoint(`ingredients`).POST({ json: ingredient }) as Promise<Ingredient>
}

export default post_ingredient
