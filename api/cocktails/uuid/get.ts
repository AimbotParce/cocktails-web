import api_endpoint from "../../endpoint"
import Cocktail from "../../models/cocktail"

const get_cocktail = (uuid: string) => {
    return api_endpoint(`cocktails/${uuid}`).GET() as Promise<Cocktail>
}

export default get_cocktail
