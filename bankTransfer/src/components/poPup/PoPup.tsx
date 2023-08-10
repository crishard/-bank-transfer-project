export function PoPup(props: {text: string}){
    return(
        <div className="absolute right-1 top-16 px-16 py-4 bg-[rgb(0,128,255)] text-white text-xl font-medium">
            <p>{props.text}</p>
        </div>
    )
}