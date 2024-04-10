import React from "react"

class TurquoiseButton extends React.Component<React.LinkHTMLAttributes<HTMLAnchorElement>> {
    render() {
        return (
            <a
                {...this.props}
                className={`${this.props.className} p-2 w-fit border text-white hover:text-[var(--turquoise)] hover:bg-white  bg-[var(--turquoise)] cursor-pointer`}
            >
                {this.props.children}
            </a>
        )
    }
}

export default TurquoiseButton
