import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"
import "./MessageError.css"

interface IProps{
    text: string | undefined;
}

export function MessageError(props: IProps){
    return(
        <div className="message-error text-sm">
            <p>{props.text}</p>
        </div>
    )
}