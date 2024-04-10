import { Done } from "@mui/icons-material"
import TurquoiseButton from "./TurquoiseButton"

class DoneButton extends TurquoiseButton {
    render() {
        return (
            <TurquoiseButton {...this.props}>
                <Done />
            </TurquoiseButton>
        )
    }
}

export default DoneButton
