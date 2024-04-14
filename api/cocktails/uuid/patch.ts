import api_endpoint from "../../endpoint"
import Cocktail from "../../models/cocktail"

const patch_cocktail = (cocktail: Cocktail) => {
    return api_endpoint(`cocktails/${cocktail.uuid}`).PATCH({ json: cocktail }) as Promise<Cocktail>
}

export default patch_cocktail
