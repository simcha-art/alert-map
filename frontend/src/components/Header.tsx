import { Link } from "react-router-dom"
import "./css/Header.css"

function Header() {
  return (
    <nav className="header-nav">
        <Link to={"/"} >Home</Link>
        <Link to={"/new-alert"}>New</Link>
    </nav>
  )
}

export default Header