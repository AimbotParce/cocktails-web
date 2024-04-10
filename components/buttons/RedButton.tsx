import React from "react"

class RedButton extends React.Component<React.LinkHTMLAttributes<HTMLAnchorElement>> {
    render() {
        return (
            <a
                {...this.props}
                className={`${this.props.className} p-2 w-fit text-white hover:text-red-200 bg-red-400 cursor-pointer`}
            >
                {this.props.children}
            </a>
        )
    }
}

export default RedButton
