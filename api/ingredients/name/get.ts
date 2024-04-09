import Ingredient from "@/api/models/ingredient"
import api_endpoint from "../../endpoint"

const get_ingredient = (name: string) => {
    return api_endpoint(`ingredients/${name}`).GET() as Promise<Ingredient>
}

export default get_ingredient
