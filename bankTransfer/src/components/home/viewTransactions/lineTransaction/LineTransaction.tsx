import "../ViewTransaction.css";

interface ILineTransaction {
    id: string;
    date: string;
    value: number;
}

export function LineTransaction(props: ILineTransaction) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.date}</td>
            <td>R$ {props.value}</td>
        </tr>
    )
}