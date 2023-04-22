import { TextDown } from "../transactions/TextDown";
import { LineTransaction } from "../viewTransactions/lineTransaction/LineTransaction";
import "./Table.css"
type Repositories = {
    id: string;
    value: number;
    creatAt: string;
    debitedAccountId: String;
    creditedAccountId: String;
}

interface IProps {
    data: Repositories[] | null;
    title: string
}

export function Table(props: IProps) {

    return (
        <div className="max-h-[80vh] overflow-y-scroll">
            <h3 className="tracking-wider text-xl font-bold tracking-tight text-gray-900">{props.title}</h3>
            <table className="transacoes w-full">
                <tr>
                    <th>Data</th>
                    <th>Valor</th>
                </tr>
                {props.data?.map((transaction) => {
                    const date = new Date(transaction.creatAt);
                    const dataFormatada = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                    return (
                        <LineTransaction key={transaction.id} date={dataFormatada} value={transaction.value} />
                    )
                })}
            </table>
            <TextDown />
        </div>
    )
}