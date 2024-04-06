import api_endpoint from "../endpoint"
import Cocktail from "../models/cocktail"

const post_cocktail = (cocktail: Cocktail) => {
    return api_endpoint(`cocktails`).POST({ json: cocktail }) as Promise<Cocktail>
}

export default post_cocktail
