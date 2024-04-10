import api_endpoint from "../../endpoint"

const delete_cocktail = (uuid: string) => {
    return api_endpoint(`cocktails/${uuid}`).DELETE() as Promise<undefined>
}

export default delete_cocktail
