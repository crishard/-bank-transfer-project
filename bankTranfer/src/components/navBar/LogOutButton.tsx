import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export function LogoutButton() {
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <button title="sair" onClick={logOut}><FaUserCircle className="icon_perfil" /></button>
    )
};
