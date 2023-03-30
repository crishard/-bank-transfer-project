import "./ButtonForm.css"

interface IButtonProps {
    text: string;
}

export function ButtonForm(props: IButtonProps) {
    return (
        <button type="submit" className="button-form bg-indigo-600" >
            {props.text}
        </button>
    );
}