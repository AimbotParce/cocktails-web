import api_endpoint from "../../endpoint"

const delete_ingredient_attribute = (name: string) => {
    return api_endpoint(`ingredient_attributes/${name}`).DELETE() as Promise<undefined>
}

export default delete_ingredient_attribute
