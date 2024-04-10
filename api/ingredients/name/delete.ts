import api_endpoint from "../../endpoint"

const delete_ingredient = (name: string) => {
    return api_endpoint(`ingredients/${name}`).DELETE() as Promise<undefined>
}

export default delete_ingredient
