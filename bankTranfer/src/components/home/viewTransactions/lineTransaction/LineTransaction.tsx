import "../ViewTransaction.css";

interface ILineTransaction {
    index: number;
    date: string;
    value: number;
}

export function LineTransaction(props: ILineTransaction){
    return(
        <div className="transacoes">
                <p>{props.index}</p>
                <p>{props.date}</p>
                <p>R$ {props.value}</p>
            </div>
    )
}