import api_endpoint from "../endpoint"
import IngredientAttribute from "../models/ingredient_attribute"

const post_ingredient_attribute = (ingredientAttribute: IngredientAttribute) => {
    return api_endpoint(`ingredient_attributes`).POST({ json: ingredientAttribute }) as Promise<IngredientAttribute>
}

export default post_ingredient_attribute
