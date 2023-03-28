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
        <div className="h-full w-5/12 text-center view-div px-2 rounded">
            <>
                <h3 className="tracking-wider text-xl font-bold tracking-tight text-gray-900">Todas Transações</h3>

                <table className="transacoes w-full">
                    <tr>
                        <th>Data</th>
                        <th>Valor</th>
                    </tr>
                    {data?.map((transaction) => {
                        const date = new Date(transaction.creatAt);
                        const dataFormatada = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                        return (
                            <>
                                <tr key={transaction.id}>
                                    <td className="tracking-wide">{dataFormatada}</td>
                                    <td>R$ {transaction.value}</td>
                                </tr>
                            </>
                        )
                    })}
                </table>
                <p className="text-center">Sem mais para mostrar</p>
            </>
        </div>
    )
}