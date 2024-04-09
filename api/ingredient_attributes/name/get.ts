import IngredientAttribute from "@/api/models/ingredient_attribute"
import api_endpoint from "../../endpoint"

const get_ingredient_attribute = (name: string) => {
    return api_endpoint(`ingredient_attributes/${name}`).GET() as Promise<IngredientAttribute>
}

export default get_ingredient_attribute
