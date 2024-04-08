import Ingredient from "@/api/models/ingredient"
import React from "react"

interface IngredientPickerProps {
    current: Ingredient[]
    setCurrent: (i: Ingredient[]) => void
    className?: string
}

class IngredientPicker extends React.Component<IngredientPickerProps> {
    // On instancing it, fetch the available ingredients from the API
    // and set them to the state
    state = {
        available: [] as Ingredient[],
    }
    // When the component mounts, fetch the ingredients
    componentDidMount() {
        fetch("/api/ingredients")
            .then((r) => r.json())
            .then((ings) => this.setState({ available: ings }))
    }

    render() {
        return <input className={this.props.className} type="text" />
    }
}

export default IngredientPicker
