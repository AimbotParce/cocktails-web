import NavBar from "@/components/NavBar"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import Image from "next/image"
import "./globals.css"

const sans = Open_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Welcome to Parcerisa's Cocktail Book",
    description: "Parcerisa's Cocktail Book",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={sans.className}>
                <div className="relative w-full h-48">
                    <Image src="/header.png" alt="logo" layout="fill" objectFit="contain" />
                </div>
                <NavBar />
                <section className="max-w-3xl">{children}</section>
            </body>
        </html>
    )
}
