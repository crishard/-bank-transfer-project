import { Link } from "react-router-dom"
import { LogoutButton } from "./LogOutButton";
import { profileData } from "../../services/profile";

import "./NavBar.css";

type Repositories = {
    id: string;
    username: string;
    password: string;
}

export function NavBar() {
    const { data } = profileData<Repositories>();

    return (
        <nav className="navbar">
            <Link className="text-2xl font-bold cursor-auto" to="/">Olá, {data?.username}</Link>
            <LogoutButton />
        </nav>
    )
}