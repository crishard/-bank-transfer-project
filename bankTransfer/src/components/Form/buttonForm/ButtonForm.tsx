import "./ButtonForm.css"

interface IButtonProps {
    text: string;
}

export function ButtonForm(props: IButtonProps) {
    return (
        <button type="submit" className="button-form" >
            {props.text}
        </button>
    );
}