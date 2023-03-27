export function PoPup(props: {text: string}){
    return(
        <div className="absolute right-px top-px px-16 py-4 bg-green-500 text-white text-xl font-medium">
            <p>{props.text}</p>
        </div>
    )
}