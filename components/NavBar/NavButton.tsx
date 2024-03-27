"use client"

import { motion } from "framer-motion"

const NavButton = ({ href, children }: Readonly<{ href?: string; children: React.ReactNode }>) => {
    return (
        <motion.a href={href} className="px-8 py-4" whileHover={{ color: "var(--turquoise)" }}>
            {children}
        </motion.a>
    )
}

export default NavButton
