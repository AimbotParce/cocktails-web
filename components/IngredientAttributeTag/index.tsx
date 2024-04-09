import IngredientAttribute from "@/api/models/ingredient_attribute"
import React from "react"

interface IngredientAttributeTagProps extends IngredientAttribute {
    onClick?: () => void
    className?: string
    children?: React.ReactNode
    href?: string
}

class IngredientAttributeTag extends React.Component<IngredientAttributeTagProps> {
    render() {
        return (
            <a
                className={`border bg-white rounded-full px-2 gap-2 flex items-center w-fit p-[1px] ${this.props.className} font-bold text-sm hover:bg-gray-50`}
                onClick={this.props.onClick}
                href={this.props.href}
            >
                {this.props.name}
                {this.props.children}
            </a>
        )
    }
}

export default IngredientAttributeTag
