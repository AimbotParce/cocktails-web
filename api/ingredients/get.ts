import api_endpoint from "../endpoint"
import Ingredient from "../models/ingredient"

const get_ingredients = (offset: number = 0, limit: number | null = null) => {
    let q = new Array()
    q.push(`offset=${offset}`)
    if (limit) q.push(`limit=${limit}`)

    return api_endpoint(`ingredients?${q.join("&")}`).GET() as Promise<Ingredient[]>
}

export default get_ingredients
