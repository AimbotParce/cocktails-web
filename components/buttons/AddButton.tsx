import { Add } from "@mui/icons-material"
import TurquoiseButton from "./TurquoiseButton"

class AddButton extends TurquoiseButton {
    render() {
        return (
            <TurquoiseButton {...this.props}>
                <Add />
            </TurquoiseButton>
        )
    }
}

export default AddButton
