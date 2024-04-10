import { Delete } from "@mui/icons-material"
import RedButton from "./RedButton"

class DeleteButton extends RedButton {
    render() {
        return (
            <RedButton {...this.props}>
                <Delete />
            </RedButton>
        )
    }
}

export default DeleteButton
