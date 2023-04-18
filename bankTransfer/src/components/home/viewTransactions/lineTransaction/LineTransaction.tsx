import "../ViewTransaction.css";

interface ILineTransaction {
    key: string;
    date: string;
    value: number;
}

export function LineTransaction(props: ILineTransaction){
    return(
        <tr key={props.key}>
                <td>{props.date}</td>
                <td>R$ {props.value}</td>
            </tr>
    )
}