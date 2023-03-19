import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { getBalance } from "../../services/getBalance";

type Repositories = {
    id: string;
    balance: number;
}

export function LogoutButton() {
    const navigate = useNavigate();
    const {data} = getBalance<Repositories>();

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex gap-6 items-center">
            <h3>Saldo:  {data ? <span className="font-semibold" key={data.id}>R$ {data.balance}</span> : <span>R$ XXXXX</span>}</h3>
            <button title="sair" onClick={logOut}><IoLogOut className="icon_perfil" /></button>
        </div>
    )
};
