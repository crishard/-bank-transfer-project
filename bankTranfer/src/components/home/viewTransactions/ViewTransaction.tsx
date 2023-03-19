import { getTransaction } from "../../../services/getTransaction";
import { LineTransaction } from "./lineTransaction/LineTransaction";
import "./ViewTransaction.css";

type Repositories = {
    id: string;
    value: number;
    creatAt: string;
    debitedAccountId: String;
    creditedAccountId: String;
}

export function ViewTransaction() {

    const { data } = getTransaction<Repositories[]>();

    return (
        <div className="w-5/12 text-center view-div px-2 rounded">
            <>
                <h3 className="tracking-wider text-xl font-bold tracking-tight text-gray-900">Transações</h3>
                <div className="transacoes">
                    <p>Data</p>
                    <p>Valor R$</p>
                </div>

                <>
                    {data?.map((transaction) => {
                        const date = new Date(transaction.creatAt);
                        const dataFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                        return (
                            <div key={transaction.id} className="transacoes">
                                <p className="tracking-wide">{dataFormatada}</p>
                                <p>R$ {transaction.value}</p>
                            </div>
                        )
                    })}


                </>


                <p className="text-center">Sem mais para mostrar</p>
            </>
        </div>
    )
}