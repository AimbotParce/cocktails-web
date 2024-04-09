import api_endpoint from "../endpoint"
import IngredientAttribute from "../models/ingredient_attribute"

const get_ingredient_attributes = (offset: number = 0, limit: number | null = null) => {
    let q = new Array()
    q.push(`offset=${offset}`)
    if (limit) q.push(`limit=${limit}`)

    return api_endpoint(`ingredient_attributes?${q.join("&")}`).GET() as Promise<IngredientAttribute[]>
}

export default get_ingredient_attributes
