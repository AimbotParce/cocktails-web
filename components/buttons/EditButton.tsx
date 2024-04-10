import { Edit } from "@mui/icons-material"
import WhiteButtton from "./WhiteButton"

class EditButton extends WhiteButtton {
    render() {
        return (
            <WhiteButtton {...this.props}>
                <Edit />
            </WhiteButtton>
        )
    }
}

export default EditButton
