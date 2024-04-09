import Image from "@/api/models/image"
import api_endpoint from "../../endpoint"

const post_image = (file: File) => {
    return api_endpoint(`attachments/images`).POST({ files: [file] }) as Promise<Image>
}

export default post_image
