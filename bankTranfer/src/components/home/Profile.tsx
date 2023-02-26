import { getBalance } from "../../services/getBalance";

interface IProfileProps {
    name: string
}

type Repositories = {
    id: string;
    balance: number;
}



export function Profile(props: IProfileProps) {

    const {data} = getBalance<Repositories>();

    return (
        <section className="img-container text-center flex gap-12 text-center  justify-center">
            <div>

                <img
                    src="https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-uma-pessoa-com-oculos-de-sol_23-2149436188.jpg?t=st=1677068876~exp=1677069476~hmac=d1b92214d1c1328773be1f5f0c1f2bdf91c83feb69f4844f3fd4b9dcf17ebf7d"
                    alt="Your Company"
                />
                <p className="mt-2  text-2xl font-bold tracking-tight text-gray-900">
                    {props.name}
                </p>
            </div>

            <div>
                <h3>Saldo em conta:</h3>

                { data ?  <p key={data.id}>R$ {data.balance}</p> : <p>R$ XXXXX</p>}
               
            </div>
        </section>
    );
}