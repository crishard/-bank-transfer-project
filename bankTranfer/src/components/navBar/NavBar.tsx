import { Link } from "react-router-dom"
import { LogoutButton } from "./LogOutButton";

import "./NavBar.css";

export function NavBar() {


    return (
        <nav className="navbar">
            <Link className="text-xl font-bold cursor-auto" to="/">Bank Transfer</Link>
            <LogoutButton />
        </nav>
    )
}