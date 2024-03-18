import api_endpoint from "../../endpoint"
import Cocktail from "../../models/cocktail"

const get_cocktail = (id:number) => {
    return api_endpoint(`cocktails/${id}`).GET() as Promise<Cocktail>
}

export default get_cocktail