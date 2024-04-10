import { Search } from "@mui/icons-material"
import WhiteButtton from "./WhiteButton"

class SearchButton extends WhiteButtton {
    render() {
        return (
            <WhiteButtton {...this.props}>
                <Search />
            </WhiteButtton>
        )
    }
}

export default SearchButton
