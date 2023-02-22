import "./InputForm.css"


interface IProps{
    placeholder: string;
    type: string
}

export function InputForm(props: IProps ){
    return(
        <input className="input-form " autoComplete="off" placeholder={props.placeholder} type={props.type}/>
    )
}