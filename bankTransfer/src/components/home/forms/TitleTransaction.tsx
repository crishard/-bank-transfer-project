type Props = {
    text: string;
}


export function TitleTransaction(props: Props) {
    return (
        <h2
            className="tracking-wider 
        font-bold text-lg text-center 
        mb-3">{props.text}
        </h2>
    )
}