import "./Loader.css"

export function Loader() {
    return (
        <span className="loader"></span>
    )
}

export function LoaderTransaction() {
    return (
        <div className="flex mt-6 justify-center">
            <div className="custom-loader"></div>
        </div>
    )
}
