import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"
import "./MessageError.css"

interface IProps{
    text: string | undefined;
}

export function MessageError(children: IProps){
    return(
        <div className="message-error text-center">
            <p>{children.text}</p>
        </div>
    )
}