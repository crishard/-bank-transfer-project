import { useState } from "react";

interface IHerderProps {
  title: string;
  option: string;
  hrefProp: boolean;
}


export function HeaderForm(props: IHerderProps) {
  const [redirect, setRedirect] = useState('/register')

  return (
    <div className="w-full max-w-md img-container">
      <img
        className="mx-auto h-12 w-auto"
        src="https://img.freepik.com/psd-gratuitas/cofre-3d-com-moedas-de-ouro_23-2148938918.jpg?t=st=1676987151~exp=1676987751~hmac=17cf066f752c1ededfa73abc116b63e23328e82e9f729255de48b8cb806e60dd"
        alt="Your Company"
      />
      <h2 className=" mt-1 text-center text-3xl font-bold tracking-tight text-gray-900">
        {props.title}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Ou{' '}


        {props.hrefProp ? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          realize {props.option}!
        </a>: <a href={redirect} className="font-medium text-indigo-600 hover:text-indigo-500">
          realize {props.option}!
        </a>}
        {/* <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          realize {props.option}!
        </a> */}
      </p>
    </div>
  )
}