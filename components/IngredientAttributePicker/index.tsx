import get_ingredient_attributes from "@/api/ingredient_attributes/get"
import IngredientAttribute from "@/api/models/ingredient_attribute"
import { Close } from "@mui/icons-material"
import React from "react"
import IngredientAttributeTag from "../IngredientAttributeTag"

interface IngredientAttributePickerProps {
    current: IngredientAttribute[]
    setCurrent: (i: IngredientAttribute[]) => void
    className?: string
}

class IngredientAttributePicker extends React.Component<IngredientAttributePickerProps> {
    // On instancing it, fetch the available ingredients from the API
    // and set them to the state
    state = {
        available: [] as IngredientAttribute[],
        value: "",
        filtered: [] as IngredientAttribute[],
        selected: -1,
    }
    // When the component mounts, fetch the ingredients
    componentDidMount() {
        get_ingredient_attributes().then((atts) => this.setState({ available: atts }))
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        this.setState({ value })
        if (value === "") {
            this.setState({ filtered: [], selected: -1 })
            return
        }

        this.setState({
            filtered: this.state.available.filter((a) => a.name.toLowerCase().includes(value.toLowerCase())),
            selected: 0,
        })
    }

    handleSelect = (name: string) => () => {
        const attribute = this.state.available.find((i) => i.name === name)
        if (!attribute) return
        this.props.setCurrent([...this.props.current, attribute])
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
            if (this.props.current.length > 0) {
                this.handleRemove(this.props.current.length - 1)()
            }
        }
    }

    render() {
        return (
            <div className="w-full">
                <div className={`${this.props.className} flex flex-wrap w-full gap-1`}>
                    {this.props.current.map((attribute, j) => (
                        <IngredientAttributeTag
                            key={j}
                            {...attribute}
                            onClick={this.handleRemove(j)}
                            className="cursor-pointer"
                        >
                            <Close sx={{ fontSize: 15 }} />
                        </IngredientAttributeTag>
                    ))}
                    <input
                        className={`min-w-[${this.state.value.length * 2 || 1}rem] grow`}
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.value}
                        placeholder="Start typing to add attributes..."
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
                <div className="relative">
                    {this.state.filtered.length > 0 && (
                        <ul className={`absolute top-0 w-full bg-white py-2 shadow-xl`}>
                            {this.state.filtered.map((attribute, j) => (
                                <li
                                    key={attribute.id}
                                    className={`cursor-pointer w-full${
                                        j == this.state.selected ? "bg-gray-100" : "hover:bg-gray-50"
                                    } p-2`}
                                    onClick={this.handleSelect(attribute.name)}
                                >
                                    <h2 className="font-bold text-sm">{attribute.name}</h2>
                                    <p className="text-xs">{attribute.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export default IngredientAttributePicker
