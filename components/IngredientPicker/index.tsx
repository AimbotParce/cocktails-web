import get_ingredients from "@/api/ingredients/get"
import Ingredient from "@/api/models/ingredient"
import { Close } from "@mui/icons-material"
import React from "react"
import IngredientTag from "../IngredientTag"

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
        value: "",
        filtered: [] as Ingredient[],
        selected: -1,
    }
    // When the component mounts, fetch the ingredients
    componentDidMount() {
        get_ingredients().then((ings) => this.setState({ available: ings }))
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        this.setState({ value })
        if (value === "") {
            this.setState({ filtered: [], selected: -1 })
            return
        }
        this.setState({
            filtered: this.state.available.filter((i) => i.name.toLowerCase().includes(value.toLowerCase())),
            selected: 0,
        })
    }

    handleSelect = (name: string) => () => {
        const ingredient = this.state.available.find((i) => i.name === name)
        if (!ingredient) return
        this.props.setCurrent([...this.props.current, ingredient])
        this.setState({
            available: this.state.available.filter((i) => i.name !== name),
            value: "",
            filtered: [],
            selected: -1,
        })
    }

    handleRemove = (index: number) => () => {
        const current = [...this.props.current]
        const removed = current.splice(index, 1)
        this.setState({ available: [...this.state.available, removed[0]] })
        this.props.setCurrent(current)
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            this.setState({ selected: Math.min(this.state.selected + 1, this.state.filtered.length - 1) })
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            this.setState({ selected: Math.max(this.state.selected - 1, 0) })
        } else if (e.key === "Enter" && this.state.selected >= 0) {
            this.handleSelect(this.state.filtered[this.state.selected].name)()
        } else if (e.key === "Backspace" && this.state.value === "") {
            this.handleRemove(this.props.current.length - 1)()
        }
    }

    render() {
        return (
            <div className="w-full">
                <div className={`${this.props.className} flex flex-wrap w-full gap-1`}>
                    {this.props.current.map((ingredient, j) => (
                        <IngredientTag
                            key={j}
                            {...ingredient}
                            onClick={this.handleRemove(j)}
                            className="cursor-pointer"
                        >
                            <Close sx={{ fontSize: 15 }} />
                        </IngredientTag>
                    ))}
                    <input
                        className={`min-w-[${this.state.value.length * 2 || 1}rem] grow`}
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.value}
                        placeholder="Start typing to add ingredients..."
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
                <div className="relative">
                    {this.state.filtered.length > 0 && (
                        <ul className={`absolute top-0 w-full bg-white py-2 shadow-xl`}>
                            {this.state.filtered.map((ingredient, j) => (
                                <li
                                    key={ingredient.id}
                                    className={`cursor-pointer flex w-full items-center gap-2 ${
                                        j == this.state.selected ? "bg-gray-100" : "hover:bg-gray-50"
                                    } p-2`}
                                    onClick={this.handleSelect(ingredient.name)}
                                >
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/attachments/images/${ingredient.image.uuid}`}
                                        alt={ingredient.name}
                                        className="object-cover h-8 w-8 rounded-full border"
                                    />
                                    <div>
                                        <h2 className="font-bold text-sm">{ingredient.name}</h2>
                                        <p className="text-xs">{ingredient.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export default IngredientPicker
