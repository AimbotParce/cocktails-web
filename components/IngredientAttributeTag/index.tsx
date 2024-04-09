import IngredientAttribute from "@/api/models/ingredient_attribute"
import React from "react"

interface IngredientAttributeTagProps extends IngredientAttribute {
    onClick?: () => void
    className?: string
    children?: React.ReactNode
}

class IngredientAttributeTag extends React.Component<IngredientAttributeTagProps> {
    render() {
        return (
            <div
                className={`border rounded-full pr-2 gap-2 flex items-center p-[1px] ${this.props.className} font-bold text-sm hover:bg-gray-50`}
                onClick={this.props.onClick}
            >
                {this.props.name}
                {this.props.children}
            </div>
        )
    }
}

export default IngredientAttributeTag
