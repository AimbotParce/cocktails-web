const API_TOKEN: string = process.env.NEXT_PUBLIC_API_TOKEN ?? ""
const API_HOST: string = process.env.NEXT_PUBLIC_API_URL ?? ""

const api_endpoint = (endpoint: string) => {
    const wrapper = (method: string) => {
        const caller = async ({ json, headers, files }: { json?: object; headers?: object; files?: File[] } = {}) => {
            if (files && json) {
                throw new Error("You can't send both files and json in the same request")
            }
            var res = undefined
            if (files) {
                const formData = new FormData()
                files.forEach((file) => {
                    formData.append("file", file)
                })
                res = await fetch(`${API_HOST}/${endpoint}`, {
                    method,
                    headers: {
                        "Authorization": API_TOKEN,
                        ...headers,
                    },
                    body: formData,
                })
            } else if (json) {
                res = await fetch(`${API_HOST}/${endpoint}`, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": API_TOKEN,
                        ...headers,
                    },
                    body: JSON.stringify(json),
                })
            } else {
                res = await fetch(`${API_HOST}/${endpoint}`, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": API_TOKEN,
                        ...headers,
                    },
                })
            }
            // Check if there was an error
            let err = undefined
            const error_code = res.status
            let error_response = null
            if (!res.ok) {
                err = new Error(`${res.status} - ${res.statusText}`)
            } else {
                const data = await res.json()
                if (!data) {
                    err = new Error("No data received")
                } else if (!data.ok) {
                    error_response = data
                    err = new Error(data.message)
                } else {
                    return data.data
                }
            }
            if (err) {
                throw { error: err, error_code, error_response }
            }
            return undefined
        }
        return caller
    }
    return {
        GET: wrapper("GET"),
        POST: wrapper("POST"),
        PUT: wrapper("PUT"),
        DELETE: wrapper("DELETE"),
        PATCH: wrapper("PATCH"),
    }
}

export default api_endpoint
