import React from "react"

class WhiteButtton extends React.Component<React.LinkHTMLAttributes<HTMLAnchorElement>> {
    render() {
        return (
            <a
                {...this.props}
                className={`${this.props.className} border p-2 w-fit hover:bg-gray-50 cursor-pointer bg-white`}
            >
                {this.props.children}
            </a>
        )
    }
}

export default WhiteButtton
