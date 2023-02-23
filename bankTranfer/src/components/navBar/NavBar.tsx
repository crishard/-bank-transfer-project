import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import "./NavBar.css"
export function NavBar() {

    return (
        <nav className="navbar">
            <Link className="text-xl font-bold cursor-auto" to="/">Bank Transfer</Link>
            <Link title="Sair" to="/login"><FaUserCircle className="icon_perfil" /></Link>
        </nav>
    )
}