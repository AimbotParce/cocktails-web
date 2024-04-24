import jwt from "jsonwebtoken"
import ldap from "ldapjs"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

async function authenticate(username: string, password: string) {
    const client = ldap.createClient({
        url: process.env.LDAP_HOST as string,
    })

    const entries: ldap.SearchEntry[] = []

    return new Promise((resolve, reject) => {
        client.bind(process.env.LDAP_DN as string, process.env.LDAP_PASSWORD as string, (error) => {
            if (error) {
                reject("LDAP bound failed")
            } else {
                const opts: ldap.SearchOptions = {
                    filter: `(&(sAMAccountName=${username}))`,
                    scope: "sub",
                    attributes: ["dn", "sn", "cn", "sAMAccountName"],
                }

                client.search(process.env.LDAP_BASE_DN as string, opts, (err, res) => {
                    if (err) {
                        reject(`User ${username} LDAP search error`)
                    } else {
                        res.on("searchRequest", (searchRequest) => {
                            //console.log('searchRequest: ', searchRequest.messageID);
                        })
                        res.on("searchEntry", (entry) => {
                            entries.push(entry)

                            client.bind(entry.dn, password, (err, res) => {
                                if (err) {
                                    reject(`User ${username} username or password problem`)
                                } else {
                                    resolve({
                                        username,
                                        password,
                                    })
                                }
                            })
                        })
                        res.on("searchReference", (referral) => {
                            //console.log('referral: ' + referral.uris.join());
                        })
                        res.on("error", (err) => {
                            reject("LDAP SEARCH error")
                        })
                        res.on("end", (result) => {
                            if (entries.length == 0) {
                                reject(`User ${username} username or password problem`)
                            }
                        })
                    }
                })
            }
        })
    })
}

export default NextAuth({
    secret: process.env.TOKEN_SECRET,

    jwt: {
        secret: process.env.TOKEN_SECRET,
        encode: async (data: any) => {
            const { secret, token, maxAge } = data
            const jwtClaims = {
                username: token.username,
                rights: token.rights,
            }

            const encodedToken = jwt.sign(jwtClaims, secret, {
                expiresIn: "1h",
                algorithm: "HS512",
            })
            return encodedToken
        },
        async decode(data: any) {
            const { secret, token, maxAge } = data
            const verify = jwt.verify(token, secret) as JWT

            return verify
        },
    },
    session: {
        jwt: true,
        maxAge: parseInt(process.env.TOKEN_MAX_AGE as string),
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.name) {
                token.username = user.name
            }

            let expSeconds = token.exp as number

            return token
        },

        async session({ session, token }) {
            session.type = token.type
            session.username = token.username

            return session
        },
    },
    providers: [
        CredentialsProvider({
            name: "LDAP",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    throw new Error("No credentials")
                }
                const { username, password } = credentials

                if (!username || !password) {
                    throw new Error("Missing username or password")
                }

                try {
                    await authenticate(username, password)

                    return new Promise((resolve, reject) => {
                        resolve({ id: username, name: username })
                    })
                } catch (error) {
                    console.log(error)
                    throw new Error(error as string)
                }
            },
        }),
    ],
})
