import api_endpoint from "../../endpoint"
import IngredientAttribute from "../../models/ingredient_attribute"

const patch_ingredient_attribute = (name: string, ingredientAttribute: IngredientAttribute) => {
    return api_endpoint(`ingredient_attributes/${name}`).PATCH({
        json: ingredientAttribute,
    }) as Promise<IngredientAttribute>
}

export default patch_ingredient_attribute
