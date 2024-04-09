import Ingredient from "@/api/models/ingredient"
import React from "react"

interface IngredientTagProps extends Ingredient {
    onClick?: () => void
    href?: string
    className?: string
    children?: React.ReactNode
}

class IngredientTag extends React.Component<IngredientTagProps> {
    render() {
        const src = `${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${this.props.image.uuid}`
        return (
            <a
                className={`border bg-white rounded-full pr-2 gap-2 flex items-center w-fit p-[1px] ${this.props.className} font-bold text-sm hover:bg-gray-50`}
                onClick={this.props.onClick}
                href={this.props.href}
            >
                <img src={src} alt={this.props.name} className="h-6 w-6 object-cover rounded-full border" />
                {this.props.name}
                {this.props.children}
            </a>
        )
    }
}

export default IngredientTag
