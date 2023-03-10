import { useNavigate } from "react-router-dom";

export function logOut() {
    const navigate = useNavigate()

    localStorage.removeItem("token");
    navigate("/login");
};
