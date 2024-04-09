import NavButton from "./NavButton"

const NavBar = () => (
    <nav className="flex justify-center w-full px-10 sticky top-0 bg-[--white] border-b border-t z-50">
        <NavButton href="/">HOME</NavButton>
        <NavButton href="/ingredients">INGREDIENTS</NavButton>
        <NavButton href="/contact">CONTACT</NavButton>
    </nav>
)

export default NavBar
