import "./ButtonForm.css"

interface IButtonProps{
    text: string;
}

export function ButtonForm(props: IButtonProps){
    return(
        <button type="submit" className="button-form bg-indigo-600 py-2.5 px-4 text-sm font-medium text-white" >{props.text}</button>
    );
}