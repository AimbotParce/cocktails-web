import api_endpoint from "../../../endpoint"

const delete_image = (uuid: string) => {
    return api_endpoint(`attachments/images/${uuid}`).DELETE() as Promise<undefined>
}

export default delete_image
