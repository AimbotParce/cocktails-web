import api_endpoint from "../endpoint"
import Cocktail from "../models/cocktail"

const get_cocktails = (offset:number=0, limit:number|null=null) => {
    let q = new Array()
    q.push(`offset=${offset}`)
    if (limit) q.push(`limit=${limit}`)

    return api_endpoint(`cocktails?${q.join('&')}`).GET() as Promise<Cocktail[]>
}

export default get_cocktails